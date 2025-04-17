import React, { CSSProperties } from 'react';

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

  // CSS 스타일을 객체로 정의
  const styles = {
    progressMonitor: {
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Noto Sans KR', sans-serif"
    } as CSSProperties,
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    } as CSSProperties,
    headerTitle: {
      margin: 0,
      fontSize: '18px'
    } as CSSProperties,
    statusBadge: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '14px'
    } as CSSProperties,
    progressBarContainer: {
      height: '24px',
      backgroundColor: '#e0e0e0',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '8px',
      position: 'relative' as const
    } as CSSProperties,
    progressBar: (width: string): CSSProperties => ({
      height: '100%',
      background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
      borderRadius: '12px',
      transition: 'width 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width
    }),
    progressPercentage: {
      color: 'white',
      fontWeight: 'bold',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    } as CSSProperties,
    progressInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#666'
    } as CSSProperties,
    timeRemaining: {
      fontWeight: 500
    } as CSSProperties
  };

  return (
    <div style={styles.progressMonitor}>
      <div style={styles.progressHeader}>
        <h3 style={styles.headerTitle}>렌더링 진행 상황</h3>
        <span style={styles.statusBadge}>{status}</span>
      </div>
      
      <div style={styles.progressBarContainer}>
        <div style={styles.progressBar(`${progress}%`)}>
          <span style={styles.progressPercentage}>{progress}%</span>
        </div>
      </div>
      
      <div style={styles.progressInfo}>
        <div style={styles.timeRemaining}>{formatTimeRemaining(timeRemaining)}</div>
      </div>
    </div>
  );
};

export default ProgressMonitor;
