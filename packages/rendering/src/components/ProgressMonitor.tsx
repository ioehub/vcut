import React from 'react';

interface ProgressMonitorProps {
  progress: number;
  timeRemaining?: number;
  status?: string;
}

/**
 * 렌더링 진행 상황을 모니터링하고 표시하는 컴포넌트
 */
const ProgressMonitor: React.FC<ProgressMonitorProps> = ({ 
  progress, 
  timeRemaining, 
  status = '진행 중' 
}) => {
  // 남은 시간을 사람이 읽기 쉬운 형식으로 변환
  const formatTimeRemaining = (seconds?: number): string => {
    if (!seconds) return '계산 중...';
    
    if (seconds < 60) {
      return `약 ${seconds}초 남음`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes < 60) {
      return `약 ${minutes}분 ${remainingSeconds}초 남음`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return `약 ${hours}시간 ${remainingMinutes}분 남음`;
  };

  return (
    <div className="progress-monitor">
      <div className="progress-header">
        <h3>렌더링 진행 상황</h3>
        <span className="status-badge">{status}</span>
      </div>
      
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          <span className="progress-percentage">{progress}%</span>
        </div>
      </div>
      
      <div className="progress-info">
        <div className="time-remaining">{formatTimeRemaining(timeRemaining)}</div>
      </div>
      
      <style jsx>{`
        .progress-monitor {
          background-color: #f5f5f5;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: 'Noto Sans KR', sans-serif;
        }
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .progress-header h3 {
          margin: 0;
          font-size: 18px;
        }
        
        .status-badge {
          background-color: #4CAF50;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .progress-bar-container {
          height: 24px;
          background-color: #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 8px;
          position: relative;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #8BC34A);
          border-radius: 12px;
          transition: width 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .progress-percentage {
          color: white;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #666;
        }
        
        .time-remaining {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ProgressMonitor;
