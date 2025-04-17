"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const PlayerContext_1 = require("./PlayerContext");
const PlayerControls_1 = __importDefault(require("./PlayerControls"));
require("./PreviewPlayer.css");
/**
 * 내부 플레이어 컴포넌트
 */
const PlayerComponent = ({ src, autoPlay = false, controls = true, loop = false, muted = false, poster, startTime, endTime, width = '100%', height = 'auto', onPlayStateChange, onTimeUpdate, onLoadedData, onEnded, onError, className, style, }) => {
    const { state, dispatch, videoRef } = (0, PlayerContext_1.usePlayer)();
    const timeUpdateRef = (0, react_1.useRef)(null);
    // 비디오 이벤트 핸들러 설정
    (0, react_1.useEffect)(() => {
        const videoElement = videoRef.current;
        if (!videoElement)
            return;
        // 비디오 로드 완료 이벤트
        const handleLoadedData = () => {
            dispatch({ type: 'SET_LOADED', payload: true });
            dispatch({ type: 'SET_DURATION', payload: videoElement.duration });
            // 시작 시간이 지정된 경우 해당 위치로 이동
            if (startTime !== undefined && startTime >= 0) {
                videoElement.currentTime = startTime;
            }
            if (onLoadedData) {
                onLoadedData();
            }
        };
        // 재생 상태 변경 이벤트
        const handlePlayStateChange = () => {
            const isPlaying = !videoElement.paused;
            dispatch({ type: isPlaying ? 'PLAY' : 'PAUSE' });
            if (onPlayStateChange) {
                onPlayStateChange(isPlaying);
            }
        };
        // 시간 업데이트 이벤트
        const handleTimeUpdate = () => {
            const currentTime = videoElement.currentTime;
            // endTime이 지정되어 있고 현재 시간이 endTime을 초과한 경우
            if (endTime !== undefined && currentTime >= endTime) {
                videoElement.pause();
                if (loop) {
                    videoElement.currentTime = startTime || 0;
                    videoElement.play();
                }
            }
            dispatch({ type: 'SEEK', payload: currentTime });
            if (onTimeUpdate) {
                onTimeUpdate(currentTime);
            }
        };
        // 비디오 종료 이벤트
        const handleEnded = () => {
            dispatch({ type: 'PAUSE' });
            if (loop) {
                videoElement.currentTime = startTime || 0;
                videoElement.play();
            }
            if (onEnded) {
                onEnded();
            }
        };
        // 에러 이벤트
        const handleError = (e) => {
            if (onError) {
                onError(new Error('비디오 로드 중 오류가 발생했습니다.'));
            }
        };
        // 버퍼링 상태 감지
        const handleWaiting = () => {
            dispatch({ type: 'SET_BUFFERING', payload: true });
        };
        const handlePlaying = () => {
            dispatch({ type: 'SET_BUFFERING', payload: false });
        };
        // 이벤트 리스너 등록
        videoElement.addEventListener('loadeddata', handleLoadedData);
        videoElement.addEventListener('play', handlePlayStateChange);
        videoElement.addEventListener('pause', handlePlayStateChange);
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('ended', handleEnded);
        videoElement.addEventListener('error', handleError);
        videoElement.addEventListener('waiting', handleWaiting);
        videoElement.addEventListener('playing', handlePlaying);
        // 초기 상태 설정
        videoElement.muted = muted;
        dispatch({ type: 'TOGGLE_MUTE' });
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            videoElement.removeEventListener('loadeddata', handleLoadedData);
            videoElement.removeEventListener('play', handlePlayStateChange);
            videoElement.removeEventListener('pause', handlePlayStateChange);
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            videoElement.removeEventListener('ended', handleEnded);
            videoElement.removeEventListener('error', handleError);
            videoElement.removeEventListener('waiting', handleWaiting);
            videoElement.removeEventListener('playing', handlePlaying);
            // 진행 중인 타이머 정리
            if (timeUpdateRef.current) {
                clearInterval(timeUpdateRef.current);
            }
        };
    }, [
        videoRef,
        dispatch,
        startTime,
        endTime,
        loop,
        muted,
        onLoadedData,
        onPlayStateChange,
        onTimeUpdate,
        onEnded,
        onError
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: `preview-player-container ${className || ''}`, style: Object.assign(Object.assign({}, style), { width,
            height, position: 'relative' }), children: [(0, jsx_runtime_1.jsx)("video", { ref: videoRef, className: "preview-player-video", src: src, poster: poster, autoPlay: autoPlay, loop: loop, muted: muted, playsInline: true }), state.isBuffering && ((0, jsx_runtime_1.jsx)("div", { className: "buffering-indicator", children: (0, jsx_runtime_1.jsx)("div", { className: "spinner" }) })), controls && (0, jsx_runtime_1.jsx)(PlayerControls_1.default, { showControls: controls })] }));
};
/**
 * 비디오 미리보기 플레이어 컴포넌트
 *
 * 비디오 미리보기 및 재생을 위한 React 컴포넌트입니다.
 * 기본 HTML5 비디오 플레이어 기능과 함께 추가 기능을 제공합니다.
 */
const PreviewPlayer = (props) => {
    return ((0, jsx_runtime_1.jsx)(PlayerContext_1.PreviewPlayerProvider, { children: (0, jsx_runtime_1.jsx)(PlayerComponent, Object.assign({}, props)) }));
};
exports.default = PreviewPlayer;
//# sourceMappingURL=PreviewPlayer.js.map