"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML5MediaAdapter = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const types_1 = require("../types");
const uuid_1 = require("uuid");
/**
 * HTML5 미디어 어댑터 클래스
 * HTML5 비디오/오디오 요소와 통합하기 위한 어댑터
 */
class HTML5MediaAdapter {
    /**
     * HTML5MediaAdapter 생성자
     * @param mediaElement HTML 비디오/오디오 요소 (선택 사항)
     * @param id 미디어 ID (선택 사항, 제공하지 않으면 자동 생성)
     */
    constructor(mediaElement, id) {
        this.mediaElement = null;
        this.state = types_1.MediaState.IDLE;
        this.startTime = 0;
        this.endTime = 0;
        this.loop = false;
        this.timeUpdateInterval = null;
        // 이벤트 핸들러
        this.handlePlay = () => {
            this.setState(types_1.MediaState.PLAYING);
        };
        this.handlePause = () => {
            if (this.state !== types_1.MediaState.ENDED) {
                this.setState(types_1.MediaState.PAUSED);
            }
        };
        this.handleEnded = () => {
            this.setState(types_1.MediaState.ENDED);
            this.emitEvent(types_1.MediaEventType.ENDED, {});
        };
        this.handleSeeking = () => {
            this.setState(types_1.MediaState.SEEKING);
            this.emitEvent(types_1.MediaEventType.SEEKING, { time: this.mediaElement?.currentTime });
        };
        this.handleSeeked = () => {
            this.emitEvent(types_1.MediaEventType.SEEKED, { currentTime: this.mediaElement?.currentTime });
            if (this.mediaElement?.paused) {
                this.setState(types_1.MediaState.PAUSED);
            }
            else {
                this.setState(types_1.MediaState.PLAYING);
            }
        };
        this.handleLoadedMetadata = () => {
            this.updateMediaInfo();
        };
        this.handleVolumeChange = () => {
            if (!this.mediaElement)
                return;
            this.emitEvent(types_1.MediaEventType.VOLUME_CHANGE, { volume: this.mediaElement.volume });
            this.emitEvent(types_1.MediaEventType.MUTE_CHANGE, { muted: this.mediaElement.muted });
        };
        this.handleRateChange = () => {
            if (!this.mediaElement)
                return;
            this.emitEvent(types_1.MediaEventType.PLAYBACK_RATE_CHANGE, { playbackRate: this.mediaElement.playbackRate });
        };
        this.handleWaiting = () => {
            this.setState(types_1.MediaState.BUFFERING);
        };
        this.handleError = (e) => {
            this.setState(types_1.MediaState.ERROR);
            this.emitEvent(types_1.MediaEventType.ERROR, { error: this.mediaElement?.error });
        };
        this.handleProgress = () => {
            if (!this.mediaElement)
                return;
            let buffered = 0;
            if (this.mediaElement.buffered.length > 0) {
                buffered = this.mediaElement.buffered.end(this.mediaElement.buffered.length - 1) / this.mediaElement.duration;
            }
            this.emitEvent(types_1.MediaEventType.BUFFER_UPDATE, { buffered });
        };
        this.id = id || (0, uuid_1.v4)();
        this.eventEmitter = new eventemitter3_1.default();
        this.mediaInfo = {
            id: this.id,
            type: types_1.MediaType.VIDEO,
            source: ''
        };
        if (mediaElement) {
            this.attachMediaElement(mediaElement);
        }
    }
    /**
     * HTML 미디어 요소 연결
     * @param mediaElement HTML 비디오/오디오 요소
     */
    attachMediaElement(mediaElement) {
        // 기존 미디어 요소가 있으면 이벤트 리스너 제거
        if (this.mediaElement) {
            this.detachMediaElement();
        }
        this.mediaElement = mediaElement;
        this.mediaInfo.type = mediaElement instanceof HTMLVideoElement ? types_1.MediaType.VIDEO : types_1.MediaType.AUDIO;
        // 미디어 요소에 이벤트 리스너 추가
        this.addMediaElementEventListeners();
        // 미디어 요소에 소스가 있으면 미디어 정보 업데이트
        if (mediaElement.src) {
            this.mediaInfo.source = mediaElement.src;
            if (mediaElement.readyState >= 1) {
                this.updateMediaInfo();
            }
        }
    }
    /**
     * HTML 미디어 요소 분리
     */
    detachMediaElement() {
        if (this.mediaElement) {
            this.removeMediaElementEventListeners();
            this.mediaElement = null;
        }
        this.stopTimeUpdateInterval();
    }
    /**
     * 미디어 로드
     * @param source 미디어 소스 URL 또는 미디어 정보 객체
     * @param options 미디어 제어 옵션
     */
    async load(source, options) {
        if (!this.mediaElement) {
            throw new Error('No media element attached');
        }
        try {
            this.setState(types_1.MediaState.LOADING);
            // 미디어 정보 설정
            if (typeof source === 'string') {
                this.mediaInfo = {
                    id: this.id,
                    type: this.mediaElement instanceof HTMLVideoElement ? types_1.MediaType.VIDEO : types_1.MediaType.AUDIO,
                    source
                };
                this.mediaElement.src = source;
            }
            else {
                this.mediaInfo = {
                    ...source,
                    id: this.id
                };
                this.mediaElement.src = source.source;
            }
            // 옵션 적용
            if (options) {
                if (options.volume !== undefined) {
                    this.mediaElement.volume = options.volume;
                }
                if (options.muted !== undefined) {
                    this.mediaElement.muted = options.muted;
                }
                if (options.playbackRate !== undefined) {
                    this.mediaElement.playbackRate = options.playbackRate;
                }
                this.loop = options.loop !== undefined ? options.loop : false;
                this.startTime = options.startTime !== undefined ? options.startTime : 0;
                this.endTime = options.endTime !== undefined ? options.endTime : 0;
            }
            // 미디어 로드
            await new Promise((resolve, reject) => {
                if (!this.mediaElement) {
                    reject(new Error('No media element attached'));
                    return;
                }
                const loadedMetadataHandler = () => {
                    this.updateMediaInfo();
                    // 종료 시간 설정
                    if (this.endTime <= 0 || this.endTime > this.mediaElement.duration) {
                        this.endTime = this.mediaElement.duration;
                    }
                    // 시작 시간 설정
                    if (this.startTime > 0) {
                        this.mediaElement.currentTime = this.startTime;
                    }
                    this.mediaElement.removeEventListener('loadedmetadata', loadedMetadataHandler);
                    this.setState(types_1.MediaState.READY);
                    resolve();
                };
                const errorHandler = (e) => {
                    this.mediaElement.removeEventListener('error', errorHandler);
                    this.mediaElement.removeEventListener('loadedmetadata', loadedMetadataHandler);
                    this.setState(types_1.MediaState.ERROR);
                    reject(new Error('Failed to load media'));
                };
                this.mediaElement.addEventListener('loadedmetadata', loadedMetadataHandler);
                this.mediaElement.addEventListener('error', errorHandler);
                // 이미 메타데이터가 로드된 경우
                if (this.mediaElement.readyState >= 1) {
                    loadedMetadataHandler();
                }
            });
            // 자동 재생
            if (options?.autoPlay) {
                await this.play();
            }
            // 시간 업데이트 간격 시작
            this.startTimeUpdateInterval();
        }
        catch (error) {
            this.setState(types_1.MediaState.ERROR);
            this.emitEvent(types_1.MediaEventType.ERROR, { error });
            throw error;
        }
    }
    /**
     * 재생 시작
     */
    async play() {
        if (!this.mediaElement) {
            throw new Error('No media element attached');
        }
        if (this.state === types_1.MediaState.PLAYING) {
            return;
        }
        try {
            this.setState(types_1.MediaState.PLAYING);
            await this.mediaElement.play();
            this.startTimeUpdateInterval();
        }
        catch (error) {
            this.setState(types_1.MediaState.PAUSED);
            throw error;
        }
    }
    /**
     * 일시 정지
     */
    async pause() {
        if (!this.mediaElement) {
            throw new Error('No media element attached');
        }
        if (this.state !== types_1.MediaState.PLAYING) {
            return;
        }
        this.mediaElement.pause();
        this.setState(types_1.MediaState.PAUSED);
    }
    /**
     * 재생/일시정지 토글
     */
    async togglePlay() {
        if (this.state === types_1.MediaState.PLAYING) {
            return this.pause();
        }
        else {
            return this.play();
        }
    }
    /**
     * 정지 (처음으로 돌아가고 일시 정지)
     */
    async stop() {
        if (!this.mediaElement) {
            throw new Error('No media element attached');
        }
        this.mediaElement.pause();
        this.mediaElement.currentTime = this.startTime;
        this.setState(types_1.MediaState.READY);
        this.emitEvent(types_1.MediaEventType.TIME_UPDATE, { currentTime: this.mediaElement.currentTime });
    }
    /**
     * 특정 시간으로 이동
     * @param time 이동할 시간 (초)
     * @param options 시크 옵션
     */
    async seek(time, options) {
        if (!this.mediaElement) {
            throw new Error('No media element attached');
        }
        this.setState(types_1.MediaState.SEEKING);
        this.emitEvent(types_1.MediaEventType.SEEKING, { time });
        // 상대적 시크인 경우 현재 시간에 추가
        if (options?.relative) {
            this.mediaElement.currentTime += time;
        }
        else {
            this.mediaElement.currentTime = time;
        }
        // 범위 제한
        if (this.mediaElement.currentTime < this.startTime) {
            this.mediaElement.currentTime = this.startTime;
        }
        else if (this.mediaElement.currentTime > this.endTime) {
            this.mediaElement.currentTime = this.endTime;
        }
    }
    /**
     * 볼륨 설정
     * @param volume 볼륨 값 (0-1)
     */
    setVolume(volume) {
        if (!this.mediaElement) {
            throw new Error('No media element attached');
        }
        // 볼륨 범위 제한
        this.mediaElement.volume = Math.max(0, Math.min(volume, 1));
    }
    /**
     * 음소거 설정
     * @param muted 음소거 여부
     */
    setMuted(muted) {
        if (!this.mediaElement) {
            throw new Error('No media element attached');
        }
        this.mediaElement.muted = muted;
    }
    /**
     * 음소거 토글
     */
    toggleMute() {
        if (!this.mediaElement) {
            throw new Error('No media element attached');
        }
        this.mediaElement.muted = !this.mediaElement.muted;
    }
    /**
     * 재생 속도 설정
     * @param rate 재생 속도 (1.0 = 정상 속도)
     */
    setPlaybackRate(rate) {
        if (!this.mediaElement) {
            throw new Error('No media element attached');
        }
        this.mediaElement.playbackRate = rate;
    }
    /**
     * 현재 상태 가져오기
     * @returns 미디어 상태 객체
     */
    getStatus() {
        if (!this.mediaElement) {
            return {
                id: this.id,
                state: this.state,
                currentTime: 0,
                duration: 0,
                volume: 0,
                muted: false,
                playbackRate: 1,
                buffered: 0,
                mediaInfo: this.mediaInfo
            };
        }
        // 버퍼링 계산
        let buffered = 0;
        if (this.mediaElement.buffered.length > 0) {
            buffered = this.mediaElement.buffered.end(this.mediaElement.buffered.length - 1) / this.mediaElement.duration;
        }
        return {
            id: this.id,
            state: this.state,
            currentTime: this.mediaElement.currentTime,
            duration: this.mediaElement.duration || 0,
            volume: this.mediaElement.volume,
            muted: this.mediaElement.muted,
            playbackRate: this.mediaElement.playbackRate,
            buffered,
            mediaInfo: this.mediaInfo
        };
    }
    /**
     * 미디어 정보 가져오기
     * @returns 미디어 정보 객체
     */
    getMediaInfo() {
        return this.mediaInfo;
    }
    /**
     * 이벤트 리스너 등록
     * @param event 이벤트 타입
     * @param callback 콜백 함수
     */
    on(event, callback) {
        this.eventEmitter.on(event, callback);
    }
    /**
     * 이벤트 리스너 제거
     * @param event 이벤트 타입
     * @param callback 콜백 함수
     */
    off(event, callback) {
        this.eventEmitter.off(event, callback);
    }
    /**
     * 모든 이벤트 리스너 제거
     */
    removeAllListeners() {
        this.eventEmitter.removeAllListeners();
    }
    /**
     * 미디어 컨트롤러 해제
     */
    dispose() {
        this.detachMediaElement();
        this.removeAllListeners();
        this.setState(types_1.MediaState.IDLE);
    }
    /**
     * 상태 설정
     * @param state 새 상태
     */
    setState(state) {
        if (this.state !== state) {
            this.state = state;
            this.emitEvent(types_1.MediaEventType.STATE_CHANGE, { state });
        }
    }
    /**
     * 이벤트 발생
     * @param type 이벤트 타입
     * @param data 이벤트 데이터
     */
    emitEvent(type, data) {
        const event = {
            type,
            mediaId: this.id,
            data,
            timestamp: Date.now()
        };
        this.eventEmitter.emit(type, event);
    }
    /**
     * 미디어 요소 이벤트 리스너 추가
     */
    addMediaElementEventListeners() {
        if (!this.mediaElement)
            return;
        // 미디어 이벤트 핸들러
        this.mediaElement.addEventListener('play', this.handlePlay);
        this.mediaElement.addEventListener('pause', this.handlePause);
        this.mediaElement.addEventListener('ended', this.handleEnded);
        this.mediaElement.addEventListener('seeking', this.handleSeeking);
        this.mediaElement.addEventListener('seeked', this.handleSeeked);
        this.mediaElement.addEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.mediaElement.addEventListener('volumechange', this.handleVolumeChange);
        this.mediaElement.addEventListener('ratechange', this.handleRateChange);
        this.mediaElement.addEventListener('waiting', this.handleWaiting);
        this.mediaElement.addEventListener('error', this.handleError);
        this.mediaElement.addEventListener('progress', this.handleProgress);
    }
    /**
     * 미디어 요소 이벤트 리스너 제거
     */
    removeMediaElementEventListeners() {
        if (!this.mediaElement)
            return;
        this.mediaElement.removeEventListener('play', this.handlePlay);
        this.mediaElement.removeEventListener('pause', this.handlePause);
        this.mediaElement.removeEventListener('ended', this.handleEnded);
        this.mediaElement.removeEventListener('seeking', this.handleSeeking);
        this.mediaElement.removeEventListener('seeked', this.handleSeeked);
        this.mediaElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.mediaElement.removeEventListener('volumechange', this.handleVolumeChange);
        this.mediaElement.removeEventListener('ratechange', this.handleRateChange);
        this.mediaElement.removeEventListener('waiting', this.handleWaiting);
        this.mediaElement.removeEventListener('error', this.handleError);
        this.mediaElement.removeEventListener('progress', this.handleProgress);
    }
    /**
     * 미디어 정보 업데이트
     */
    updateMediaInfo() {
        if (!this.mediaElement)
            return;
        this.mediaInfo.duration = this.mediaElement.duration;
        if (this.mediaElement instanceof HTMLVideoElement) {
            this.mediaInfo.width = this.mediaElement.videoWidth;
            this.mediaInfo.height = this.mediaElement.videoHeight;
        }
        this.emitEvent(types_1.MediaEventType.LOADED_METADATA, {
            duration: this.mediaInfo.duration,
            width: this.mediaInfo.width,
            height: this.mediaInfo.height
        });
    }
    /**
     * 시간 업데이트 간격 시작
     */
    startTimeUpdateInterval() {
        if (this.timeUpdateInterval) {
            this.stopTimeUpdateInterval();
        }
        // 100ms 간격으로 시간 업데이트 이벤트 발생
        this.timeUpdateInterval = window.setInterval(() => {
            if (!this.mediaElement)
                return;
            // 종료 시간 체크
            if (this.mediaElement.currentTime >= this.endTime && this.state === types_1.MediaState.PLAYING) {
                if (this.loop) {
                    this.mediaElement.currentTime = this.startTime;
                }
                else {
                    this.mediaElement.pause();
                    this.setState(types_1.MediaState.ENDED);
                    this.emitEvent(types_1.MediaEventType.ENDED, {});
                }
            }
            this.emitEvent(types_1.MediaEventType.TIME_UPDATE, { currentTime: this.mediaElement.currentTime });
        }, 100);
    }
    /**
     * 시간 업데이트 간격 중지
     */
    stopTimeUpdateInterval() {
        if (this.timeUpdateInterval) {
            window.clearInterval(this.timeUpdateInterval);
            this.timeUpdateInterval = null;
        }
    }
}
exports.HTML5MediaAdapter = HTML5MediaAdapter;
//# sourceMappingURL=HTML5MediaAdapter.js.map