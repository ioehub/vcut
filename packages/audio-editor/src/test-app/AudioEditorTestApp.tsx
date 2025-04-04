import React, { useState, useRef } from 'react';
import { useAudioEditor } from '../context/AudioEditorContext';
import TransportControls from '../components/TransportControls';

export const AudioEditorTestApp: React.FC = () => {
  const {
    state,
    loadAudioFile,
    removeTrack,
    setTrackVolume,
    setMasterVolume,
    play,
    pause,
    stop,
    setCurrentTime
  } = useAudioEditor();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 로컬 오디오 파일 선택 처리
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 파일 URL 생성
      const fileUrl = URL.createObjectURL(file);
      
      // 오디오 에디터에 파일 로드
      console.log(`파일 로드 시작: ${file.name}`);
      const trackId = await loadAudioFile(fileUrl, file.name);
      console.log(`트랙 로드 완료: ${trackId}`);
    } catch (error) {
      console.error('파일 로드 오류:', error);
      setErrorMessage(`오디오 파일 로드 실패: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 트랙 제거 처리
  const handleRemoveTrack = (trackId: string) => {
    removeTrack(trackId);
  };

  // 볼륨 변경 처리
  const handleVolumeChange = (trackId: string, volume: number) => {
    setTrackVolume(trackId, volume);
  };

  // 패닝 변경 처리
  const handlePanChange = (trackId: string, pan: number) => {
    console.log(`Track ${trackId} pan 설정: ${pan}`);
    // 현재 AudioEditor에 setTrackPan이 구현되어 있지 않아 로그만 출력
  };

  // 마스터 볼륨 변경 처리
  const handleMasterVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setMasterVolume(volume);
  };

  // 시간 위치 변경 처리
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
  };

  return (
    <div className="audio-editor-test-app">
      <h1>오디오 편집 모듈 테스트</h1>
      
      {/* 파일 로드 섹션 */}
      <section className="section">
        <h2>오디오 파일 로드</h2>
        <div className="file-input-container">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            ref={fileInputRef}
            disabled={isLoading}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="btn"
          >
            오디오 파일 선택
          </button>
        </div>
        
        {isLoading && <div className="loading">로딩 중...</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </section>
      
      {/* 재생 컨트롤 섹션 */}
      <section className="section">
        <h2>재생 컨트롤</h2>
        <div className="transport-controls-container">
          <TransportControls />
        </div>
        
        <div className="playback-controls">
          <div className="control-group">
            <label>현재 위치: {state.currentTime.toFixed(2)}초</label>
            <input
              type="range"
              min="0"
              max={state.duration || 100}
              step="0.1"
              value={state.currentTime}
              onChange={handleTimeChange}
              className="slider"
            />
          </div>
          
          <div className="control-group">
            <label>마스터 볼륨: {(state.masterVolume * 100).toFixed(0)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={state.masterVolume}
              onChange={handleMasterVolumeChange}
              className="slider"
            />
          </div>
          
          <div className="button-group">
            <button onClick={() => play()} disabled={state.isPlaying} className="btn">
              재생
            </button>
            <button onClick={() => pause()} disabled={!state.isPlaying} className="btn">
              일시정지
            </button>
            <button onClick={() => stop()} className="btn">
              정지
            </button>
          </div>
        </div>
      </section>
      
      {/* 트랙 관리 섹션 */}
      <section className="section">
        <h2>트랙 목록 ({state.tracks.length}개)</h2>
        
        {state.tracks.length === 0 ? (
          <div className="no-tracks">
            로드된 트랙이 없습니다. 오디오 파일을 선택하세요.
          </div>
        ) : (
          <div className="tracks-list">
            {state.tracks.map(track => (
              <div key={track.id} className={`track-item ${track.id === state.selectedTrackId ? 'selected' : ''}`}>
                <div className="track-header">
                  <span className="track-name">{track.name}</span>
                  <button 
                    onClick={() => handleRemoveTrack(track.id)}
                    className="btn-small"
                  >
                    삭제
                  </button>
                </div>
                
                <div className="track-waveform">
                  {/* 파형 시각화 (간단한 표현) */}
                  <div className="waveform-container">
                    {(track.waveformData || []).slice(0, 100).map((value, index) => (
                      <div 
                        key={index}
                        className="waveform-bar"
                        style={{ height: `${value * 50}px` }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="track-controls">
                  <div className="control-group">
                    <label>볼륨: {(track.volume * 100).toFixed(0)}%</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={track.volume}
                      onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value))}
                      className="slider"
                    />
                  </div>
                  
                  <div className="control-group">
                    <label>패닝: {track.pan.toFixed(2)}</label>
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.01"
                      value={track.pan}
                      onChange={(e) => handlePanChange(track.id, parseFloat(e.target.value))}
                      className="slider"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* 정보 및 상태 섹션 */}
      <section className="section">
        <h2>오디오 정보</h2>
        <div className="info-panel">
          <div>트랙 수: {state.tracks.length}</div>
          <div>총 길이: {state.duration.toFixed(2)}초</div>
          <div>현재 위치: {state.currentTime.toFixed(2)}초</div>
          <div>재생 중: {state.isPlaying ? '예' : '아니오'}</div>
          <div>일시정지: {state.isPaused ? '예' : '아니오'}</div>
          <div>샘플레이트: {state.sampleRate}Hz</div>
        </div>
      </section>
    </div>
  );
};
