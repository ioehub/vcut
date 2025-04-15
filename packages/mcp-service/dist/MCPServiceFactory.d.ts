import { MediaController, MediaEventType, MediaEvent } from './types';
/**
 * MCP 서비스 팩토리 클래스
 * 여러 미디어 컨트롤러를 관리하기 위한 팩토리
 */
export declare class MCPServiceFactory {
    private controllers;
    private globalEventHandlers;
    /**
     * 새 미디어 컨트롤러 생성
     * @param id 미디어 ID (선택 사항, 제공하지 않으면 자동 생성)
     * @returns 미디어 컨트롤러 인스턴스
     */
    createController(id?: string): MediaController;
    /**
     * ID로 미디어 컨트롤러 가져오기
     * @param id 미디어 ID
     * @returns 미디어 컨트롤러 인스턴스 또는 undefined
     */
    getController(id: string): MediaController | undefined;
    /**
     * 모든 미디어 컨트롤러 가져오기
     * @returns 미디어 컨트롤러 배열
     */
    getAllControllers(): MediaController[];
    /**
     * 미디어 컨트롤러 제거
     * @param id 미디어 ID
     * @returns 제거 성공 여부
     */
    removeController(id: string): boolean;
    /**
     * 모든 미디어 컨트롤러 제거
     */
    removeAllControllers(): void;
    /**
     * 글로벌 이벤트 리스너 등록
     * 모든 컨트롤러의 이벤트를 수신
     * @param event 이벤트 타입
     * @param callback 콜백 함수
     */
    on(event: MediaEventType, callback: (event: MediaEvent) => void): void;
    /**
     * 글로벌 이벤트 리스너 제거
     * @param event 이벤트 타입
     * @param callback 콜백 함수
     */
    off(event: MediaEventType, callback: (event: MediaEvent) => void): void;
    /**
     * 모든 글로벌 이벤트 리스너 제거
     */
    removeAllListeners(): void;
    /**
     * 컨트롤러의 이벤트를 글로벌 이벤트 핸들러에 전달하도록 설정
     * @param controller 미디어 컨트롤러
     */
    private setupEventForwarding;
}
