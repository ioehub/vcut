import React, { useState } from 'react';
import { RenderSettings, RenderPreset } from '../types';
import { RenderPresets } from '../utils/renderPresets';

interface RenderSettingsProps {
  initialSettings?: RenderSettings;
  onSettingsChange?: (settings: RenderSettings) => void;
}

/**
 * 렌더링 설정을 구성할 수 있는 컴포넌트
 */
const RenderSettingsComponent: React.FC<RenderSettingsProps> = ({
  initialSettings,
  onSettingsChange
}) => {
  const [preset, setPreset] = useState<string>('1080p');
  const [settings, setSettings] = useState<RenderSettings>(() => {
    if (initialSettings) return initialSettings;
    
    // 기본 설정으로 1080p 프리셋 사용
    return {
      id: 'custom-' + Date.now(),
      name: '사용자 정의 설정',
      ...RenderPresets['1080p'].settings
    };
  });
  
  // 프리셋 변경 핸들러
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPreset = e.target.value;
    setPreset(selectedPreset);
    
    const newSettings = {
      ...settings,
      ...RenderPresets[selectedPreset].settings
    };
    
    setSettings(newSettings);
    
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };
  
  // 설정 변경 핸들러
  const handleSettingChange = (field: string, value: any) => {
    // 중첩 객체 처리 (resolution, audioSettings 등)
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      const newSettings = {
        ...settings,
        [parentField]: {
          ...settings[parentField as keyof RenderSettings],
          [childField]: value
        }
      };
      
      setSettings(newSettings);
      
      if (onSettingsChange) {
        onSettingsChange(newSettings);
      }
    } else {
      const newSettings = {
        ...settings,
        [field]: value
      };
      
      setSettings(newSettings);
      
      if (onSettingsChange) {
        onSettingsChange(newSettings);
      }
    }
  };
  
  // 해상도 옵션
  const resolutionOptions = [
    { label: '480p (854x480)', width: 854, height: 480 },
    { label: '720p HD (1280x720)', width: 1280, height: 720 },
    { label: '1080p Full HD (1920x1080)', width: 1920, height: 1080 },
    { label: '1440p QHD (2560x1440)', width: 2560, height: 1440 },
    { label: '2160p 4K UHD (3840x2160)', width: 3840, height: 2160 }
  ];
  
  // 포맷 옵션
  const formatOptions = [
    { label: 'MP4 (H.264)', value: 'mp4', codec: 'h264' },
    { label: 'MP4 (H.265/HEVC)', value: 'mp4', codec: 'h265' },
    { label: 'WebM (VP9)', value: 'webm', codec: 'vp9' },
    { label: 'MOV (ProRes)', value: 'mov', codec: 'prores' },
    { label: 'MKV (H.264)', value: 'mkv', codec: 'h264' }
  ];
  
  // 비트레이트 옵션
  const bitrateOptions = [
    { label: '낮음 (2 Mbps)', value: 2000000 },
    { label: '중간 (5 Mbps)', value: 5000000 },
    { label: '높음 (8 Mbps)', value: 8000000 },
    { label: '매우 높음 (15 Mbps)', value: 15000000 },
    { label: '극높음 (20 Mbps)', value: 20000000 }
  ];
  
  // 프레임레이트 옵션
  const frameRateOptions = [
    { label: '24 fps (영화)', value: 24 },
    { label: '25 fps (PAL)', value: 25 },
    { label: '30 fps (일반)', value: 30 },
    { label: '50 fps (PAL 고속)', value: 50 },
    { label: '60 fps (고속)', value: 60 }
  ];
  
  // 오디오 코덱 옵션
  const audioCodecOptions = [
    { label: 'AAC (일반)', value: 'aac' },
    { label: 'MP3', value: 'mp3' },
    { label: 'FLAC (무손실)', value: 'flac' },
    { label: 'AC3 (돌비)', value: 'ac3' }
  ];
  
  // 오디오 비트레이트 옵션
  const audioBitrateOptions = [
    { label: '낮음 (96 kbps)', value: 96000 },
    { label: '중간 (128 kbps)', value: 128000 },
    { label: '높음 (192 kbps)', value: 192000 },
    { label: '매우 높음 (256 kbps)', value: 256000 },
    { label: '극높음 (320 kbps)', value: 320000 }
  ];

  return (
    <div className="render-settings">
      <h2>렌더링 설정</h2>
      
      <div className="settings-group">
        <label>프리셋:</label>
        <select value={preset} onChange={handlePresetChange}>
          {Object.entries(RenderPresets).map(([key, preset]) => (
            <option key={key} value={key}>
              {preset.name} - {preset.description}
            </option>
          ))}
        </select>
      </div>
      
      <div className="settings-group">
        <h3>비디오 설정</h3>
        
        <div className="settings-row">
          <div className="settings-field">
            <label>해상도:</label>
            <select 
              value={`${settings.resolution.width}x${settings.resolution.height}`} 
              onChange={(e) => {
                const [width, height] = e.target.value.split('x').map(Number);
                handleSettingChange('resolution', {
                  ...settings.resolution,
                  width,
                  height
                });
              }}
            >
              {resolutionOptions.map((option) => (
                <option key={option.label} value={`${option.width}x${option.height}`}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="settings-field">
            <label>포맷 및 코덱:</label>
            <select 
              value={`${settings.format}-${settings.codec}`}
              onChange={(e) => {
                const [format, codec] = e.target.value.split('-');
                handleSettingChange('format', format);
                handleSettingChange('codec', codec);
              }}
            >
              {formatOptions.map((option) => (
                <option key={`${option.value}-${option.codec}`} value={`${option.value}-${option.codec}`}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="settings-row">
          <div className="settings-field">
            <label>비트레이트:</label>
            <select 
              value={settings.bitrate}
              onChange={(e) => handleSettingChange('bitrate', Number(e.target.value))}
            >
              {bitrateOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="settings-field">
            <label>프레임레이트:</label>
            <select 
              value={settings.frameRate}
              onChange={(e) => handleSettingChange('frameRate', Number(e.target.value))}
            >
              {frameRateOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="settings-field checkbox">
          <input 
            type="checkbox" 
            id="hardware-acceleration" 
            checked={settings.useHardwareAcceleration}
            onChange={(e) => handleSettingChange('useHardwareAcceleration', e.target.checked)}
          />
          <label htmlFor="hardware-acceleration">하드웨어 가속 사용 (가능한 경우)</label>
        </div>
      </div>
      
      <div className="settings-group">
        <h3>오디오 설정</h3>
        
        <div className="settings-row">
          <div className="settings-field">
            <label>오디오 코덱:</label>
            <select 
              value={settings.audioSettings.codec}
              onChange={(e) => handleSettingChange('audioSettings.codec', e.target.value)}
            >
              {audioCodecOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="settings-field">
            <label>오디오 비트레이트:</label>
            <select 
              value={settings.audioSettings.bitrate}
              onChange={(e) => handleSettingChange('audioSettings.bitrate', Number(e.target.value))}
            >
              {audioBitrateOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="settings-row">
          <div className="settings-field">
            <label>샘플링 레이트:</label>
            <select 
              value={settings.audioSettings.sampleRate}
              onChange={(e) => handleSettingChange('audioSettings.sampleRate', Number(e.target.value))}
            >
              <option value={44100}>44.1 kHz (표준)</option>
              <option value={48000}>48 kHz (전문가용)</option>
              <option value={96000}>96 kHz (고품질)</option>
            </select>
          </div>
          
          <div className="settings-field">
            <label>오디오 채널:</label>
            <select 
              value={settings.audioSettings.channels}
              onChange={(e) => handleSettingChange('audioSettings.channels', Number(e.target.value))}
            >
              <option value={1}>모노 (1채널)</option>
              <option value={2}>스테레오 (2채널)</option>
              <option value={6}>5.1 채널</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="settings-summary">
        <h3>설정 요약</h3>
        <div className="summary-box">
          <p><strong>해상도:</strong> {settings.resolution.width}x{settings.resolution.height}</p>
          <p><strong>포맷:</strong> {settings.format.toUpperCase()}, <strong>코덱:</strong> {settings.codec}</p>
          <p><strong>비트레이트:</strong> {(settings.bitrate / 1000000).toFixed(1)} Mbps</p>
          <p><strong>프레임레이트:</strong> {settings.frameRate} fps</p>
          <p><strong>하드웨어 가속:</strong> {settings.useHardwareAcceleration ? '사용' : '사용 안 함'}</p>
          <p><strong>오디오:</strong> {settings.audioSettings.codec}, {(settings.audioSettings.bitrate / 1000).toFixed(0)} kbps, {(settings.audioSettings.sampleRate / 1000).toFixed(1)} kHz, {settings.audioSettings.channels}채널</p>
        </div>
      </div>

      <style jsx>{`
        .render-settings {
          font-family: 'Noto Sans KR', sans-serif;
          padding: 16px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        h2 {
          margin-top: 0;
          margin-bottom: 24px;
          font-size: 24px;
          color: #333;
        }
        
        h3 {
          margin-top: 16px;
          margin-bottom: 12px;
          font-size: 18px;
          color: #333;
        }
        
        .settings-group {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .settings-row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -8px;
        }
        
        .settings-field {
          flex: 1;
          min-width: 200px;
          padding: 0 8px;
          margin-bottom: 16px;
        }
        
        label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          font-size: 14px;
        }
        
        select, input[type="number"] {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          font-family: inherit;
        }
        
        .settings-field.checkbox {
          display: flex;
          align-items: center;
        }
        
        .settings-field.checkbox input {
          margin-right: 8px;
        }
        
        .settings-field.checkbox label {
          margin-bottom: 0;
        }
        
        .summary-box {
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 12px;
          font-size: 14px;
        }
        
        .summary-box p {
          margin: 6px 0;
        }
      `}</style>
    </div>
  );
};

export default RenderSettingsComponent;
