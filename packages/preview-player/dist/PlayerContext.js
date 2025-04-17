"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayer = exports.PreviewPlayerProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
// 초기 플레이어 상태
const initialState = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isBuffering: false,
    isLoaded: false,
    isFullscreen: false,
};
// 플레이어 상태 리듀서
function playerReducer(state, action) {
    switch (action.type) {
        case 'PLAY':
            return Object.assign(Object.assign({}, state), { isPlaying: true });
        case 'PAUSE':
            return Object.assign(Object.assign({}, state), { isPlaying: false });
        case 'TOGGLE_PLAY':
            return Object.assign(Object.assign({}, state), { isPlaying: !state.isPlaying });
        case 'SEEK':
            return Object.assign(Object.assign({}, state), { currentTime: action.payload });
        case 'SET_VOLUME':
            return Object.assign(Object.assign({}, state), { volume: action.payload });
        case 'TOGGLE_MUTE':
            return Object.assign(Object.assign({}, state), { isMuted: !state.isMuted });
        case 'TOGGLE_FULLSCREEN':
            return Object.assign(Object.assign({}, state), { isFullscreen: !state.isFullscreen });
        case 'SET_DURATION':
            return Object.assign(Object.assign({}, state), { duration: action.payload });
        case 'SET_BUFFERING':
            return Object.assign(Object.assign({}, state), { isBuffering: action.payload });
        case 'SET_LOADED':
            return Object.assign(Object.assign({}, state), { isLoaded: action.payload });
        default:
            return state;
    }
}
// 플레이어 컨텍스트 생성
const PlayerContext = (0, react_1.createContext)(undefined);
// 플레이어 컨텍스트 제공자 컴포넌트
const PreviewPlayerProvider = ({ children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(playerReducer, initialState);
    const videoRef = (0, react_1.useRef)(null);
    const value = { state, dispatch, videoRef };
    return (0, jsx_runtime_1.jsx)(PlayerContext.Provider, { value: value, children: children });
};
exports.PreviewPlayerProvider = PreviewPlayerProvider;
// 플레이어 컨텍스트 사용 훅
const usePlayer = () => {
    const context = (0, react_1.useContext)(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PreviewPlayerProvider');
    }
    return context;
};
exports.usePlayer = usePlayer;
exports.default = PlayerContext;
//# sourceMappingURL=PlayerContext.js.map