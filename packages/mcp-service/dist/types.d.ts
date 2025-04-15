/**
 * 미디어 제어 프로토콜 서비스 관련 타입 정의
 */
/**
 * 미디어 타입 열거형
 */
export declare enum MediaType {
    VIDEO = "video",
    AUDIO = "audio"
}
/**
 * 미디어 상태 열거형
 */
export declare enum MediaState {
    IDLE = "idle",
    LOADING = "loading",
    READY = "ready",
    PLAYING = "playing",
    PAUSED = "paused",
    SEEKING = "seeking",
    BUFFERING = "buffering",
    ENDED = "ended",
    ERROR = "error"
}
/**
 * 미디어 이벤트 타입 열거형
 */
export declare enum MediaEventType {
    STATE_CHANGE = "stateChange",
    TIME_UPDATE = "timeUpdate",
    DURATION_CHANGE = "durationChange",
    VOLUME_CHANGE = "volumeChange",
    MUTE_CHANGE = "muteChange",
    PLAYBACK_RATE_CHANGE = "playbackRateChange",
    LOADED_METADATA = "loadedMetadata",
    PROGRESS = "progress",
    ERROR = "error",
    ENDED = "ended",
    SEEKING = "seeking",
    SEEKED = "seeked",
    BUFFER_UPDATE = "bufferUpdate"
}
/**
 * 미디어 정보 인터페이스
 */
export interface MediaInfo {
    /** 미디어 ID */
    id: string;
    /** 미디어 타입 */
    type: MediaType;
    /** 미디어 URL 또는 경로 */
    source: string;
    /** 미디어 제목 */
    title?: string;
    /** 미디어 길이 (초) */
    duration?: number;
    /** 미디어 너비 (픽셀) */
    width?: number;
    /** 미디어 높이 (픽셀) */
    height?: number;
    /** 미디어 비트레이트 (bps) */
    bitrate?: number;
    /** 미디어 코덱 정보 */
    codec?: string;
    /** 미디어 메타데이터 */
    metadata?: Record<string, any>;
}
/**
 * 미디어 상태 인터페이스
 */
export interface MediaStatus {
    /** 미디어 ID */
    id: string;
    /** 미디어 상태 */
    state: MediaState;
    /** 현재 재생 시간 (초) */
    currentTime: number;
    /** 미디어 길이 (초) */
    duration: number;
    /** 볼륨 (0-1) */
    volume: number;
    /** 음소거 여부 */
    muted: boolean;
    /** 재생 속도 (1.0 = 정상 속도) */
    playbackRate: number;
    /** 버퍼링 진행률 (0-1) */
    buffered: number;
    /** 미디어 정보 */
    mediaInfo: MediaInfo;
}
/**
 * 미디어 이벤트 인터페이스
 */
export interface MediaEvent {
    /** 이벤트 타입 */
    type: MediaEventType;
    /** 미디어 ID */
    mediaId: string;
    /** 이벤트 데이터 */
    data?: any;
    /** 이벤트 발생 시간 */
    timestamp: number;
}
/**
 * 미디어 제어 옵션 인터페이스
 */
export interface MediaControlOptions {
    /** 자동 재생 여부 */
    autoPlay?: boolean;
    /** 초기 볼륨 (0-1) */
    volume?: number;
    /** 초기 음소거 여부 */
    muted?: boolean;
    /** 초기 재생 속도 */
    playbackRate?: number;
    /** 루프 재생 여부 */
    loop?: boolean;
    /** 미디어 로드 시 시작 시간 (초) */
    startTime?: number;
    /** 미디어 로드 시 종료 시간 (초) */
    endTime?: number;
}
/**
 * 미디어 시크 옵션 인터페이스
 */
export interface SeekOptions {
    /** 상대적 시크 여부 */
    relative?: boolean;
}
/**
 * 미디어 제어 인터페이스
 */
export interface MediaController {
    /** 미디어 로드 */
    load(source: string | MediaInfo, options?: MediaControlOptions): Promise<void>;
    /** 재생 시작 */
    play(): Promise<void>;
    /** 일시 정지 */
    pause(): Promise<void>;
    /** 재생/일시정지 토글 */
    togglePlay(): Promise<void>;
    /** 정지 (처음으로 돌아가고 일시 정지) */
    stop(): Promise<void>;
    /** 특정 시간으로 이동 */
    seek(time: number, options?: SeekOptions): Promise<void>;
    /** 볼륨 설정 */
    setVolume(volume: number): void;
    /** 음소거 설정 */
    setMuted(muted: boolean): void;
    /** 음소거 토글 */
    toggleMute(): void;
    /** 재생 속도 설정 */
    setPlaybackRate(rate: number): void;
    /** 현재 상태 가져오기 */
    getStatus(): MediaStatus;
    /** 미디어 정보 가져오기 */
    getMediaInfo(): MediaInfo;
    /** 이벤트 리스너 등록 */
    on(event: MediaEventType, callback: (event: MediaEvent) => void): void;
    /** 이벤트 리스너 제거 */
    off(event: MediaEventType, callback: (event: MediaEvent) => void): void;
    /** 모든 이벤트 리스너 제거 */
    removeAllListeners(): void;
    /** 미디어 컨트롤러 해제 */
    dispose(): void;
}
