import React, { useState, useEffect, useRef } from 'react';
import { AudioService } from './services/AudioService';
import AudioWaveform from './components/AudioWaveform';
import AudioControls from './components/AudioControls';
import VolumeControl from './components/VolumeControl';
import FadeEffects from './components/FadeEffects';
import './App.css';

const App: React.FC = () => {
  const [audioService, setAudioService] = useState<AudioService | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [fadeInDuration, setFadeInDuration] = useState(0);
  const [fadeOutDuration, setFadeOutDuration] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [waveformData, setWaveformData] = useState<Float32Array | null>(null);
  
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  // AudioService 인스턴스 생성
  useEffect(() => {
    try {
      const service = new AudioService();
      setAudioService(service);
      
      // 이벤트 콜백 설정
      service.setOnPlay(() => {
        addLog('재생 시작됨');
        setIsPlaying(true);
        setIsPaused(false);
      });
      
      service.setOnPause(() => {
        addLog('재생 일시정지됨');
        setIsPlaying(false);
        setIsPaused(true);
      });
      
      service.setOnStop(() => {
        addLog('재생 정지됨');
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentTime(0);
      });
      
      service.setOnEnded(() => {
        addLog('재생 완료됨');
        setIsPlaying(false);
        setIsPaused(false);
      });
      
      service.setOnTimeUpdate(time => {
        setCurrentTime(time);
      });
      
      // 콘솔 로그 오버라이드하여 UI에 표시
      const originalConsoleLog = console.log;
      const originalConsoleWarn = console.warn;
      const originalConsoleError = console.error;
      
      console.log = (...args) => {
        originalConsoleLog(...args);
        addLog('[로그] ' + args.join(' '));
      };
      
      console.warn = (...args) => {
        originalConsoleWarn(...args);
        addLog('[경고] ' + args.join(' '));
      };
      
      console.error = (...args) => {
        originalConsoleError(...args);
        addLog('[오류] ' + args.join(' '));
      };
      
      addLog('오디오 서비스 초기화 완료');
      
      // 컴포넌트 언마운트 시 정리
      return () => {
        if (service) {
          service.stop();
        }
        
        // 콘솔 로그 복원
        console.log = originalConsoleLog;
        console.warn = originalConsoleWarn;
        console.error = originalConsoleError;
      };
    } catch (error) {
      console.error('오디오 서비스 초기화 중 오류:', error);
    }
  }, []);
  
  // 로그가 추가될 때 스크롤
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);
  
  // 일정 간격으로 시간 업데이트
  useEffect(() => {
    let timerId: number;
    
    if (isPlaying && audioService) {
      timerId = window.setInterval(() => {
        const time = audioService.getCurrentTime();
        setCurrentTime(time);
      }, 100);
    }
    
    return () => {
      clearInterval(timerId);
    };
  }, [isPlaying, audioService]);
  
  // 로그 추가 함수
  const addLog = (message: string) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
  
  // 파일 선택 처리
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length || !audioService) return;
    
    const file = files[0];
    
    addLog(`오디오 파일 선택됨: ${file.name}`);
    
    try {
      const success = await audioService.loadAudioFile(file);
      
      if (success) {
        const duration = audioService.getDuration();
        setDuration(duration);
        addLog(`오디오 로드 성공: ${file.name}, 길이: ${duration.toFixed(2)}초`);
        
        // 파형 데이터 생성
        const waveform = audioService.generateWaveformData();
        setWaveformData(waveform);
      } else {
        addLog(`오디오 로드 실패: ${file.name}`);
      }
    } catch (error) {
      console.error('파일 로드 중 오류:', error);
    }
  };
  
  // 재생 컨트롤 함수들
  const handlePlay = () => {
    if (!audioService) return;
    
    if (isPaused) {
      // 일시정지 상태에서는 현재 위치에서 재생
      audioService.play(currentTime);
    } else {
      // 처음부터 또는 지정된 시간에서 재생
      audioService.play(currentTime);
    }
  };
  
  const handlePause = () => {
    if (!audioService) return;
    audioService.pause();
  };
  
  const handleStop = () => {
    if (!audioService) return;
    audioService.stop();
  };
  
  // 볼륨 변경 처리
  const handleVolumeChange = (newVolume: number) => {
    if (!audioService) return;
    audioService.setVolume(newVolume);
    setVolume(newVolume);
  };
  
  // 페이드 효과 적용
  const handleApplyFade = () => {
    if (!audioService) return;
    const success = audioService.applyFadeEffect(fadeInDuration, fadeOutDuration);
    if (success) {
      addLog(`페이드 효과 적용됨: 인=${fadeInDuration}초, 아웃=${fadeOutDuration}초`);
    }
  };
  
  // 시간 포맷 함수
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  // 로그 지우기
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>vCut 오디오 편집 테스트</h1>
      </header>
      
      <main className="app-main">
        <section className="file-section">
          <div className="file-input-container">
            <label htmlFor="audioFile" className="file-input-label">
              오디오 파일 선택
            </label>
            <input 
              type="file" 
              id="audioFile" 
              accept="audio/*" 
              onChange={handleFileSelect} 
              className="file-input"
            />
          </div>
        </section>
        
        <section className="waveform-section">
          <AudioWaveform 
            waveformData={waveformData} 
            currentTime={currentTime} 
            duration={duration} 
          />
        </section>
        
        <section className="time-section">
          <div className="time-display">
            <span>현재 시간: {formatTime(currentTime)}</span>
            <span>총 길이: {formatTime(duration)}</span>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
        </section>
        
        <section className="controls-section">
          <AudioControls 
            isPlaying={isPlaying} 
            isPaused={isPaused} 
            onPlay={handlePlay} 
            onPause={handlePause} 
            onStop={handleStop} 
            disabled={!audioService || duration === 0}
          />
          
          <VolumeControl 
            volume={volume} 
            onChange={handleVolumeChange} 
            disabled={!audioService}
          />
        </section>
        
        <section className="effects-section">
          <FadeEffects 
            fadeInDuration={fadeInDuration}
            fadeOutDuration={fadeOutDuration}
            onFadeInChange={setFadeInDuration}
            onFadeOutChange={setFadeOutDuration}
            onApplyFade={handleApplyFade}
            disabled={!audioService || duration === 0}
          />
        </section>
        
        <section className="log-section">
          <div className="log-header">
            <h3>로그</h3>
            <button onClick={clearLogs} className="clear-log-button">로그 지우기</button>
          </div>
          <div className="log-container" ref={logContainerRef}>
            {logs.map((log, index) => (
              <div key={index} className="log-entry">
                {log}
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="app-footer">
        <p>vCut Electron 오디오 편집기 테스트 앱 | 2025</p>
      </footer>
    </div>
  );
};

export default App;
