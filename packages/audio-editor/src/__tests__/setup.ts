import { expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock browser globals for tests
globalThis.window = globalThis.window || {} as any;
globalThis.AudioContext = vi.fn().mockImplementation(() => ({
  createGain: vi.fn().mockReturnValue({
    connect: vi.fn(),
    gain: { value: 1 }
  }),
  createBufferSource: vi.fn().mockReturnValue({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    disconnect: vi.fn(),
    buffer: null
  }),
  currentTime: 0,
  destination: {},
  state: 'running',
  resume: vi.fn().mockResolvedValue(undefined),
  suspend: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
  decodeAudioData: vi.fn().mockImplementation(() => {
    return Promise.resolve({
      duration: 10,
      length: 441000,
      numberOfChannels: 2,
      sampleRate: 44100,
      getChannelData: vi.fn().mockReturnValue(new Float32Array(1000))
    });
  })
}));

// Mock fetch API
globalThis.fetch = vi.fn();

// Setup global mocks for tests
beforeEach(() => {
  vi.clearAllMocks();
});
