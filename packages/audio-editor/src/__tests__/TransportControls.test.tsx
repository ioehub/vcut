import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransportControls } from '../components/TransportControls';
import { AudioEditorProvider } from '../context/AudioEditorContext';

// 오디오 에디터 컨텍스트 모킹
jest.mock('../context/AudioEditorContext', () => {
  const originalModule = jest.requireActual('../context/AudioEditorContext');
  
  return {
    ...originalModule,
    useAudioEditor: jest.fn().mockReturnValue({
      state: {
        isPlaying: false,
        isPaused: false,
        currentTime: 0,
        duration: 120,
        loop: {
          enabled: false,
          start: 0,
          end: 0
        }
      },
      play: jest.fn(),
      pause: jest.fn(),
      stop: jest.fn(),
      setCurrentTime: jest.fn(),
      setLoop: jest.fn()
    })
  };
});

describe('TransportControls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('컴포넌트가 올바르게 렌더링된다', () => {
    render(
      <AudioEditorProvider>
        <TransportControls />
      </AudioEditorProvider>
    );

    // 기본 버튼들이 렌더링되는지 확인
    expect(screen.getByLabelText(/재생/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/정지/i)).toBeInTheDocument();
    expect(screen.getByText(/00:00.000/i)).toBeInTheDocument(); // 시간 표시
  });

  test('재생 버튼이 클릭되면 play 함수가 호출된다', () => {
    const { useAudioEditor } = require('../context/AudioEditorContext');
    const mockPlay = jest.fn();
    
    useAudioEditor.mockReturnValue({
      state: {
        isPlaying: false,
        isPaused: false,
        currentTime: 0,
        duration: 120,
        loop: {
          enabled: false,
          start: 0,
          end: 0
        }
      },
      play: mockPlay,
      pause: jest.fn(),
      stop: jest.fn(),
      setCurrentTime: jest.fn(),
      setLoop: jest.fn()
    });

    render(
      <AudioEditorProvider>
        <TransportControls />
      </AudioEditorProvider>
    );

    fireEvent.click(screen.getByLabelText(/재생/i));
    expect(mockPlay).toHaveBeenCalled();
  });

  test('정지 버튼이 클릭되면 stop 함수가 호출된다', () => {
    const { useAudioEditor } = require('../context/AudioEditorContext');
    const mockStop = jest.fn();
    
    useAudioEditor.mockReturnValue({
      state: {
        isPlaying: true,
        isPaused: false,
        currentTime: 10,
        duration: 120,
        loop: {
          enabled: false,
          start: 0,
          end: 0
        }
      },
      play: jest.fn(),
      pause: jest.fn(),
      stop: mockStop,
      setCurrentTime: jest.fn(),
      setLoop: jest.fn()
    });

    render(
      <AudioEditorProvider>
        <TransportControls />
      </AudioEditorProvider>
    );

    fireEvent.click(screen.getByLabelText(/정지/i));
    expect(mockStop).toHaveBeenCalled();
  });

  test('일시정지 버튼이 클릭되면 pause 함수가 호출된다', () => {
    const { useAudioEditor } = require('../context/AudioEditorContext');
    const mockPause = jest.fn();
    
    useAudioEditor.mockReturnValue({
      state: {
        isPlaying: true,
        isPaused: false,
        currentTime: 10,
        duration: 120,
        loop: {
          enabled: false,
          start: 0,
          end: 0
        }
      },
      play: jest.fn(),
      pause: mockPause,
      stop: jest.fn(),
      setCurrentTime: jest.fn(),
      setLoop: jest.fn()
    });

    render(
      <AudioEditorProvider>
        <TransportControls />
      </AudioEditorProvider>
    );

    // 재생 중일 때는 일시정지 버튼이 표시됨
    fireEvent.click(screen.getByLabelText(/일시정지/i));
    expect(mockPause).toHaveBeenCalled();
  });

  test('시간 표시가 올바르게 포맷팅된다', () => {
    const { useAudioEditor } = require('../context/AudioEditorContext');
    
    useAudioEditor.mockReturnValue({
      state: {
        isPlaying: false,
        isPaused: false,
        currentTime: 65.123, // 1분 5초 123밀리초
        duration: 120,
        loop: {
          enabled: false,
          start: 0,
          end: 0
        }
      },
      play: jest.fn(),
      pause: jest.fn(),
      stop: jest.fn(),
      setCurrentTime: jest.fn(),
      setLoop: jest.fn()
    });

    render(
      <AudioEditorProvider>
        <TransportControls />
      </AudioEditorProvider>
    );

    // 시간이 올바르게 표시되는지 확인
    expect(screen.getByText(/01:05.123/i)).toBeInTheDocument();
  });

  test('루프 설정 버튼이 올바르게 작동한다', () => {
    const { useAudioEditor } = require('../context/AudioEditorContext');
    const mockSetLoop = jest.fn();
    
    useAudioEditor.mockReturnValue({
      state: {
        isPlaying: false,
        isPaused: false,
        currentTime: 0,
        duration: 120,
        loop: {
          enabled: false,
          start: 0,
          end: 0
        }
      },
      play: jest.fn(),
      pause: jest.fn(),
      stop: jest.fn(),
      setCurrentTime: jest.fn(),
      setLoop: mockSetLoop
    });

    render(
      <AudioEditorProvider>
        <TransportControls />
      </AudioEditorProvider>
    );

    // 루프 설정 버튼 클릭
    fireEvent.click(screen.getByLabelText(/루프/i));
    expect(mockSetLoop).toHaveBeenCalledWith(true, 0, 120);
  });

  // 추가 테스트 케이스...
});
