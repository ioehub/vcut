import React from 'react';
import { MediaProvider } from '../context/MediaContext';
import MediaManager from '../components/MediaManager';

/**
 * 미디어 관리 모듈 테스트 페이지
 * 
 * 이 페이지는 미디어 관리 컴포넌트의 기능을 테스트하기 위한 용도로 사용됩니다.
 */
export const TestMedia: React.FC = () => {
  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#121212',
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          padding: '16px',
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #333',
          color: '#fff',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '20px' }}>vCut Media Manager</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#aaa' }}>
          미디어 파일을 드래그 앤 드롭하거나 추가 버튼을 클릭하여 시작하세요
        </p>
      </header>
      
      {/* 메인 콘텐츠 영역 */}
      <main style={{ flex: 1, overflow: 'hidden' }}>
        <MediaProvider>
          <MediaManager
            onSelect={(items) => console.log('Selected items:', items)}
          />
        </MediaProvider>
      </main>
      
      {/* 푸터 */}
      <footer
        style={{
          padding: '12px 16px',
          backgroundColor: '#1a1a1a',
          borderTop: '1px solid #333',
          color: '#aaa',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>vCut Media Manager v0.1.0</div>
        <div>© 2025 vCut Team</div>
      </footer>
    </div>
  );
};

export default TestMedia;
