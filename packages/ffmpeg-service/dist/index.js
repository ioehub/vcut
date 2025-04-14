"use strict";
/**
 * FFmpeg 서비스 모듈 - vCut 비디오 편집기
 *
 * 이 모듈은 FFmpeg를 사용하여 비디오 및 오디오 처리 기능을 제공합니다.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./FFmpegService"), exports);
__exportStar(require("./FFmpegServiceExtended"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./utils/formatUtils"), exports);
__exportStar(require("./utils/pathUtils"), exports);
