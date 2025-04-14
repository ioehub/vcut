import React, { useEffect, useState } from 'react';
import { RenderJob, HardwareInfo } from '../types';
import { detectGPU } from '../utils/hardwareDetection';

interface RenderingEngineProps {
  job?: RenderJob;
  onProgress?: (progress: number, timeRemaining: number) => void;
  onComplete?: (job: RenderJob) => void;
  onError?: (error: string) => void;
}

/**
 * 렌더링 엔진 컴포넌트
 * 실제 환경에서는 Electron의 IPC를 통해 FFmpeg 프로세스와 통신합니다.
 */
const RenderingEngine: React.FC<RenderingEngineProps> = ({
  job,
  onProgress,
  onComplete,
  onError
}) => {
  const [isRendering, setIsRendering] = useState(false);
  const [hardwareInfo, setHardwareInfo] = useState<HardwareInfo | null>(null);
  
  // 하드웨어 정보 감지
  useEffect(() => {
    const gpuInfo = detectGPU();
    setHardwareInfo(gpuInfo);
  }, []);
  
  // 실제 렌더링을 시작하는 함수
  const startRendering = async (renderJob: RenderJob) => {
    if (!renderJob) return;
    
    setIsRendering(true);
    const updatedJob = { ...renderJob, status: 'processing' as const, startTime: new Date(), progress: 0 };
    
    try {
      // 실제 환경에서는 FFmpeg 프로세스를 시작하고 진행 상황을 모니터링합니다.
      // 테스트를 위해 진행 상황을 시뮬레이션합니다.
      await simulateRendering(updatedJob);
      
      const completedJob = { 
        ...updatedJob, 
        status: 'completed' as const, 
        endTime: new Date(),
        progress: 100 
      };
      
      if (onComplete) onComplete(completedJob);
    } catch (error) {
      const failedJob = { 
        ...updatedJob, 
        status: 'failed' as const, 
        endTime: new Date(),
        errorMessage: error.message 
      };
      
      if (onError) onError(error.message);
    } finally {
      setIsRendering(false);
    }
  };
  
  // 렌더링 진행 상황을 시뮬레이션
  const simulateRendering = (renderJob: RenderJob): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const totalDuration = renderJob.settings.useHardwareAcceleration ? 5000 : 15000; // 하드웨어 가속 유무에 따라 시간 차이
      const interval = 100;
      const step = 100 / (totalDuration / interval);
      
      const timer = setInterval(() => {
        progress += step;
        const currentProgress = Math.min(Math.round(progress), 100);
        const timeRemaining = Math.max(0, Math.round((totalDuration * (100 - currentProgress) / 100) / 1000));
        
        if (onProgress) onProgress(currentProgress, timeRemaining);
        
        if (currentProgress >= 100) {
          clearInterval(timer);
          resolve();
        }
      }, interval);
    });
  };
  
  // 새 렌더링 작업이 전달되면 렌더링 시작
  useEffect(() => {
    if (job && job.status === 'waiting' && !isRendering) {
      startRendering(job);
    }
  }, [job]);
  
  return (
    <div className="rendering-engine">
      {hardwareInfo && (
        <div className="hardware-info">
          <h3>하드웨어 정보</h3>
          <p>GPU: {hardwareInfo.vendor !== 'none' ? `${hardwareInfo.model} (${hardwareInfo.vendor})` : '감지되지 않음'}</p>
          {hardwareInfo.vram && <p>VRAM: {(hardwareInfo.vram / 1024).toFixed(1)} GB</p>}
          <p>하드웨어 가속: {hardwareInfo.supported ? '지원됨' : '지원되지 않음'}</p>
        </div>
      )}
      
      {isRendering ? (
        <div className="rendering-status">
          <p>렌더링 중... {job?.name}</p>
        </div>
      ) : (
        <div className="rendering-status">
          <p>대기 중...</p>
        </div>
      )}
    </div>
  );
};

export default RenderingEngine;
