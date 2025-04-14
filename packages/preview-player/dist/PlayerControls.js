"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const PlayerContext_1 = require("./PlayerContext");
require("./PlayerControls.css");
/**
 * 시간을 포맷팅하는 함수
 */
const formatTime = (seconds, format = 'mm:ss') => {
    if (format === 'seconds') {
        return seconds.toFixed(1);
    }
    const pad = (num) => (num < 10 ? `0${num}` : `${num}`);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (format === 'hh:mm:ss' || hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }
    return `${pad(minutes)}:${pad(secs)}`;
};
/**
 * 플레이어 컨트롤 컴포넌트
 */
const PlayerControls = ({ showControls, timeFormat = 'mm:ss', showVolumeControl = true, showFullscreenButton = true, showProgressBar = true, }) => {
    const { state, dispatch, videoRef } = (0, PlayerContext_1.usePlayer)();
    const [isControlsVisible, setIsControlsVisible] = (0, react_1.useState)(false);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    // 컨트롤 표시 상태 관리
    (0, react_1.useEffect)(() => {
        if (!showControls) {
            setIsControlsVisible(false);
            return;
        }
        let hideTimeout;
        const showControlsUI = () => {
            setIsControlsVisible(true);
            clearTimeout(hideTimeout);
            if (!state.isPlaying)
                return;
            hideTimeout = setTimeout(() => {
                if (!isDragging) {
                    setIsControlsVisible(false);
                }
            }, 3000);
        };
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('mousemove', showControlsUI);
            videoElement.addEventListener('mouseenter', showControlsUI);
            videoElement.addEventListener('mouseleave', () => {
                if (!isDragging && state.isPlaying) {
                    setIsControlsVisible(false);
                }
            });
        }
        return () => {
            clearTimeout(hideTimeout);
            if (videoElement) {
                videoElement.removeEventListener('mousemove', showControlsUI);
                videoElement.removeEventListener('mouseenter', showControlsUI);
            }
        };
    }, [showControls, state.isPlaying, isDragging, videoRef]);
    // 재생/일시정지 토글
    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video)
            return;
        if (state.isPlaying) {
            video.pause();
            dispatch({ type: 'PAUSE' });
        }
        else {
            video.play();
            dispatch({ type: 'PLAY' });
        }
    };
    // 음소거 토글
    const handleMute = () => {
        const video = videoRef.current;
        if (!video)
            return;
        video.muted = !video.muted;
        dispatch({ type: 'TOGGLE_MUTE' });
    };
    // 볼륨 변경
    const handleVolumeChange = (e) => {
        const video = videoRef.current;
        if (!video)
            return;
        const volume = parseFloat(e.target.value);
        video.volume = volume;
        dispatch({ type: 'SET_VOLUME', payload: volume });
    };
    // 시간 변경 (시크)
    const handleSeek = (e) => {
        const video = videoRef.current;
        if (!video)
            return;
        const seekTime = parseFloat(e.target.value);
        video.currentTime = seekTime;
        dispatch({ type: 'SEEK', payload: seekTime });
    };
    // 전체 화면 토글
    const handleFullscreen = () => {
        const video = videoRef.current;
        if (!video)
            return;
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
                console.error(`전체 화면 모드 전환 오류: ${err.message}`);
            });
        }
        else {
            document.exitFullscreen();
        }
        dispatch({ type: 'TOGGLE_FULLSCREEN' });
    };
    // 진행 바 드래그 시작
    const handleDragStart = () => {
        setIsDragging(true);
    };
    // 진행 바 드래그 종료
    const handleDragEnd = () => {
        setIsDragging(false);
    };
    // 컨트롤이 표시되지 않으면 렌더링하지 않음
    if (!showControls && !isControlsVisible) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: `player-controls ${isControlsVisible ? 'visible' : ''}`, children: [showProgressBar && ((0, jsx_runtime_1.jsxs)("div", { className: "progress-container", children: [(0, jsx_runtime_1.jsx)("input", { type: "range", className: "progress-bar", min: 0, max: state.duration || 100, value: state.currentTime, onChange: handleSeek, onMouseDown: handleDragStart, onMouseUp: handleDragEnd, onTouchStart: handleDragStart, onTouchEnd: handleDragEnd }), (0, jsx_runtime_1.jsx)("div", { className: "progress-indicator", style: { width: `${(state.currentTime / (state.duration || 1)) * 100}%` } })] })), (0, jsx_runtime_1.jsxs)("div", { className: "controls-row", children: [(0, jsx_runtime_1.jsx)("button", { className: "control-button", onClick: handlePlayPause, children: state.isPlaying ? '⏸️' : '▶️' }), (0, jsx_runtime_1.jsxs)("div", { className: "time-display", children: [formatTime(state.currentTime, timeFormat), " / ", formatTime(state.duration, timeFormat)] }), showVolumeControl && ((0, jsx_runtime_1.jsxs)("div", { className: "volume-control", children: [(0, jsx_runtime_1.jsx)("button", { className: "control-button", onClick: handleMute, children: state.isMuted ? '🔇' : '🔊' }), (0, jsx_runtime_1.jsx)("input", { type: "range", className: "volume-slider", min: 0, max: 1, step: 0.1, value: state.volume, onChange: handleVolumeChange })] })), showFullscreenButton && ((0, jsx_runtime_1.jsx)("button", { className: "control-button", onClick: handleFullscreen, children: state.isFullscreen ? '⏹️' : '⛶' }))] })] }));
};
exports.default = PlayerControls;
//# sourceMappingURL=PlayerControls.js.map