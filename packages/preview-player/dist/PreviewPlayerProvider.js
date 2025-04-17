"use strict";
/**
 * PreviewPlayerProvider
 *
 * PlayerProvider를 감싸는 컴포넌트로, 네이밍 규칙에 맞춰 제공됩니다.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewPlayerProvider = void 0;

var react_1 = __importDefault(require("react"));
var PlayerContext_1 = require("./PlayerContext");

/**
 * PreviewPlayerProvider 컴포넌트
 * 
 * PlayerProvider를 감싸는 컴포넌트로, 네이밍 규칙에 맞춰 제공됩니다.
 * 내부적으로 PlayerProvider를 사용합니다.
 */
var PreviewPlayerProvider = function (props) {
    return react_1.default.createElement(PlayerContext_1.PlayerProvider, props);
};
exports.PreviewPlayerProvider = PreviewPlayerProvider;
//# sourceMappingURL=PreviewPlayerProvider.js.map
