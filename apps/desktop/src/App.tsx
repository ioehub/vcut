import React, { useState, useEffect } from 'react';
import { EditorPage, EditorPageProvider } from '@vcut/editor-page';
import { MediaProvider } from '@vcut/media';
import { PlayheadProvider } from '@vcut/playhead';
import { AudioEditorProvider } from '@vcut/audio-editor';
import { PreviewPlayerProvider } from '@vcut/preview-player';
import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';
import './styles/App.css';

// 더미 서비스 객체 생성 (실제 서비스 대신 사용)
const dummyMcpFactory = {
  createMCPService: () => ({
    initialize: async () => true,
    getMediaDuration: async () => 60,
    playMedia: async () => true,
    pauseMedia: async () => true,
    seekMedia: async (time: number) => true,
    getCurrentTime: async () => 0,
    setVolume: async (volume: number) => true,
    getVolume: async () => 1,
    onTimeUpdate: (callback: (time: number) => void) => {
      const interval = setInterval(() => callback(Math.random() * 60), 1000);
      return () => clearInterval(interval);
    }
  })
};

const dummyFFmpegService = {
  initialize: async () => true,
  extractMetadata: async () => ({
    width: 1920,
    height: 1080,
    duration: 60,
    frameRate: 30,
    audioSampleRate: 44100,
    audioChannels: 2
  }),
  generateThumbnail: async () => new Blob(),
  extractAudio: async () => new Blob(),
  mergeAudioVideo: async () => new Blob(),
  applyEffect: async (type: string, params: any) => new Blob(),
  exportVideo: async (options: any) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new Blob()), 3000);
    });
  }
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('초기화 중...');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [appliedEffects, setAppliedEffects] = useState<Array<{type: string, params: any}>>([]);
  const [appliedTransitions, setAppliedTransitions] = useState<Array<{type: string, params: any}>>([]);
  const [textElements, setTextElements] = useState<Array<any>>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  
  // 서비스 초기화 시뮬레이션
  useEffect(() => {
    const initServices = async () => {
      setIsLoading(true);
      setLoadingMessage('서비스 초기화 중...');
      
      // 서비스 초기화 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoadingMessage('에디터 준비 중...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
    };
    
    initServices();
  }, []);
  
  // 미디어 파일 임포트 핸들러
  const handleMediaImport = (files: File[]) => {
    console.log('미디어 파일 임포트:', files);
    setMediaFiles([...mediaFiles, ...files]);
    
    // 미디어 임포트 시뮬레이션
    setIsLoading(true);
    setLoadingMessage('미디어 파일 처리 중...');
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`${files.length}개의 미디어 파일이 추가되었습니다.`);
    }, 1500);
  };
  
  // 효과 적용 핸들러
  const handleEffectApply = (effectType: string, params: any) => {
    console.log('효과 적용:', effectType, params);
    setAppliedEffects([...appliedEffects, { type: effectType, params }]);
    
    // 효과 적용 시뮬레이션
    setIsLoading(true);
    setLoadingMessage(`${effectType} 효과 적용 중...`);
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`${effectType} 효과가 적용되었습니다.`);
    }, 1000);
  };
  
  // 전환 효과 적용 핸들러
  const handleTransitionApply = (transitionType: string, params: any) => {
    console.log('전환 효과 적용:', transitionType, params);
    setAppliedTransitions([...appliedTransitions, { type: transitionType, params }]);
    
    // 전환 효과 적용 시뮬레이션
    setIsLoading(true);
    setLoadingMessage(`${transitionType} 전환 효과 적용 중...`);
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`${transitionType} 전환 효과가 적용되었습니다.`);
    }, 1000);
  };
  
  // 텍스트 추가 핸들러
  const handleTextAdd = (textConfig: any) => {
    console.log('텍스트 추가:', textConfig);
    setTextElements([...textElements, textConfig]);
    
    // 텍스트 추가 시뮬레이션
    alert(`${textConfig.type} 텍스트가 추가되었습니다.`);
  };
  
  // 오디오 추가 핸들러
  const handleAudioAdd = (audioFile: File) => {
    console.log('오디오 추가:', audioFile);
    setAudioFiles([...audioFiles, audioFile]);
    
    // 오디오 추가 시뮬레이션
    setIsLoading(true);
    setLoadingMessage('오디오 파일 처리 중...');
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`${audioFile.name} 오디오 파일이 추가되었습니다.`);
    }, 1000);
  };
  
  // 프로젝트 저장 핸들러
  const handleSaveProject = (projectData: any) => {
    console.log('프로젝트 저장:', projectData);
    
    // 프로젝트 데이터 구성
    const fullProjectData = {
      ...projectData,
      mediaFiles: mediaFiles.map(file => file.name),
      effects: appliedEffects,
      transitions: appliedTransitions,
      textElements,
      audioFiles: audioFiles.map(file => file.name)
    };
    
    // 저장 시뮬레이션
    setIsLoading(true);
    setLoadingMessage('프로젝트 저장 중...');
    
    setTimeout(() => {
      // localStorage에 저장
      localStorage.setItem('vcut-project', JSON.stringify(fullProjectData));
      
      setIsLoading(false);
      alert('프로젝트가 저장되었습니다.');
    }, 1000);
  };
  
  // 프로젝트 내보내기 핸들러
  const handleExportProject = (exportOptions: any) => {
    console.log('프로젝트 내보내기:', exportOptions);
    
    // 내보내기 시뮬레이션
    setIsLoading(true);
    setLoadingMessage('프로젝트 내보내기 중...');
    
    setTimeout(() => {
      setLoadingMessage('비디오 렌더링 중...');
      
      setTimeout(() => {
        setLoadingMessage('파일 생성 중...');
        
        setTimeout(() => {
          setIsLoading(false);
          alert('내보내기가 완료되었습니다. 파일이 다운로드 폴더에 저장되었습니다.');
        }, 1000);
      }, 1500);
    }, 1000);
  };
  
  // 로딩 화면
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>vCut 비디오 편집기</h2>
          <p>{loadingMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vcut-app">
      <AppHeader 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        onSave={() => handleSaveProject({ name: '현재 프로젝트' })}
        onExport={() => handleExportProject({ format: 'mp4', quality: 'high' })}
      />
      
      <div className="app-container">
        {sidebarOpen && (
          <div className="app-sidebar">
            <Sidebar 
              onMediaImport={handleMediaImport}
              onEffectApply={handleEffectApply}
              onTransitionApply={handleTransitionApply}
              onTextAdd={handleTextAdd}
              onAudioAdd={handleAudioAdd}
            />
          </div>
        )}
        
        <div className="app-content">
          <MediaProvider>
            <PlayheadProvider>
              <AudioEditorProvider>
                <PreviewPlayerProvider>
                  <EditorPageProvider
                    mcpFactory={dummyMcpFactory as any}
                    ffmpegService={dummyFFmpegService as any}
                  >
                    <EditorPage 
                      projectId="new-project"
                      initialData={{
                        name: '새 프로젝트',
                        resolution: { width: 1920, height: 1080 },
                        frameRate: 30
                      }}
                      onSave={handleSaveProject}
                      onExport={handleExportProject}
                    />
                  </EditorPageProvider>
                </PreviewPlayerProvider>
              </AudioEditorProvider>
            </PlayheadProvider>
          </MediaProvider>
        </div>
      </div>
    </div>
  );
};

export default App;
