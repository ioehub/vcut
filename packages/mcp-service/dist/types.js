"use strict";
/**
 * 미디어 제어 프로토콜 서비스 관련 타입 정의
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaEventType = exports.MediaState = exports.MediaType = void 0;
/**
 * 미디어 타입 열거형
 */
var MediaType;
(function (MediaType) {
    MediaType["VIDEO"] = "video";
    MediaType["AUDIO"] = "audio";
})(MediaType || (exports.MediaType = MediaType = {}));
/**
 * 미디어 상태 열거형
 */
var MediaState;
(function (MediaState) {
    MediaState["IDLE"] = "idle";
    MediaState["LOADING"] = "loading";
    MediaState["READY"] = "ready";
    MediaState["PLAYING"] = "playing";
    MediaState["PAUSED"] = "paused";
    MediaState["SEEKING"] = "seeking";
    MediaState["BUFFERING"] = "buffering";
    MediaState["ENDED"] = "ended";
    MediaState["ERROR"] = "error";
})(MediaState || (exports.MediaState = MediaState = {}));
/**
 * 미디어 이벤트 타입 열거형
 */
var MediaEventType;
(function (MediaEventType) {
    MediaEventType["STATE_CHANGE"] = "stateChange";
    MediaEventType["TIME_UPDATE"] = "timeUpdate";
    MediaEventType["DURATION_CHANGE"] = "durationChange";
    MediaEventType["VOLUME_CHANGE"] = "volumeChange";
    MediaEventType["MUTE_CHANGE"] = "muteChange";
    MediaEventType["PLAYBACK_RATE_CHANGE"] = "playbackRateChange";
    MediaEventType["LOADED_METADATA"] = "loadedMetadata";
    MediaEventType["PROGRESS"] = "progress";
    MediaEventType["ERROR"] = "error";
    MediaEventType["ENDED"] = "ended";
    MediaEventType["SEEKING"] = "seeking";
    MediaEventType["SEEKED"] = "seeked";
    MediaEventType["BUFFER_UPDATE"] = "bufferUpdate";
})(MediaEventType || (exports.MediaEventType = MediaEventType = {}));
//# sourceMappingURL=types.js.map