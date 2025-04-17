import React, { useState, useRef } from 'react';
import '../styles/Sidebar.css';

interface SidebarProps {
  onMediaImport?: (files: File[]) => void;
  onEffectApply?: (effectType: string, params: any) => void;
  onTransitionApply?: (transitionType: string, params: any) => void;
  onTextAdd?: (textConfig: any) => void;
  onAudioAdd?: (audioFile: File) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onMediaImport,
  onEffectApply,
  onTransitionApply,
  onTextAdd,
  onAudioAdd
}) => {
  const [activeTab, setActiveTab] = useState('media');
  const [mediaItems, setMediaItems] = useState([
    { id: 1, name: 'video1.mp4', type: 'video', duration: '00:02:15', thumbnail: '🎥' },
    { id: 2, name: 'video2.mp4', type: 'video', duration: '00:01:30', thumbnail: '🎥' },
    { id: 3, name: 'audio1.mp3', type: 'audio', duration: '00:03:45', thumbnail: '🔊' }
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  
  const handleMediaImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 실제 파일 처리
      const fileArray = Array.from(files);
      
      // 미디어 항목 추가
      const newMediaItems = fileArray.map((file, index) => {
        const isVideo = file.type.startsWith('video');
        return {
          id: mediaItems.length + index + 1,
          name: file.name,
          type: isVideo ? 'video' : 'audio',
          duration: '00:00:00', // 실제로는 미디어 메타데이터에서 추출
          thumbnail: isVideo ? '🎥' : '🔊'
        };
      });
      
      setMediaItems([...mediaItems, ...newMediaItems]);
      
      // 부모 컴포넌트에 파일 전달
      if (onMediaImport) {
        onMediaImport(fileArray);
      }
    }
  };
  
  const handleAudioImport = () => {
    if (audioInputRef.current) {
      audioInputRef.current.click();
    }
  };
  
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 오디오 파일 처리
      const audioFile = files[0];
      
      // 미디어 항목 추가
      const newAudioItem = {
        id: mediaItems.length + 1,
        name: audioFile.name,
        type: 'audio',
        duration: '00:00:00', // 실제로는 오디오 메타데이터에서 추출
        thumbnail: '🔊'
      };
      
      setMediaItems([...mediaItems, newAudioItem]);
      
      // 부모 컴포넌트에 파일 전달
      if (onAudioAdd) {
        onAudioAdd(audioFile);
      }
    }
  };
  
  const handleEffectApply = (effectType: string, params: any = {}) => {
    console.log(`효과 적용: ${effectType}`, params);
    if (onEffectApply) {
      onEffectApply(effectType, params);
    }
  };
  
  const handleTransitionApply = (transitionType: string, params: any = {}) => {
    console.log(`전환 효과 적용: ${transitionType}`, params);
    if (onTransitionApply) {
      onTransitionApply(transitionType, params);
    }
  };
  
  const handleTextAdd = (textType: string) => {
    const textConfig = {
      type: textType,
      text: textType === '제목' ? '제목을 입력하세요' : '텍스트를 입력하세요',
      fontSize: textType === '제목' ? 36 : 24,
      fontFamily: 'Arial',
      color: '#FFFFFF',
      position: { x: 0.5, y: 0.5 } // 화면 중앙
    };
    
    console.log('텍스트 추가:', textConfig);
    if (onTextAdd) {
      onTextAdd(textConfig);
    }
  };
  
  const tabs = [
    { id: 'media', label: '미디어', icon: '🎬' },
    { id: 'effects', label: '효과', icon: '✨' },
    { id: 'transitions', label: '전환', icon: '🔄' },
    { id: 'text', label: '텍스트', icon: '📝' },
    { id: 'audio', label: '오디오', icon: '🔊' }
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'media':
        return (
          <div className="tab-content">
            <div className="media-library">
              <div className="section-header">
                <h3>미디어 라이브러리</h3>
                <button className="add-media-button" onClick={handleMediaImport}>
                  <span>+</span> 미디어 추가
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="video/*,audio/*,image/*" 
                  multiple 
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="media-items">
                {mediaItems.map(item => (
                  <div className="media-item" key={item.id} draggable>
                    <div className="media-thumbnail">{item.thumbnail}</div>
                    <div className="media-info">
                      <div className="media-name">{item.name}</div>
                      <div className="media-duration">{item.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'effects':
        return (
          <div className="tab-content">
            <div className="effects-library">
              <div className="section-header">
                <h3>효과 라이브러리</h3>
              </div>
              
              <div className="effect-categories">
                <div className="effect-category">
                  <h4>색상 효과</h4>
                  <div className="effect-items">
                    <div className="effect-item" onClick={() => handleEffectApply('brightness', { value: 1.2 })}>밝기 조정</div>
                    <div className="effect-item" onClick={() => handleEffectApply('contrast', { value: 1.2 })}>대비 조정</div>
                    <div className="effect-item" onClick={() => handleEffectApply('saturation', { value: 1.2 })}>채도 조정</div>
                    <div className="effect-item" onClick={() => handleEffectApply('hue', { value: 30 })}>색조 조정</div>
                  </div>
                </div>
                
                <div className="effect-category">
                  <h4>필터</h4>
                  <div className="effect-items">
                    <div className="effect-item" onClick={() => handleEffectApply('grayscale')}>흑백</div>
                    <div className="effect-item" onClick={() => handleEffectApply('sepia')}>세피아</div>
                    <div className="effect-item" onClick={() => handleEffectApply('vintage')}>빈티지</div>
                    <div className="effect-item" onClick={() => handleEffectApply('dramatic')}>드라마틱</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'transitions':
        return (
          <div className="tab-content">
            <div className="transitions-library">
              <div className="section-header">
                <h3>전환 효과</h3>
              </div>
              
              <div className="transition-items">
                <div className="transition-item" onClick={() => handleTransitionApply('fade', { duration: 1.0 })}>페이드</div>
                <div className="transition-item" onClick={() => handleTransitionApply('dissolve', { duration: 1.0 })}>디졸브</div>
                <div className="transition-item" onClick={() => handleTransitionApply('wipe', { direction: 'left' })}>와이프</div>
                <div className="transition-item" onClick={() => handleTransitionApply('slide', { direction: 'left' })}>슬라이드</div>
                <div className="transition-item" onClick={() => handleTransitionApply('zoom', { scale: 1.5 })}>줌</div>
                <div className="transition-item" onClick={() => handleTransitionApply('rotate', { angle: 360 })}>회전</div>
              </div>
            </div>
          </div>
        );
        
      case 'text':
        return (
          <div className="tab-content">
            <div className="text-library">
              <div className="section-header">
                <h3>텍스트 템플릿</h3>
                <button className="add-text-button" onClick={() => handleTextAdd('custom')}>
                  <span>+</span> 새 텍스트
                </button>
              </div>
              
              <div className="text-items">
                <div className="text-item" onClick={() => handleTextAdd('제목')}>제목</div>
                <div className="text-item" onClick={() => handleTextAdd('자막')}>자막</div>
                <div className="text-item" onClick={() => handleTextAdd('크레딧')}>크레딧</div>
                <div className="text-item" onClick={() => handleTextAdd('로워서드')}>로워서드</div>
              </div>
            </div>
          </div>
        );
        
      case 'audio':
        return (
          <div className="tab-content">
            <div className="audio-library">
              <div className="section-header">
                <h3>오디오 라이브러리</h3>
                <button className="add-audio-button" onClick={handleAudioImport}>
                  <span>+</span> 오디오 추가
                </button>
                <input 
                  type="file" 
                  ref={audioInputRef} 
                  style={{ display: 'none' }} 
                  accept="audio/*" 
                  onChange={handleAudioFileChange}
                />
              </div>
              
              <div className="audio-categories">
                <div className="audio-category">
                  <h4>음악</h4>
                  <div className="audio-items">
                    <div className="audio-item" draggable>배경음악 1</div>
                    <div className="audio-item" draggable>배경음악 2</div>
                  </div>
                </div>
                
                <div className="audio-category">
                  <h4>효과음</h4>
                  <div className="audio-items">
                    <div className="audio-item" draggable>효과음 1</div>
                    <div className="audio-item" draggable>효과음 2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-tabs">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </div>
        ))}
      </div>
      
      <div className="sidebar-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Sidebar;
