"use strict";
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDirectoryExists = ensureDirectoryExists;
exports.getTempDirectory = getTempDirectory;
exports.getTempFilePath = getTempFilePath;
exports.getFileExtension = getFileExtension;
exports.getFileNameWithoutExtension = getFileNameWithoutExtension;
exports.getDirectoryPath = getDirectoryPath;
exports.fileExists = fileExists;
exports.directoryExists = directoryExists;
exports.deleteFile = deleteFile;
exports.deleteDirectory = deleteDirectory;
exports.moveFile = moveFile;
exports.copyFile = copyFile;
/**
 * 경로 유틸리티 함수
 */
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const uuid_1 = require("uuid");
/**
 * 디렉토리가 존재하는지 확인하고, 없으면 생성
 * @param dirPath 디렉토리 경로
 */
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
/**
 * 임시 디렉토리 경로 가져오기
 * @returns 임시 디렉토리 경로
 */
function getTempDirectory() {
    const tempDir = path.join(os.tmpdir(), 'vcut-ffmpeg');
    ensureDirectoryExists(tempDir);
    return tempDir;
}
/**
 * 임시 파일 경로 생성
 * @param prefix 파일 이름 접두사
 * @param extension 파일 확장자 (점 제외)
 * @returns 임시 파일 경로
 */
function getTempFilePath(prefix = 'temp', extension = '') {
    const tempDir = getTempDirectory();
    const fileName = `${prefix}-${(0, uuid_1.v4)()}${extension ? `.${extension}` : ''}`;
    return path.join(tempDir, fileName);
}
/**
 * 파일 확장자 가져오기
 * @param filePath 파일 경로
 * @returns 확장자 (점 제외)
 */
function getFileExtension(filePath) {
    return path.extname(filePath).slice(1).toLowerCase();
}
/**
 * 파일 이름 가져오기 (확장자 제외)
 * @param filePath 파일 경로
 * @returns 파일 이름 (확장자 제외)
 */
function getFileNameWithoutExtension(filePath) {
    const baseName = path.basename(filePath);
    const extName = path.extname(baseName);
    return baseName.slice(0, baseName.length - extName.length);
}
/**
 * 파일 경로에서 디렉토리 경로 가져오기
 * @param filePath 파일 경로
 * @returns 디렉토리 경로
 */
function getDirectoryPath(filePath) {
    return path.dirname(filePath);
}
/**
 * 파일이 존재하는지 확인
 * @param filePath 파일 경로
 * @returns 파일 존재 여부
 */
function fileExists(filePath) {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}
/**
 * 디렉토리가 존재하는지 확인
 * @param dirPath 디렉토리 경로
 * @returns 디렉토리 존재 여부
 */
function directoryExists(dirPath) {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}
/**
 * 파일 삭제
 * @param filePath 파일 경로
 * @returns 삭제 성공 여부
 */
function deleteFile(filePath) {
    try {
        if (fileExists(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    }
    catch (error) {
        console.error(`파일 삭제 중 오류 발생: ${error.message}`);
        return false;
    }
}
/**
 * 디렉토리 삭제 (재귀적)
 * @param dirPath 디렉토리 경로
 * @returns 삭제 성공 여부
 */
function deleteDirectory(dirPath) {
    try {
        if (directoryExists(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
            return true;
        }
        return false;
    }
    catch (error) {
        console.error(`디렉토리 삭제 중 오류 발생: ${error.message}`);
        return false;
    }
}
/**
 * 파일 이동
 * @param sourcePath 원본 파일 경로
 * @param targetPath 대상 파일 경로
 * @returns 이동 성공 여부
 */
function moveFile(sourcePath, targetPath) {
    try {
        if (fileExists(sourcePath)) {
            ensureDirectoryExists(path.dirname(targetPath));
            fs.renameSync(sourcePath, targetPath);
            return true;
        }
        return false;
    }
    catch (error) {
        console.error(`파일 이동 중 오류 발생: ${error.message}`);
        return false;
    }
}
/**
 * 파일 복사
 * @param sourcePath 원본 파일 경로
 * @param targetPath 대상 파일 경로
 * @returns 복사 성공 여부
 */
function copyFile(sourcePath, targetPath) {
    try {
        if (fileExists(sourcePath)) {
            ensureDirectoryExists(path.dirname(targetPath));
            fs.copyFileSync(sourcePath, targetPath);
            return true;
        }
        return false;
    }
    catch (error) {
        console.error(`파일 복사 중 오류 발생: ${error.message}`);
        return false;
    }
}
