import React, { useState, useRef, useEffect } from 'react';
import { PlayheadProps } from '../types';

/**
 * Playhead 컴포넌트
 * 
 * 타임라인에서 현재 재생 위치를 나타내는 세로 선과 관련 컨트롤을 제공합니다.
 */
export const Playhead: React.FC<PlayheadProps> = ({
  currentTime,
  duration,
  scale,
  isPlaying,
  isLooping = false,
  playbackRate = 1.0,
  inPoint,
  outPoint,
  timelineOffset = 80, // 기본값: 트랙 레이블 너비
  onTimeChange,
  onPlayPause,
  _onInOutPointChange, // 현재 사용되지 않음
  onDragStart,
  onDragEnd
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const playheadRef = useRef<HTMLDivElement>(null);
  // const lastFrameTime = useRef<number>(0); // 현재 사용되지 않음
  const animationFrameId = useRef<number>();

  // 재생 애니메이션 처리
  useEffect(() => {
    if (isPlaying) {
      // 재생 시작 시점 기록
      const startTime = performance.now();
      const startPosition = currentTime;
      
      const animate = (timestamp: number) => {
        // 프레임 간 시간 차이 계산
        const elapsed = (timestamp - startTime) * 0.001 * playbackRate;
        let newTime = startPosition + elapsed;
        
        // 루프 재생 처리
        if (isLooping && outPoint !== undefined && inPoint !== undefined) {
          if (newTime >= outPoint) {
            newTime = inPoint + (newTime - outPoint) % (outPoint - inPoint);
          }
        } 
        // 끝 도달 시 정지
        else if (newTime >= duration) {
          newTime = duration;
          if (onPlayPause) onPlayPause(false);
        }
        
        // 인/아웃 포인트 처리
        if (!isLooping && inPoint !== undefined && outPoint !== undefined) {
          if (newTime < inPoint) newTime = inPoint;
          if (newTime > outPoint) {
            newTime = outPoint;
            if (onPlayPause) onPlayPause(false);
          }
        }
        
        // 시간 업데이트
        onTimeChange(newTime);
        
        // 다음 프레임 요청
        if (isPlaying) {
          animationFrameId.current = requestAnimationFrame(animate);
        }
      };
      
      // 애니메이션 시작
      animationFrameId.current = requestAnimationFrame(animate);
      
      // 정리 함수
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
  }, [isPlaying, currentTime, playbackRate, duration, isLooping, inPoint, outPoint, onTimeChange, onPlayPause]);

  // Playhead 드래그 시작
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    if (onDragStart) onDragStart();
    
    // 마우스 이동 및 업 이벤트 리스너 추가
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Playhead 드래그 중
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    // playhead 컨테이너 요소의 위치 계산
    const container = playheadRef.current?.parentElement;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - timelineOffset;
    
    // 시간으로 변환 (x 좌표 / 스케일)
    let newTime = Math.max(0, offsetX / scale);
    newTime = Math.min(newTime, duration);
    
    // 인/아웃 포인트 적용
    if (inPoint !== undefined && newTime < inPoint) newTime = inPoint;
    if (outPoint !== undefined && newTime > outPoint) newTime = outPoint;
    
    // 시간 업데이트
    onTimeChange(newTime);
  };

  // Playhead 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
    
    // 이벤트 리스너 제거
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // 터치 이벤트 처리 (모바일 지원)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    if (onDragStart) onDragStart();
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const container = playheadRef.current?.parentElement;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const touch = e.touches[0];
    const offsetX = touch.clientX - rect.left - timelineOffset;
    
    let newTime = Math.max(0, offsetX / scale);
    newTime = Math.min(newTime, duration);
    
    if (inPoint !== undefined && newTime < inPoint) newTime = inPoint;
    if (outPoint !== undefined && newTime > outPoint) newTime = outPoint;
    
    onTimeChange(newTime);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
    
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  return (
    <div 
      ref={playheadRef}
      className="playhead"
      style={{
        position: 'absolute',
        top: 0,
        left: `${currentTime * scale + timelineOffset}px`,
        width: '2px',
        height: '100%',
        backgroundColor: 'red',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 1000,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Playhead 헤드 (상단 핸들) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-8px',
          width: '16px',
          height: '16px',
          backgroundColor: 'red',
          borderRadius: '50%',
          cursor: isDragging ? 'grabbing' : 'grab',
          border: '2px solid white',
          boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
        }}
      />
      
      {/* 현재 시간 표시 */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '-24px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '2px 4px',
          borderRadius: '2px',
          fontSize: '10px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {formatTime(currentTime)}
      </div>
    </div>
  );
};

// 시간 포맷 함수 (초 -> MM:SS.ms)
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const milliseconds = Math.floor((time % 1) * 100);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
};

export default Playhead;
