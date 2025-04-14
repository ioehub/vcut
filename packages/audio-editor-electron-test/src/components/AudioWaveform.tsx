import React, { useEffect, useRef } from 'react';
import './AudioWaveform.css';

interface AudioWaveformProps {
  waveformData: Float32Array | null;
  currentTime: number;
  duration: number;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ waveformData, currentTime, duration }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !waveformData) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 캔버스 크기 설정
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    
    // 클리어
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // 파형 그리기
    const width = rect.width;
    const height = rect.height;
    const barWidth = width / waveformData.length;
    const centerY = height / 2;
    
    // 그리드 그리기
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    // 가로 그리드
    for (let y = 0; y < height; y += height / 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // 세로 그리드 (1초 간격)
    if (duration > 0) {
      const secondWidth = width / duration;
      for (let second = 0; second <= duration; second++) {
        const x = second * secondWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    }
    
    // 파형 그리기
    ctx.fillStyle = '#3498db';
    
    for (let i = 0; i < waveformData.length; i++) {
      const x = i * barWidth;
      const amplitude = waveformData[i] * height;
      
      // 막대 그리기 (위아래)
      ctx.fillRect(
        x, 
        centerY - (amplitude / 2), 
        barWidth * 0.8, 
        amplitude
      );
    }
    
    // 현재 재생 위치 표시
    if (duration > 0) {
      const playheadX = (currentTime / duration) * width;
      
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();
    }
    
  }, [waveformData, currentTime, duration]);
  
  return (
    <div className="waveform-container">
      {waveformData ? (
        <canvas 
          ref={canvasRef} 
          className="waveform-canvas"
        />
      ) : (
        <div className="no-waveform">
          <p>오디오 파일을 로드하여 파형을 표시합니다.</p>
        </div>
      )}
    </div>
  );
};

export default AudioWaveform;
