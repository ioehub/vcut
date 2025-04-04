import React, { useRef } from 'react';
import { TimeRulerProps } from '../types';
import { formatTime } from './Playhead';

/**
 * 타임라인 상단의 시간 눈금자 컴포넌트
 * 
 * 시간 표시 및 클릭으로 재생 위치 이동 기능을 제공합니다.
 */
export const TimeRuler: React.FC<TimeRulerProps> = ({
  duration,
  scale,
  currentTime,
  timelineOffset = 80,
  onTimeChange,
  timeInterval = 1 // 기본 간격: 1초
}) => {
  const rulerRef = useRef<HTMLDivElement>(null);
  
  // 시간 마커 생성
  const timeMarkers = [];
  const maxTime = Math.max(1, duration);
  
  for (let i = 0; i <= maxTime; i += timeInterval) {
    // 시간 간격에 따른 마커 높이 조정
    const isMajorMarker = i % 5 === 0;
    const markerHeight = isMajorMarker ? 16 : 8;
    
    timeMarkers.push(
      <div 
        key={`marker-${i}`}
        style={{
          position: 'absolute',
          left: `${i * scale}px`,
          top: 0,
          width: '1px',
          height: `${markerHeight}px`,
          backgroundColor: isMajorMarker ? '#666' : '#999',
          pointerEvents: 'none'
        }}
      />
    );
    
    // 5초 간격으로 시간 레이블 추가
    if (isMajorMarker || maxTime <= 10) {
      timeMarkers.push(
        <div 
          key={`label-${i}`}
          style={{
            position: 'absolute',
            left: `${i * scale}px`,
            top: '16px',
            transform: 'translateX(-50%)',
            fontSize: '10px',
            color: '#666',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {formatTime(i)}
        </div>
      );
    }
  }
  
  // 룰러 클릭 핸들러 (시간 점프)
  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rulerRef.current) return;
    
    const rect = rulerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    
    // 오프셋 적용
    const adjustedOffsetX = offsetX - timelineOffset;
    
    // 클릭 위치를 시간으로 변환
    let newTime = adjustedOffsetX / scale;
    
    // 범위 제한
    newTime = Math.max(0, Math.min(newTime, duration));
    
    // 시간 업데이트
    onTimeChange(newTime);
  };
  
  return (
    <div 
      ref={rulerRef}
      className="time-ruler"
      style={{
        position: 'relative',
        height: '32px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        width: `${maxTime * scale + timelineOffset}px`,
        cursor: 'pointer',
      }}
      onClick={handleRulerClick}
    >
      {/* 트랙 라벨 영역 */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: `${timelineOffset}px`,
        height: '100%',
        backgroundColor: '#e0e0e0',
        borderRight: '1px solid #ccc',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        userSelect: 'none'
      }}>
        시간
      </div>
      
      {/* 눈금자 영역 */}
      <div style={{
        position: 'absolute',
        left: `${timelineOffset}px`,
        right: 0,
        top: 0,
        height: '100%',
        overflow: 'hidden'
      }}>
        {timeMarkers}
      </div>
      
      {/* 현재 시간 마커 */}
      <div style={{
        position: 'absolute',
        left: `${currentTime * scale + timelineOffset}px`,
        top: 0,
        width: '1px',
        height: '100%',
        backgroundColor: 'red',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-4px',
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '6px solid red',
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
};

export default TimeRuler;
