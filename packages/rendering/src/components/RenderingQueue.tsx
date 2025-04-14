import React, { useState, useEffect } from 'react';
import { RenderJob } from '../types';
import ProgressMonitor from './ProgressMonitor';

interface RenderingQueueProps {
  jobs: RenderJob[];
  onJobStatusChange?: (jobId: string, status: RenderJob['status']) => void;
  onJobProgressUpdate?: (jobId: string, progress: number, timeRemaining: number) => void;
  onJobRemove?: (jobId: string) => void;
}

/**
 * 여러 렌더링 작업을 대기열로 관리하고 UI로 표시하는 컴포넌트
 */
const RenderingQueue: React.FC<RenderingQueueProps> = ({
  jobs,
  onJobStatusChange,
  onJobProgressUpdate,
  onJobRemove
}) => {
  const [activeJobs, setActiveJobs] = useState<RenderJob[]>([]);
  const [queuedJobs, setQueuedJobs] = useState<RenderJob[]>([]);
  const [completedJobs, setCompletedJobs] = useState<RenderJob[]>([]);
  const [currentJob, setCurrentJob] = useState<RenderJob | null>(null);
  
  // 작업 상태에 따라 분류
  useEffect(() => {
    const active = jobs.filter(job => job.status === 'processing');
    const queued = jobs.filter(job => job.status === 'waiting');
    const completed = jobs.filter(job => ['completed', 'failed'].includes(job.status));
    
    setActiveJobs(active);
    setQueuedJobs(queued);
    setCompletedJobs(completed);
    
    // 현재 처리 중인 작업 설정
    setCurrentJob(active.length > 0 ? active[0] : null);
  }, [jobs]);
  
  // 작업 상태 변경 핸들러
  const handleStatusChange = (jobId: string, status: RenderJob['status']) => {
    if (onJobStatusChange) {
      onJobStatusChange(jobId, status);
    }
  };
  
  // 작업 진행 상태 업데이트 핸들러
  const handleProgressUpdate = (jobId: string, progress: number, timeRemaining: number) => {
    if (onJobProgressUpdate) {
      onJobProgressUpdate(jobId, progress, timeRemaining);
    }
  };
  
  // 작업 제거 핸들러
  const handleRemoveJob = (jobId: string) => {
    if (onJobRemove) {
      onJobRemove(jobId);
    }
  };
  
  // 작업 상태에 따른 배지 색상
  const getStatusBadgeColor = (status: RenderJob['status']): string => {
    switch (status) {
      case 'processing': return '#4CAF50'; // 녹색
      case 'waiting': return '#2196F3'; // 파란색
      case 'completed': return '#9C27B0'; // 보라색
      case 'failed': return '#F44336'; // 빨간색
      case 'paused': return '#FF9800'; // 주황색
      default: return '#757575'; // 회색
    }
  };
  
  // 작업 상태에 따른 한글 상태명
  const getStatusText = (status: RenderJob['status']): string => {
    switch (status) {
      case 'processing': return '처리 중';
      case 'waiting': return '대기 중';
      case 'completed': return '완료됨';
      case 'failed': return '실패';
      case 'paused': return '일시 중지';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="rendering-queue">
      <h2>렌더링 대기열</h2>
      
      {currentJob && (
        <div className="current-job">
          <h3>현재 처리 중인 작업</h3>
          <div className="job-item active">
            <div className="job-info">
              <div className="job-header">
                <span className="job-name">{currentJob.name}</span>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusBadgeColor(currentJob.status) }}
                >
                  {getStatusText(currentJob.status)}
                </span>
              </div>
              <div className="job-details">
                <p>해상도: {currentJob.settings.resolution.width}x{currentJob.settings.resolution.height}</p>
                <p>형식: {currentJob.settings.format}, 코덱: {currentJob.settings.codec}</p>
              </div>
            </div>
            <ProgressMonitor 
              progress={currentJob.progress} 
              timeRemaining={currentJob.estimatedTimeRemaining}
              status={getStatusText(currentJob.status)}
            />
            <div className="job-actions">
              <button 
                className="action-button pause"
                onClick={() => handleStatusChange(currentJob.id, 'paused')}
                disabled={currentJob.status !== 'processing'}
              >
                일시 중지
              </button>
              <button 
                className="action-button cancel"
                onClick={() => handleStatusChange(currentJob.id, 'failed')}
                disabled={['completed', 'failed'].includes(currentJob.status)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
      
      {queuedJobs.length > 0 && (
        <div className="queued-jobs">
          <h3>대기 중인 작업 ({queuedJobs.length})</h3>
          {queuedJobs.map(job => (
            <div key={job.id} className="job-item queued">
              <div className="job-info">
                <div className="job-header">
                  <span className="job-name">{job.name}</span>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusBadgeColor(job.status) }}
                  >
                    {getStatusText(job.status)}
                  </span>
                </div>
                <div className="job-details">
                  <p>해상도: {job.settings.resolution.width}x{job.settings.resolution.height}</p>
                  <p>형식: {job.settings.format}, 코덱: {job.settings.codec}</p>
                </div>
              </div>
              <div className="job-actions">
                <button 
                  className="action-button remove"
                  onClick={() => handleRemoveJob(job.id)}
                >
                  제거
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {completedJobs.length > 0 && (
        <div className="completed-jobs">
          <h3>완료된 작업 ({completedJobs.length})</h3>
          {completedJobs.map(job => (
            <div key={job.id} className="job-item completed">
              <div className="job-info">
                <div className="job-header">
                  <span className="job-name">{job.name}</span>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusBadgeColor(job.status) }}
                  >
                    {getStatusText(job.status)}
                  </span>
                </div>
                <div className="job-details">
                  <p>해상도: {job.settings.resolution.width}x{job.settings.resolution.height}</p>
                  <p>형식: {job.settings.format}, 코덱: {job.settings.codec}</p>
                  {job.endTime && job.startTime && (
                    <p>
                      소요 시간: {Math.round((job.endTime.getTime() - job.startTime.getTime()) / 1000)}초
                    </p>
                  )}
                  {job.errorMessage && (
                    <p className="error-message">오류: {job.errorMessage}</p>
                  )}
                </div>
              </div>
              <div className="job-actions">
                <button 
                  className="action-button remove"
                  onClick={() => handleRemoveJob(job.id)}
                >
                  제거
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .rendering-queue {
          font-family: 'Noto Sans KR', sans-serif;
          padding: 16px;
        }
        
        h2 {
          margin-top: 0;
          margin-bottom: 16px;
          font-size: 24px;
        }
        
        h3 {
          margin-top: 24px;
          margin-bottom: 12px;
          font-size: 18px;
          color: #333;
        }
        
        .job-item {
          background-color: #fff;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .job-item.active {
          border-left: 4px solid #4CAF50;
        }
        
        .job-item.queued {
          border-left: 4px solid #2196F3;
        }
        
        .job-item.completed {
          border-left: 4px solid #9C27B0;
        }
        
        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .job-name {
          font-weight: bold;
          font-size: 16px;
        }
        
        .status-badge {
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        .job-details {
          margin-bottom: 12px;
          font-size: 14px;
          color: #666;
        }
        
        .job-details p {
          margin: 4px 0;
        }
        
        .error-message {
          color: #F44336;
        }
        
        .job-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 12px;
        }
        
        .action-button {
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          margin-left: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .action-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .action-button.pause {
          background-color: #FF9800;
          color: white;
        }
        
        .action-button.cancel, .action-button.remove {
          background-color: #F44336;
          color: white;
        }
        
        .action-button:hover:not(:disabled) {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default RenderingQueue;
