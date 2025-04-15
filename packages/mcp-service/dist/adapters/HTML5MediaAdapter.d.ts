import { MediaEventType, MediaInfo, MediaStatus, MediaEvent, MediaControlOptions, SeekOptions, MediaController } from '../types';
/**
 * HTML5 미디어 어댑터 클래스
 * HTML5 비디오/오디오 요소와 통합하기 위한 어댑터
 */
export declare class HTML5MediaAdapter implements MediaController {
    private id;
    private mediaElement;
    private mediaInfo;
    private state;
    private eventEmitter;
    private startTime;
    private endTime;
    private loop;
    private timeUpdateInterval;
    /**
     * HTML5MediaAdapter 생성자
     * @param mediaElement HTML 비디오/오디오 요소 (선택 사항)
     * @param id 미디어 ID (선택 사항, 제공하지 않으면 자동 생성)
     */
    constructor(mediaElement?: HTMLVideoElement | HTMLAudioElement, id?: string);
    /**
     * HTML 미디어 요소 연결
     * @param mediaElement HTML 비디오/오디오 요소
     */
    attachMediaElement(mediaElement: HTMLVideoElement | HTMLAudioElement): void;
    /**
     * HTML 미디어 요소 분리
     */
    detachMediaElement(): void;
    /**
     * 미디어 로드
     * @param source 미디어 소스 URL 또는 미디어 정보 객체
     * @param options 미디어 제어 옵션
     */
    load(source: string | MediaInfo, options?: MediaControlOptions): Promise<void>;
    /**
     * 재생 시작
     */
    play(): Promise<void>;
    /**
     * 일시 정지
     */
    pause(): Promise<void>;
    /**
     * 재생/일시정지 토글
     */
    togglePlay(): Promise<void>;
    /**
     * 정지 (처음으로 돌아가고 일시 정지)
     */
    stop(): Promise<void>;
    /**
     * 특정 시간으로 이동
     * @param time 이동할 시간 (초)
     * @param options 시크 옵션
     */
    seek(time: number, options?: SeekOptions): Promise<void>;
    /**
     * 볼륨 설정
     * @param volume 볼륨 값 (0-1)
     */
    setVolume(volume: number): void;
    /**
     * 음소거 설정
     * @param muted 음소거 여부
     */
    setMuted(muted: boolean): void;
    /**
     * 음소거 토글
     */
    toggleMute(): void;
    /**
     * 재생 속도 설정
     * @param rate 재생 속도 (1.0 = 정상 속도)
     */
    setPlaybackRate(rate: number): void;
    /**
     * 현재 상태 가져오기
     * @returns 미디어 상태 객체
     */
    getStatus(): MediaStatus;
    /**
     * 미디어 정보 가져오기
     * @returns 미디어 정보 객체
     */
    getMediaInfo(): MediaInfo;
    /**
     * 이벤트 리스너 등록
     * @param event 이벤트 타입
     * @param callback 콜백 함수
     */
    on(event: MediaEventType, callback: (event: MediaEvent) => void): void;
    /**
     * 이벤트 리스너 제거
     * @param event 이벤트 타입
     * @param callback 콜백 함수
     */
    off(event: MediaEventType, callback: (event: MediaEvent) => void): void;
    /**
     * 모든 이벤트 리스너 제거
     */
    removeAllListeners(): void;
    /**
     * 미디어 컨트롤러 해제
     */
    dispose(): void;
    /**
     * 상태 설정
     * @param state 새 상태
     */
    private setState;
    /**
     * 이벤트 발생
     * @param type 이벤트 타입
     * @param data 이벤트 데이터
     */
    private emitEvent;
    /**
     * 미디어 요소 이벤트 리스너 추가
     */
    private addMediaElementEventListeners;
    /**
     * 미디어 요소 이벤트 리스너 제거
     */
    private removeMediaElementEventListeners;
    /**
     * 미디어 정보 업데이트
     */
    private updateMediaInfo;
    /**
     * 시간 업데이트 간격 시작
     */
    private startTimeUpdateInterval;
    /**
     * 시간 업데이트 간격 중지
     */
    private stopTimeUpdateInterval;
    private handlePlay;
    private handlePause;
    private handleEnded;
    private handleSeeking;
    private handleSeeked;
    private handleLoadedMetadata;
    private handleVolumeChange;
    private handleRateChange;
    private handleWaiting;
    private handleError;
    private handleProgress;
}
