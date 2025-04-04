import React, { useRef, useState } from 'react';
import { useAudioEditor } from '../context/AudioEditorContext';

const AudioFileUploader: React.FC = () => {
  const { loadAudioFile } = useAudioEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    // 오디오 파일 유형 확인
    if (!file.type.startsWith('audio/')) {
      setError('오디오 파일만 업로드할 수 있습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // FileReader를 사용하여 파일을 URL로 변환
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const arrayBuffer = event.target.result as ArrayBuffer;
          const blob = new Blob([arrayBuffer], { type: file.type });
          const url = URL.createObjectURL(blob);
          
          try {
            // 오디오 편집기 컨텍스트를 통해 파일 로드
            await loadAudioFile(url, file.name);
            setLoading(false);
            
            // 파일 입력 초기화
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          } catch (error) {
            console.error('오디오 파일 로드 실패:', error);
            setError('오디오 파일을 로드하는 중 오류가 발생했습니다.');
            setLoading(false);
          }
        }
      };
      
      reader.onerror = () => {
        setError('파일을 읽는 중 오류가 발생했습니다.');
        setLoading(false);
      };
      
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('파일 처리 중 오류:', error);
      setError('파일 처리 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="audio-file-uploader" style={{ 
      padding: '15px', 
      border: '2px dashed #dee2e6',
      borderRadius: '6px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="audio/*"
        style={{ display: 'none' }}
      />
      
      <button
        onClick={handleButtonClick}
        disabled={loading}
        style={{ 
          padding: '10px 20px',
          backgroundColor: loading ? '#adb5bd' : '#4f9df3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '1em',
          display: 'block',
          margin: '0 auto 15px'
        }}
      >
        {loading ? '로딩 중...' : '오디오 파일 선택'}
      </button>
      
      <div style={{ fontSize: '0.9em', color: '#6c757d' }}>
        WAV, MP3, FLAC, AAC 등의 오디오 파일을 업로드할 수 있습니다.
      </div>
      
      {error && (
        <div style={{ 
          marginTop: '10px', 
          color: '#e03131', 
          padding: '8px', 
          backgroundColor: '#fff5f5',
          borderRadius: '4px' 
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default AudioFileUploader;
