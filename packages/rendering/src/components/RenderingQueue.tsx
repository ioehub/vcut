import React, { useState, useEffect, CSSProperties } from 'react';
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
  const _handleProgressUpdate = (jobId: string, progress: number, timeRemaining: number) => {
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
    <div className="rendering-queue" style={{
      fontFamily: 'Noto Sans KR, sans-serif',
      padding: '16px'
    }}>
      <h2 style={{
        marginTop: '0',
        marginBottom: '16px',
        fontSize: '24px'
      }}>렌더링 대기열</h2>
      
      {currentJob && (
        <div className="current-job">
          <h3 style={{
            marginTop: '24px',
            marginBottom: '12px',
            fontSize: '18px',
            color: '#333'
          }}>현재 처리 중인 작업</h3>
          <div className="job-item active" style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <div className="job-info">
              <div className="job-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span className="job-name" style={{
                  fontWeight: '500',
                  fontSize: '16px',
                  margin: '0'
                }}>{currentJob.name}</span>
                <span 
                  className="status-badge" 
                  style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: getStatusBadgeColor(currentJob.status)
                  }}
                >
                  {getStatusText(currentJob.status)}
                </span>
              </div>
              <div className="job-details" style={{
                marginBottom: '12px',
                fontSize: '14px',
                color: '#666'
              }}>
                <p style={{ margin: '4px 0' }}>해상도: {currentJob.settings.resolution.width}x{currentJob.settings.resolution.height}</p>
                <p style={{ margin: '4px 0' }}>형식: {currentJob.settings.format}, 코덱: {currentJob.settings.codec}</p>
              </div>
            </div>
            <ProgressMonitor 
              progress={currentJob.progress} 
              timeRemaining={currentJob.estimatedTimeRemaining}
              status={getStatusText(currentJob.status)}
            />
            <div className="job-actions" style={{
              display: 'flex',
              gap: '8px',
              marginTop: '12px'
            }}>
              <button 
                className="action-button pause" 
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#FF9800',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.2s'
                }}
                onClick={() => handleStatusChange(currentJob.id, 'paused')}
                disabled={currentJob.status !== 'processing'}
              >
                일시 중지
              </button>
              <button 
                className="action-button cancel" 
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#F44336',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.2s'
                }}
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
          <h3 style={{
            marginTop: '24px',
            marginBottom: '12px',
            fontSize: '18px',
            color: '#333'
          }}>대기 중인 작업 ({queuedJobs.length})</h3>
          {queuedJobs.map(job => (
            <div key={job.id} className="job-item queued" style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}>
              <div className="job-info">
                <div className="job-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span className="job-name" style={{
                    fontWeight: '500',
                    fontSize: '16px',
                    margin: '0'
                  }}>{job.name}</span>
                  <span 
                    className="status-badge" 
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: getStatusBadgeColor(job.status)
                    }}
                  >
                    {getStatusText(job.status)}
                  </span>
                </div>
                <div className="job-details" style={{
                  marginBottom: '12px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <p style={{ margin: '4px 0' }}>해상도: {job.settings.resolution.width}x{job.settings.resolution.height}</p>
                  <p style={{ margin: '4px 0' }}>형식: {job.settings.format}, 코덱: {job.settings.codec}</p>
                </div>
              </div>
              <div className="job-actions" style={{
                display: 'flex',
                gap: '8px',
                marginTop: '12px'
              }}>
                <button 
                  className="action-button remove" 
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#F44336',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
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
          <h3 style={{
            marginTop: '24px',
            marginBottom: '12px',
            fontSize: '18px',
            color: '#333'
          }}>완료된 작업 ({completedJobs.length})</h3>
          {completedJobs.map(job => (
            <div key={job.id} className="job-item completed" style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}>
              <div className="job-info">
                <div className="job-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span className="job-name" style={{
                    fontWeight: '500',
                    fontSize: '16px',
                    margin: '0'
                  }}>{job.name}</span>
                  <span 
                    className="status-badge" 
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: getStatusBadgeColor(job.status)
                    }}
                  >
                    {getStatusText(job.status)}
                  </span>
                </div>
                <div className="job-details" style={{
                  marginBottom: '12px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <p style={{ margin: '4px 0' }}>해상도: {job.settings.resolution.width}x{job.settings.resolution.height}</p>
                  <p style={{ margin: '4px 0' }}>형식: {job.settings.format}, 코덱: {job.settings.codec}</p>
                  {job.endTime && job.startTime && (
                    <p style={{ margin: '4px 0' }}>
                      소요 시간: {Math.round((job.endTime.getTime() - job.startTime.getTime()) / 1000)}초
                    </p>
                  )}
                  {job.errorMessage && (
                    <p className="error-message" style={{
                      color: '#F44336'
                    }}>오류: {job.errorMessage}</p>
                  )}
                </div>
              </div>
              <div className="job-actions" style={{
                display: 'flex',
                gap: '8px',
                marginTop: '12px'
              }}>
                <button 
                  className="action-button remove" 
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#F44336',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => handleRemoveJob(job.id)}
                >
                  제거
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenderingQueue;
