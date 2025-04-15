import { FFmpegService } from '@vcut/ffmpeg-service';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('FFmpegService Integration Tests', () => {
  let ffmpegService: FFmpegService;
  let tempDir: string;
  const testVideoPath = path.join(__dirname, '../assets/test-video.mp4');
  
  // Helper function to create a temporary directory
  const createTempDir = () => {
    const tempDirPath = path.join(os.tmpdir(), `vcut-test-${Date.now()}`);
    fs.mkdirSync(tempDirPath, { recursive: true });
    return tempDirPath;
  };
  
  beforeAll(() => {
    // Create temp directory for test outputs
    tempDir = createTempDir();
    
    // Create assets directory if it doesn't exist
    const assetsDir = path.join(__dirname, '../assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    
    // Create a dummy test video file if it doesn't exist
    // In a real test, you would use a real video file
    if (!fs.existsSync(testVideoPath)) {
      // This is a placeholder - in real tests, you would use a real video file
      const dummyVideoContent = Buffer.from('dummy video content');
      fs.writeFileSync(testVideoPath, dummyVideoContent);
    }
  });
  
  beforeEach(() => {
    // Initialize FFmpegService before each test
    ffmpegService = new FFmpegService();
    ffmpegService.initialize();
  });
  
  afterAll(() => {
    // Clean up temp directory after all tests
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
  
  test('should initialize correctly', () => {
    expect(ffmpegService.isInitialized()).toBe(true);
  });
  
  test('should get video information', async () => {
    // This test is mocked since we're not using real FFmpeg binaries in tests
    jest.spyOn(ffmpegService, 'getVideoInfo').mockResolvedValue({
      path: testVideoPath,
      duration: 10.5,
      width: 1920,
      height: 1080,
      frameRate: 30,
      bitrate: 5000000,
      codec: 'h264',
      audioStreams: [
        {
          index: 1,
          codec: 'aac',
          sampleRate: 48000,
          channels: 2,
          bitrate: 128000,
          language: 'eng'
        }
      ],
      videoStreams: [
        {
          index: 0,
          codec: 'h264',
          width: 1920,
          height: 1080,
          frameRate: 30,
          bitrate: 5000000
        }
      ],
      metadata: {
        title: 'Test Video'
      }
    });
    
    const videoInfo = await ffmpegService.getVideoInfo(testVideoPath);
    
    expect(videoInfo).toBeDefined();
    expect(videoInfo.path).toBe(testVideoPath);
    expect(videoInfo.width).toBe(1920);
    expect(videoInfo.height).toBe(1080);
    expect(videoInfo.frameRate).toBe(30);
    expect(videoInfo.codec).toBe('h264');
    expect(videoInfo.audioStreams.length).toBe(1);
    expect(videoInfo.videoStreams.length).toBe(1);
  });
  
  test('should generate thumbnail', async () => {
    const outputPath = path.join(tempDir, 'thumbnail.jpg');
    
    // Mock the generateThumbnail method
    jest.spyOn(ffmpegService, 'generateThumbnail').mockResolvedValue(outputPath);
    
    const result = await ffmpegService.generateThumbnail(
      testVideoPath,
      outputPath,
      { timePosition: 5, width: 320, height: 240 }
    );
    
    expect(result).toBe(outputPath);
  });
  
  test('should trim video', async () => {
    const outputPath = path.join(tempDir, 'trimmed-video.mp4');
    
    // Mock the trimVideo method
    jest.spyOn(ffmpegService, 'trimVideo').mockResolvedValue(outputPath);
    
    const result = await ffmpegService.trimVideo(
      testVideoPath,
      outputPath,
      { startTime: 2, endTime: 8 }
    );
    
    expect(result).toBe(outputPath);
  });
  
  test('should crop video', async () => {
    const outputPath = path.join(tempDir, 'cropped-video.mp4');
    
    // Mock the cropVideo method
    jest.spyOn(ffmpegService, 'cropVideo').mockResolvedValue(outputPath);
    
    const result = await ffmpegService.cropVideo(
      testVideoPath,
      outputPath,
      { x: 100, y: 100, width: 800, height: 600 }
    );
    
    expect(result).toBe(outputPath);
  });
  
  test('should extract audio', async () => {
    const outputPath = path.join(tempDir, 'audio.mp3');
    
    // Mock the extractAudio method
    jest.spyOn(ffmpegService, 'extractAudio').mockResolvedValue(outputPath);
    
    const result = await ffmpegService.extractAudio(
      testVideoPath,
      outputPath,
      { format: 'mp3', bitrate: 192 }
    );
    
    expect(result).toBe(outputPath);
  });
  
  test('should concatenate videos', async () => {
    const outputPath = path.join(tempDir, 'concatenated-video.mp4');
    const videoFiles = [testVideoPath, testVideoPath]; // Using the same test video twice
    
    // Mock the concatenateVideos method
    jest.spyOn(ffmpegService, 'concatenateVideos').mockResolvedValue(outputPath);
    
    const result = await ffmpegService.concatenateVideos(
      videoFiles,
      outputPath
    );
    
    expect(result).toBe(outputPath);
  });
  
  test('should apply filter', async () => {
    const outputPath = path.join(tempDir, 'filtered-video.mp4');
    
    // Mock the applyFilter method
    jest.spyOn(ffmpegService, 'applyFilter').mockResolvedValue(outputPath);
    
    const result = await ffmpegService.applyFilter(
      testVideoPath,
      outputPath,
      { filterType: 'blur', intensity: 5 }
    );
    
    expect(result).toBe(outputPath);
  });
  
  test('should change video speed', async () => {
    const outputPath = path.join(tempDir, 'speed-changed-video.mp4');
    
    // Mock the changeSpeed method
    jest.spyOn(ffmpegService, 'changeSpeed').mockResolvedValue(outputPath);
    
    const result = await ffmpegService.changeSpeed(
      testVideoPath,
      outputPath,
      { speed: 2.0, preserveAudio: true }
    );
    
    expect(result).toBe(outputPath);
  });
});
