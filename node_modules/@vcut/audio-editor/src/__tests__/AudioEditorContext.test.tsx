import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AudioEditorProvider, useAudioEditor } from '../context/AudioEditorContext';
import AudioService from '../services/AudioService';

// AudioService 모킹
jest.mock('../services/AudioService', () => {
  return jest.fn().mockImplementation(() => ({
    initialize: jest.fn(),
    loadAudioFile: jest.fn().mockResolvedValue({
      duration: 10,
      numberOfChannels: 2,
      sampleRate: 44100
    }),
    decodeAudioData: jest.fn().mockResolvedValue({
      duration: 10,
      numberOfChannels: 2,
      sampleRate: 44100
    }),
    generateWaveformData: jest.fn().mockReturnValue([]),
    playAllTracks: jest.fn(),
    pausePlayback: jest.fn(),
    resumePlayback: jest.fn(),
    stopAllTracks: jest.fn(),
    getCurrentTime: jest.fn().mockReturnValue(0),
    getIsPlaying: jest.fn().mockReturnValue(false),
    setMasterVolume: jest.fn(),
    setTrackVolume: jest.fn(),
    setTrackPan: jest.fn(),
    applyEffect: jest.fn(),
    audioContext: {
      state: 'running',
      resume: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined)
    }
  }));
});

// 테스트 컴포넌트
const TestComponent = () => {
  const {
    state,
    addTrack,
    removeTrack,
    setTrackVolume,
    setMasterVolume,
    play,
    pause,
    stop,
    setCurrentTime
  } = useAudioEditor();

  return (
    <div>
      <div data-testid="track-count">{state.tracks.length}</div>
      <div data-testid="is-playing">{state.isPlaying ? 'true' : 'false'}</div>
      <div data-testid="current-time">{state.currentTime}</div>
      <button
        data-testid="add-track-btn"
        onClick={() => {
          const mockTrack = {
            id: 'test-track',
            name: 'Test Track',
            audioBuffer: {} as AudioBuffer,
            waveformData: [],
            volume: 1,
            pan: 0,
            muted: false,
            solo: false,
            gain: 1.0,
            startTime: 0,
            duration: 10,
            effects: [],
            markers: [],
            isSelected: false
          };
          addTrack(mockTrack);
        }}
      >
        Add Track
      </button>
      <button
        data-testid="remove-track-btn"
        onClick={() => removeTrack('test-track')}
      >
        Remove Track
      </button>
      <button data-testid="play-btn" onClick={play}>
        Play
      </button>
      <button data-testid="pause-btn" onClick={pause}>
        Pause
      </button>
      <button data-testid="stop-btn" onClick={stop}>
        Stop
      </button>
      <button
        data-testid="set-time-btn"
        onClick={() => setCurrentTime(5)}
      >
        Set Time
      </button>
      <button
        data-testid="set-volume-btn"
        onClick={() => setMasterVolume(0.5)}
      >
        Set Volume
      </button>
    </div>
  );
};

describe('AudioEditorContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('AudioEditorProvider가 올바르게 상태를 제공한다', () => {
    render(
      <AudioEditorProvider>
        <TestComponent />
      </AudioEditorProvider>
    );

    expect(screen.getByTestId('track-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-playing')).toHaveTextContent('false');
    expect(screen.getByTestId('current-time')).toHaveTextContent('0');
  });

  test('트랙 추가 및 제거 기능이 올바르게 동작한다', async () => {
    render(
      <AudioEditorProvider>
        <TestComponent />
      </AudioEditorProvider>
    );

    // 트랙 추가
    fireEvent.click(screen.getByTestId('add-track-btn'));
    expect(screen.getByTestId('track-count')).toHaveTextContent('1');

    // 트랙 제거
    fireEvent.click(screen.getByTestId('remove-track-btn'));
    expect(screen.getByTestId('track-count')).toHaveTextContent('0');
  });

  test('재생 제어 기능이 올바르게 동작한다', () => {
    render(
      <AudioEditorProvider>
        <TestComponent />
      </AudioEditorProvider>
    );

    // 재생 시작
    fireEvent.click(screen.getByTestId('play-btn'));
    expect(screen.getByTestId('is-playing')).toHaveTextContent('true');

    // 일시정지
    fireEvent.click(screen.getByTestId('pause-btn'));
    expect(screen.getByTestId('is-playing')).toHaveTextContent('false');

    // 정지
    fireEvent.click(screen.getByTestId('play-btn'));
    fireEvent.click(screen.getByTestId('stop-btn'));
    expect(screen.getByTestId('is-playing')).toHaveTextContent('false');
    expect(screen.getByTestId('current-time')).toHaveTextContent('0');
  });

  test('시간 및 볼륨 설정이 올바르게 동작한다', () => {
    render(
      <AudioEditorProvider>
        <TestComponent />
      </AudioEditorProvider>
    );

    // 시간 설정
    fireEvent.click(screen.getByTestId('set-time-btn'));
    expect(screen.getByTestId('current-time')).toHaveTextContent('5');

    // 볼륨 설정
    const mockAudioService = AudioService as jest.Mock;
    fireEvent.click(screen.getByTestId('set-volume-btn'));
    
    // AudioService의 setMasterVolume 메서드가 호출되었는지 확인
    const mockInstance = mockAudioService.mock.instances[0];
    expect(mockInstance.setMasterVolume).toHaveBeenCalledWith(0.5);
  });

  // 추가 테스트 케이스...
});
