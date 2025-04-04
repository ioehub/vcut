// Jest-DOM 추가 matchers
import '@testing-library/jest-dom';

// Web Audio API 모킹
window.AudioContext = jest.fn().mockImplementation(() => ({
  createGain: jest.fn().mockReturnValue({
    connect: jest.fn(),
    gain: { value: 1 }
  }),
  createBufferSource: jest.fn().mockReturnValue({
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    disconnect: jest.fn(),
    buffer: null
  }),
  currentTime: 0,
  destination: {},
  state: 'running',
  resume: jest.fn().mockResolvedValue(undefined),
  suspend: jest.fn().mockResolvedValue(undefined),
  close: jest.fn().mockResolvedValue(undefined),
  decodeAudioData: jest.fn().mockImplementation((arrayBuffer) => {
    return Promise.resolve({
      duration: 10,
      length: 441000,
      numberOfChannels: 2,
      sampleRate: 44100,
      getChannelData: jest.fn().mockReturnValue(new Float32Array(1000))
    });
  })
}));

// WebkitAudioContext fallback
window.webkitAudioContext = window.AudioContext;

// fetch 모킹
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(1000))
  })
);

// Web API 메서드들에 대한 추가 모킹
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 테스트에 사용할 유틸리티 함수
global.createAudioBuffer = (options = {}) => {
  const {
    duration = 10,
    numberOfChannels = 2,
    sampleRate = 44100
  } = options;
  
  const length = duration * sampleRate;
  const buffer = {
    duration,
    length,
    numberOfChannels,
    sampleRate,
    getChannelData: jest.fn().mockReturnValue(new Float32Array(length)),
  };
  
  return buffer;
};

// 콘솔 경고 억제 (필요한 경우)
console.warn = jest.fn();
