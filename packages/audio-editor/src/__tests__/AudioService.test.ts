import AudioService from '../services/AudioService';

// AudioContext 모킹
(window as any).AudioContext = jest.fn().mockImplementation(() => ({
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

// 테스트 전 모든 모의 함수 재설정
beforeEach(() => {
  jest.clearAllMocks();
  // 필요한 경우 추가 설정
});

describe('AudioService', () => {
  let audioService: AudioService;

  beforeEach(() => {
    audioService = new AudioService();
  });

  test('초기화가 올바르게 동작한다', () => {
    expect(audioService).toBeDefined();
    expect(audioService.audioContext).toBeDefined();
    // 추가 확인 사항...
  });

  test('loadAudioFile이 오디오 버퍼를 올바르게 로드한다', async () => {
    // fetch 모킹
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(1000))
      })
    ) as jest.Mock;

    const url = 'https://example.com/audio.mp3';
    const buffer = await audioService.loadAudioFile(url);
    
    expect(fetch).toHaveBeenCalledWith(url);
    expect(buffer).toBeDefined();
    expect(buffer.duration).toBe(10);
    expect(buffer.numberOfChannels).toBe(2);
  });

  test('재생 및 정지 기능이 올바르게 동작한다', () => {
    // 트랙 노드 설정을 위한 mockTrackNodes 구현...
    const mockTrackNodes = new Map();
    mockTrackNodes.set('track1', [
      {
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn()
      }
    ]);
    
    // private 속성에 접근하기 위한 방법 (테스트 용도로만 사용)
    (audioService as any).trackNodes = mockTrackNodes;
    
    // 재생 테스트
    audioService.playAllTracks();
    expect(audioService.getIsPlaying()).toBe(true);
    
    // 정지 테스트
    audioService.stopAllTracks();
    expect(audioService.getIsPlaying()).toBe(false);
  });

  test('볼륨 조절이 올바르게 동작한다', () => {
    audioService.setMasterVolume(0.5);
    // private 속성 확인 (테스트 용도로만)
    expect((audioService as any).masterGainNode.gain.value).toBe(0.5);
  });

  test('getCurrentTime이 올바른 시간을 반환한다', () => {
    // 테스트 설정...
    (audioService as any).startTime = 0;
    (audioService as any).audioContext.currentTime = 5;
    (audioService as any).isPlaying = true;
    
    const currentTime = audioService.getCurrentTime();
    expect(currentTime).toBe(5);
  });

  // 추가 테스트 케이스...
});
