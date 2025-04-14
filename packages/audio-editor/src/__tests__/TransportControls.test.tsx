import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransportControls from '../components/TransportControls';

// Import Jest type definitions
import '../types/jest.d.ts';

// Mock the AudioEditorContext module
jest.mock('../context/AudioEditorContext', () => ({
  useAudioEditor: jest.fn(),
}));

// Import the mocked module
import { useAudioEditor } from '../context/AudioEditorContext';

describe('TransportControls', () => {
  // Set up mock functions for the tests
  const mockPlay = jest.fn();
  const mockPause = jest.fn();
  const mockStop = jest.fn();
  const mockSetCurrentTime = jest.fn();
  const mockSetLoop = jest.fn();
  
  // Default mock state
  const defaultMockState = {
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    duration: 120,
    loop: {
      enabled: false,
      start: 0,
      end: 0
    }
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset the mock implementation for each test
    (useAudioEditor as any).mockReturnValue({
      state: { ...defaultMockState },
      play: mockPlay,
      pause: mockPause,
      stop: mockStop,
      setCurrentTime: mockSetCurrentTime,
      setLoop: mockSetLoop
    });
  });

  test('컴포넌트가 올바르게 렌더링된다', () => {
    render(<TransportControls />);
    
    // Check if the time display is rendered
    const timeDisplay = screen.getByText('00:00.00');
    expect(timeDisplay).toBeDefined();
    
    // Check if the play button is rendered (when not playing)
    const playButton = screen.getByTitle('재생');
    expect(playButton).toBeDefined();
    
    // Check if the stop button is rendered
    const stopButton = screen.getByTitle('정지');
    expect(stopButton).toBeDefined();
  });

  test('재생 버튼이 클릭되면 play 함수가 호출된다', () => {
    render(<TransportControls />);
    
    const playButton = screen.getByTitle('재생');
    playButton.click();
    
    expect(mockPlay).toHaveBeenCalled();
  });

  test('정지 버튼이 클릭되면 stop 함수가 호출된다', () => {
    render(<TransportControls />);
    
    const stopButton = screen.getByTitle('정지');
    stopButton.click();
    
    expect(mockStop).toHaveBeenCalled();
  });

  test('일시정지 버튼이 클릭되면 pause 함수가 호출된다', () => {
    // Set isPlaying to true to show the pause button
    (useAudioEditor as any).mockReturnValue({
      state: { ...defaultMockState, isPlaying: true },
      play: mockPlay,
      pause: mockPause,
      stop: mockStop,
      setCurrentTime: mockSetCurrentTime,
      setLoop: mockSetLoop
    });
    
    render(<TransportControls />);
    
    const pauseButton = screen.getByTitle('일시정지');
    pauseButton.click();
    
    expect(mockPause).toHaveBeenCalled();
  });

  test('시간 표시가 올바르게 포맷팅된다', () => {
    // Set a specific current time
    (useAudioEditor as any).mockReturnValue({
      state: { ...defaultMockState, currentTime: 65.12 },
      play: mockPlay,
      pause: mockPause,
      stop: mockStop,
      setCurrentTime: mockSetCurrentTime,
      setLoop: mockSetLoop
    });
    
    render(<TransportControls />);
    
    // Check if the time is formatted correctly (01:05.12)
    const timeDisplay = screen.getByText('01:05.12');
    expect(timeDisplay).toBeDefined();
  });

  test('루프 설정 버튼이 올바르게 작동한다', () => {
    render(<TransportControls />);
    
    // Find and click the loop toggle button
    const loopButton = screen.getByText('루프 꺼짐');
    loopButton.click();
    
    // Check if setLoop was called with the correct parameters
    expect(mockSetLoop).toHaveBeenCalledWith(true, 0, 0);
  });
});
