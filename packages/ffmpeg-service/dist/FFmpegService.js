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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFmpegService = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path = __importStar(require("path"));
const pathUtils_1 = require("./utils/pathUtils");
/**
 * FFmpeg 서비스 클래스
 * 비디오 및 오디오 처리를 위한 FFmpeg 래퍼
 */
class FFmpegService {
    /**
     * FFmpeg 서비스 생성자
     * @param ffmpegPath FFmpeg 실행 파일 경로 (선택 사항)
     * @param ffprobePath FFprobe 실행 파일 경로 (선택 사항)
     */
    constructor(ffmpegPath, ffprobePath) {
        this.ffmpegPath = null;
        this.ffprobePath = null;
        this.initialized = false;
        if (ffmpegPath) {
            this.ffmpegPath = ffmpegPath;
        }
        if (ffprobePath) {
            this.ffprobePath = ffprobePath;
        }
    }
    /**
     * FFmpeg 서비스 초기화
     * @param ffmpegPath FFmpeg 실행 파일 경로 (선택 사항)
     * @param ffprobePath FFprobe 실행 파일 경로 (선택 사항)
     */
    initialize(ffmpegPath, ffprobePath) {
        if (ffmpegPath) {
            this.ffmpegPath = ffmpegPath;
        }
        if (ffprobePath) {
            this.ffprobePath = ffprobePath;
        }
        if (this.ffmpegPath) {
            fluent_ffmpeg_1.default.setFfmpegPath(this.ffmpegPath);
        }
        if (this.ffprobePath) {
            fluent_ffmpeg_1.default.setFfprobePath(this.ffprobePath);
        }
        this.initialized = true;
    }
    /**
     * 초기화 상태 확인
     * @returns 초기화 여부
     */
    isInitialized() {
        return this.initialized;
    }
    /**
     * 비디오 정보 가져오기
     * @param inputPath 입력 비디오 파일 경로
     * @returns 비디오 정보 객체
     */
    async getVideoInfo(inputPath) {
        return new Promise((resolve, reject) => {
            fluent_ffmpeg_1.default.ffprobe(inputPath, (err, metadata) => {
                if (err) {
                    reject(new Error(`비디오 정보를 가져오는 중 오류 발생: ${err.message}`));
                    return;
                }
                try {
                    const videoStream = metadata.streams.find((stream) => stream.codec_type === 'video');
                    const audioStreams = metadata.streams.filter((stream) => stream.codec_type === 'audio');
                    const videoStreams = metadata.streams.filter((stream) => stream.codec_type === 'video');
                    if (!videoStream) {
                        reject(new Error('비디오 스트림을 찾을 수 없습니다'));
                        return;
                    }
                    // 프레임 레이트 계산
                    let frameRate = 0;
                    if (videoStream.r_frame_rate) {
                        const [num, den] = videoStream.r_frame_rate.split('/').map(Number);
                        frameRate = num / den;
                    }
                    // 비디오 정보 객체 생성
                    const videoInfo = {
                        path: inputPath,
                        duration: parseFloat(metadata.format.duration || '0'),
                        width: videoStream.width || 0,
                        height: videoStream.height || 0,
                        frameRate,
                        bitrate: parseInt(metadata.format.bit_rate || '0', 10),
                        codec: videoStream.codec_name || '',
                        audioStreams: audioStreams.map((stream) => ({
                            index: stream.index,
                            codec: stream.codec_name || '',
                            sampleRate: parseInt(stream.sample_rate || '0', 10),
                            channels: stream.channels || 0,
                            bitrate: parseInt(stream.bit_rate || '0', 10),
                            language: stream.tags?.language
                        })),
                        videoStreams: videoStreams.map((stream) => ({
                            index: stream.index,
                            codec: stream.codec_name || '',
                            width: stream.width || 0,
                            height: stream.height || 0,
                            frameRate: stream.r_frame_rate ? eval(stream.r_frame_rate) : 0,
                            bitrate: parseInt(stream.bit_rate || '0', 10)
                        })),
                        metadata: metadata.format.tags || {}
                    };
                    resolve(videoInfo);
                }
                catch (error) {
                    reject(new Error(`비디오 정보 파싱 중 오류 발생: ${error.message}`));
                }
            });
        });
    }
    /**
     * 썸네일 생성
     * @param inputPath 입력 비디오 파일 경로
     * @param outputPath 출력 썸네일 파일 경로
     * @param options 썸네일 생성 옵션
     * @returns 생성된 썸네일 파일 경로
     */
    async generateThumbnail(inputPath, outputPath, options = {}) {
        return new Promise((resolve, reject) => {
            const command = (0, fluent_ffmpeg_1.default)(inputPath);
            // 시간 위치 설정
            if (options.timePosition !== undefined) {
                command.seekInput(options.timePosition);
            }
            // 썸네일 크기 설정
            if (options.width || options.height) {
                command.size(`${options.width || '?'}x${options.height || '?'}`);
            }
            // 품질 설정
            if (options.quality) {
                command.outputOptions(`-q:v ${Math.min(Math.max(options.quality, 1), 100) / 100 * 31}`);
            }
            // 출력 형식 설정
            const format = options.format || path.extname(outputPath).replace('.', '') || 'jpg';
            // 디렉토리 생성
            (0, pathUtils_1.ensureDirectoryExists)(path.dirname(outputPath));
            command
                .frames(1)
                .output(outputPath)
                .on('end', () => {
                resolve(outputPath);
            })
                .on('error', (err) => {
                reject(new Error(`썸네일 생성 중 오류 발생: ${err.message}`));
            })
                .run();
        });
    }
    /**
     * 비디오 인코딩
     * @param inputPath 입력 비디오 파일 경로
     * @param outputPath 출력 비디오 파일 경로
     * @param options 인코딩 옵션
     * @param progressCallback 진행 상황 콜백 함수
     * @returns 인코딩된 비디오 파일 경로
     */
    async encodeVideo(inputPath, outputPath, options = {}, progressCallback) {
        return new Promise(async (resolve, reject) => {
            try {
                // 비디오 정보 가져오기
                const videoInfo = await this.getVideoInfo(inputPath);
                const command = (0, fluent_ffmpeg_1.default)(inputPath);
                // 출력 형식 설정
                if (options.format) {
                    command.format(options.format);
                }
                // 비디오 코덱 설정
                if (options.videoCodec) {
                    command.videoCodec(options.videoCodec);
                }
                // 오디오 코덱 설정
                if (options.audioCodec) {
                    command.audioCodec(options.audioCodec);
                }
                // 비디오 비트레이트 설정
                if (options.videoBitrate) {
                    command.videoBitrate(options.videoBitrate);
                }
                // 오디오 비트레이트 설정
                if (options.audioBitrate) {
                    command.audioBitrate(options.audioBitrate);
                }
                // 프레임 레이트 설정
                if (options.frameRate) {
                    command.fps(options.frameRate);
                }
                // 해상도 설정
                if (options.width || options.height) {
                    command.size(`${options.width || '?'}x${options.height || '?'}`);
                }
                // 오디오 채널 설정
                if (options.audioChannels) {
                    command.audioChannels(options.audioChannels);
                }
                // 오디오 샘플 레이트 설정
                if (options.audioSampleRate) {
                    command.audioFrequency(options.audioSampleRate);
                }
                // 추가 옵션 설정
                if (options.additionalOptions) {
                    options.additionalOptions.forEach(option => {
                        command.outputOptions(option);
                    });
                }
                // 디렉토리 생성
                (0, pathUtils_1.ensureDirectoryExists)(path.dirname(outputPath));
                // 진행 상황 콜백 설정
                if (progressCallback) {
                    command.on('progress', (progress) => {
                        const processedSeconds = parseFloat(progress.timemark.split(':').reduce((acc, time) => (60 * acc) + parseFloat(time), 0).toFixed(2));
                        const totalSeconds = videoInfo.duration;
                        const percent = Math.min(100, Math.round((processedSeconds / totalSeconds) * 100));
                        progressCallback({
                            frames: progress.frames,
                            currentFps: progress.currentFps,
                            currentKbps: progress.currentKbps,
                            targetSize: progress.targetSize,
                            timemark: progress.timemark,
                            processedSeconds,
                            totalSeconds,
                            percent
                        });
                    });
                }
                command
                    .output(outputPath)
                    .on('end', () => {
                    resolve(outputPath);
                })
                    .on('error', (err) => {
                    reject(new Error(`비디오 인코딩 중 오류 발생: ${err.message}`));
                })
                    .run();
            }
            catch (error) {
                reject(new Error(`비디오 인코딩 준비 중 오류 발생: ${error.message}`));
            }
        });
    }
}
exports.FFmpegService = FFmpegService;
