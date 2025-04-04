import React, { useState, useRef } from 'react';
import { Playhead } from '../components/Playhead';
import { PlayheadControls } from '../components/PlayheadControls';
import { TimeRuler } from '../components/TimeRuler';
import { usePlayhead } from '../hooks/usePlayhead';

/**
 * Playhead 모듈 테스트 페이지
 */
export const TestPlayhead: React.FC = () => {
  // 샘플 타임라인 속성
  const duration = 30; // 총 30초 영상
  const [scale, setScale] = useState<number>(100); // 1초 = 100px
  
  // Playhead 훅 사용
  const playhead = usePlayhead({
    duration,
    initialTime: 0,
    initialPlaybackRate: 1.0,
    fps: 30
  });
  
  // 컨테이너 참조
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 확대/축소 처리
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 500));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 50));
  };
  
  // 인/아웃 포인트 설정
  const handleSetInPoint = () => {
    playhead.setInPoint(playhead.currentTime);
  };
  
  const handleSetOutPoint = () => {
    playhead.setOutPoint(playhead.currentTime);
  };
  
  const handleClearPoints = () => {
    playhead.setInPoint(undefined);
    playhead.setOutPoint(undefined);
  };
  
  // 인/아웃 포인트 마커 렌더링
  const renderInOutMarkers = () => {
    const markers = [];
    
    // 인 포인트 마커
    if (playhead.inPoint !== undefined) {
      markers.push(
        <div
          key="in-point"
          style={{
            position: 'absolute',
            left: `${playhead.inPoint * scale + 80}px`,
            top: '32px', // TimeRuler 아래
            width: '2px',
            height: 'calc(100% - 32px)',
            backgroundColor: 'green',
            zIndex: 5,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '-7px',
              top: 0,
              width: '16px',
              height: '16px',
              backgroundColor: 'green',
              borderRadius: '0 0 8px 8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '10px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            title="인 포인트"
            onClick={() => playhead.setCurrentTime(playhead.inPoint as number)}
          >
            I
          </div>
        </div>
      );
    }
    
    // 아웃 포인트 마커
    if (playhead.outPoint !== undefined) {
      markers.push(
        <div
          key="out-point"
          style={{
            position: 'absolute',
            left: `${playhead.outPoint * scale + 80}px`,
            top: '32px', // TimeRuler 아래
            width: '2px',
            height: 'calc(100% - 32px)',
            backgroundColor: 'red',
            zIndex: 5,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '-7px',
              top: 0,
              width: '16px',
              height: '16px',
              backgroundColor: 'red',
              borderRadius: '0 0 8px 8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '10px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            title="아웃 포인트"
            onClick={() => playhead.setCurrentTime(playhead.outPoint as number)}
          >
            O
          </div>
        </div>
      );
    }
    
    return markers;
  };
  
  // 가상의 트랙 배경 렌더링
  const renderTrackBackgrounds = () => {
    const tracks = [];
    const trackCount = 3; // 가상의 트랙 3개
    
    for (let i = 0; i < trackCount; i++) {
      tracks.push(
        <div
          key={`track-${i}`}
          style={{
            position: 'absolute',
            left: '80px', // 트랙 레이블 너비
            top: `${32 + i * 60}px`, // TimeRuler 높이 + 트랙 인덱스 * 트랙 높이
            width: `${duration * scale}px`,
            height: '60px',
            backgroundColor: i % 2 === 0 ? '#f0f0f0' : '#e8e8e8',
            borderBottom: '1px solid #ddd',
            zIndex: 1,
          }}
        />
      );
    }
    
    return tracks;
  };
  
  // 트랙 레이블 렌더링
  const renderTrackLabels = () => {
    const labels = [];
    const trackTypes = ['비디오', '오디오', '자막'];
    
    for (let i = 0; i < trackTypes.length; i++) {
      labels.push(
        <div
          key={`label-${i}`}
          style={{
            position: 'absolute',
            left: '0',
            top: `${32 + i * 60}px`, // TimeRuler 높이 + 트랙 인덱스 * 트랙 높이
            width: '80px',
            height: '60px',
            backgroundColor: '#e0e0e0',
            borderRight: '1px solid #ccc',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '12px',
            userSelect: 'none',
            zIndex: 2,
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{trackTypes[i]}</div>
          <div style={{ fontSize: '10px', color: '#666' }}>트랙 {i + 1}</div>
        </div>
      );
    }
    
    return labels;
  };
  
  return (
    <div className="test-playhead" style={{ padding: '20px', fontFamily: 'Nanum Gothic, Malgun Gothic, sans-serif' }}>
      <h1>Playhead 모듈 테스트</h1>
      
      {/* 컨트롤 영역 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button onClick={handleZoomIn}>확대 (+)</button>
        <button onClick={handleZoomOut}>축소 (-)</button>
        <span>스케일: {scale.toFixed(0)}px/초</span>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={handleSetInPoint} title="현재 위치를 인 포인트로 설정 (Ctrl+I)">인 포인트 설정</button>
          <button onClick={handleSetOutPoint} title="현재 위치를 아웃 포인트로 설정 (Ctrl+O)" style={{ marginLeft: '8px' }}>아웃 포인트 설정</button>
          <button onClick={handleClearPoints} title="인/아웃 포인트 제거 (Ctrl+X)" style={{ marginLeft: '8px' }}>포인트 제거</button>
        </div>
      </div>
      
      {/* 플레이헤드 컨트롤 */}
      <PlayheadControls
        currentTime={playhead.currentTime}
        duration={duration}
        isPlaying={playhead.isPlaying}
        playbackRate={playhead.playbackRate}
        onTimeChange={playhead.setCurrentTime}
        onPlayPause={playhead.setPlaying}
        onPlaybackRateChange={playhead.setPlaybackRate}
        onFrameStep={playhead.stepFrame}
        onJumpToStart={playhead.jumpToStart}
        onJumpToEnd={playhead.jumpToEnd}
      />
      
      {/* 타임라인 영역 */}
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          border: '1px solid #ccc',
          overflow: 'auto',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px',
          height: '300px',
        }}
      >
        {/* 타임 룰러 */}
        <TimeRuler
          duration={duration}
          scale={scale}
          currentTime={playhead.currentTime}
          timelineOffset={80}
          onTimeChange={playhead.setCurrentTime}
          timeInterval={1}
        />
        
        {/* 트랙 배경 */}
        {renderTrackBackgrounds()}
        
        {/* 트랙 레이블 */}
        {renderTrackLabels()}
        
        {/* 인/아웃 포인트 마커 */}
        {renderInOutMarkers()}
        
        {/* 플레이헤드 */}
        <Playhead
          currentTime={playhead.currentTime}
          duration={duration}
          scale={scale}
          isPlaying={playhead.isPlaying}
          isLooping={false}
          playbackRate={playhead.playbackRate}
          inPoint={playhead.inPoint}
          outPoint={playhead.outPoint}
          timelineOffset={80}
          onTimeChange={playhead.setCurrentTime}
          onPlayPause={playhead.setPlaying}
        />
      </div>
      
      {/* 현재 상태 정보 */}
      <div style={{ marginTop: '20px' }}>
        <h3>Playhead 상태:</h3>
        <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '12px',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
{`현재 시간: ${playhead.currentTime.toFixed(2)}초
재생 상태: ${playhead.isPlaying ? '재생 중' : '정지됨'}
재생 속도: ${playhead.playbackRate}x
인 포인트: ${playhead.inPoint !== undefined ? playhead.inPoint.toFixed(2) + '초' : '설정되지 않음'}
아웃 포인트: ${playhead.outPoint !== undefined ? playhead.outPoint.toFixed(2) + '초' : '설정되지 않음'}
총 길이: ${duration}초
FPS: ${playhead.fps}
1프레임: ${(playhead.frameTime * 1000).toFixed(2)}ms`}
        </pre>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>단축키 안내:</h3>
        <ul>
          <li><strong>Space</strong>: 재생/일시정지</li>
          <li><strong>→ / ←</strong>: 프레임 앞으로/뒤로 이동</li>
          <li><strong>Home / End</strong>: 타임라인 처음/끝으로 이동</li>
          <li><strong>Ctrl+I</strong>: 현재 위치를 인 포인트로 설정</li>
          <li><strong>Ctrl+O</strong>: 현재 위치를 아웃 포인트로 설정</li>
          <li><strong>Ctrl+X</strong>: 인/아웃 포인트 제거</li>
        </ul>
      </div>
    </div>
  );
};

export default TestPlayhead;
