import { MCPService } from './MCPService';
import { MediaController, MediaEventType, MediaEvent } from './types';

/**
 * MCP 서비스 팩토리 클래스
 * 여러 미디어 컨트롤러를 관리하기 위한 팩토리
 */
export class MCPServiceFactory {
  private controllers: Map<string, MCPService> = new Map();
  private globalEventHandlers: Map<MediaEventType, Set<(event: MediaEvent) => void>> = new Map();

  /**
   * 새 미디어 컨트롤러 생성
   * @param id 미디어 ID (선택 사항, 제공하지 않으면 자동 생성)
   * @returns 미디어 컨트롤러 인스턴스
   */
  public createController(id?: string): MediaController {
    const controller = new MCPService(id);
    const controllerId = controller.getMediaInfo().id;
    
    this.controllers.set(controllerId, controller);
    
    // 글로벌 이벤트 핸들러에 이벤트 전달
    this.setupEventForwarding(controller);
    
    return controller;
  }

  /**
   * ID로 미디어 컨트롤러 가져오기
   * @param id 미디어 ID
   * @returns 미디어 컨트롤러 인스턴스 또는 undefined
   */
  public getController(id: string): MediaController | undefined {
    return this.controllers.get(id);
  }

  /**
   * 모든 미디어 컨트롤러 가져오기
   * @returns 미디어 컨트롤러 배열
   */
  public getAllControllers(): MediaController[] {
    return Array.from(this.controllers.values());
  }

  /**
   * 미디어 컨트롤러 제거
   * @param id 미디어 ID
   * @returns 제거 성공 여부
   */
  public removeController(id: string): boolean {
    const controller = this.controllers.get(id);
    
    if (controller) {
      controller.dispose();
      return this.controllers.delete(id);
    }
    
    return false;
  }

  /**
   * 모든 미디어 컨트롤러 제거
   */
  public removeAllControllers(): void {
    this.controllers.forEach(controller => {
      controller.dispose();
    });
    
    this.controllers.clear();
  }

  /**
   * 글로벌 이벤트 리스너 등록
   * 모든 컨트롤러의 이벤트를 수신
   * @param event 이벤트 타입
   * @param callback 콜백 함수
   */
  public on(event: MediaEventType, callback: (event: MediaEvent) => void): void {
    if (!this.globalEventHandlers.has(event)) {
      this.globalEventHandlers.set(event, new Set());
    }
    
    this.globalEventHandlers.get(event)!.add(callback);
    
    // 기존 컨트롤러에 이벤트 리스너 추가
    this.controllers.forEach(controller => {
      controller.on(event, callback);
    });
  }

  /**
   * 글로벌 이벤트 리스너 제거
   * @param event 이벤트 타입
   * @param callback 콜백 함수
   */
  public off(event: MediaEventType, callback: (event: MediaEvent) => void): void {
    const handlers = this.globalEventHandlers.get(event);
    
    if (handlers) {
      handlers.delete(callback);
      
      // 기존 컨트롤러에서 이벤트 리스너 제거
      this.controllers.forEach(controller => {
        controller.off(event, callback);
      });
    }
  }

  /**
   * 모든 글로벌 이벤트 리스너 제거
   */
  public removeAllListeners(): void {
    this.globalEventHandlers.clear();
    
    // 모든 컨트롤러에서 이벤트 리스너 제거
    this.controllers.forEach(controller => {
      controller.removeAllListeners();
    });
  }

  /**
   * 컨트롤러의 이벤트를 글로벌 이벤트 핸들러에 전달하도록 설정
   * @param controller 미디어 컨트롤러
   */
  private setupEventForwarding(controller: MCPService): void {
    // 모든 이벤트 타입에 대해 글로벌 핸들러 등록
    Object.values(MediaEventType).forEach(eventType => {
      const handlers = this.globalEventHandlers.get(eventType as MediaEventType);
      
      if (handlers) {
        handlers.forEach(handler => {
          controller.on(eventType as MediaEventType, handler);
        });
      }
    });
  }
}
