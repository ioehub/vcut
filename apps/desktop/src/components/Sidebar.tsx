import React, { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('media');
  
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
                <button className="add-media-button">
                  <span>+</span> 미디어 추가
                </button>
              </div>
              
              <div className="media-items">
                <div className="media-item">
                  <div className="media-thumbnail">🎥</div>
                  <div className="media-info">
                    <div className="media-name">video1.mp4</div>
                    <div className="media-duration">00:02:15</div>
                  </div>
                </div>
                
                <div className="media-item">
                  <div className="media-thumbnail">🎥</div>
                  <div className="media-info">
                    <div className="media-name">video2.mp4</div>
                    <div className="media-duration">00:01:30</div>
                  </div>
                </div>
                
                <div className="media-item">
                  <div className="media-thumbnail">🔊</div>
                  <div className="media-info">
                    <div className="media-name">audio1.mp3</div>
                    <div className="media-duration">00:03:45</div>
                  </div>
                </div>
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
                    <div className="effect-item">밝기 조정</div>
                    <div className="effect-item">대비 조정</div>
                    <div className="effect-item">채도 조정</div>
                    <div className="effect-item">색조 조정</div>
                  </div>
                </div>
                
                <div className="effect-category">
                  <h4>필터</h4>
                  <div className="effect-items">
                    <div className="effect-item">흑백</div>
                    <div className="effect-item">세피아</div>
                    <div className="effect-item">빈티지</div>
                    <div className="effect-item">드라마틱</div>
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
                <div className="transition-item">페이드</div>
                <div className="transition-item">디졸브</div>
                <div className="transition-item">와이프</div>
                <div className="transition-item">슬라이드</div>
                <div className="transition-item">줌</div>
                <div className="transition-item">회전</div>
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
                <button className="add-text-button">
                  <span>+</span> 새 텍스트
                </button>
              </div>
              
              <div className="text-items">
                <div className="text-item">제목</div>
                <div className="text-item">자막</div>
                <div className="text-item">크레딧</div>
                <div className="text-item">로워서드</div>
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
                <button className="add-audio-button">
                  <span>+</span> 오디오 추가
                </button>
              </div>
              
              <div className="audio-categories">
                <div className="audio-category">
                  <h4>음악</h4>
                  <div className="audio-items">
                    <div className="audio-item">배경음악 1</div>
                    <div className="audio-item">배경음악 2</div>
                  </div>
                </div>
                
                <div className="audio-category">
                  <h4>효과음</h4>
                  <div className="audio-items">
                    <div className="audio-item">효과음 1</div>
                    <div className="audio-item">효과음 2</div>
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
