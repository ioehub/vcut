import { beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';

// Mock browser globals for tests
globalThis.window = globalThis.window || {} as any;
globalThis.AudioContext = jest.fn().mockImplementation(() => ({
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
  decodeAudioData: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      duration: 10,
      length: 441000,
      numberOfChannels: 2,
      sampleRate: 44100,
      getChannelData: jest.fn().mockReturnValue(new Float32Array(1000))
    });
  })
}));

// Mock fetch API
globalThis.fetch = jest.fn();

// Setup global mocks for tests
beforeEach(() => {
  jest.clearAllMocks();
});
