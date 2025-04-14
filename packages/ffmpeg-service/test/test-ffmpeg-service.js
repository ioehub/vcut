/**
 * FFmpeg 서비스 테스트 스크립트
 */

// CommonJS 방식으로 모듈 가져오기 (빌드된 파일 사용)
const { FFmpegService } = require('../dist/index');
const path = require('path');
const fs = require('fs');

// 테스트 디렉토리 설정
const TEST_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEST_DIR)) {
  fs.mkdirSync(TEST_DIR, { recursive: true });
}

// 테스트 파일 경로
const TEST_VIDEO_PATH = process.argv[2] || path.join(__dirname, 'sample.mp4');
const THUMBNAIL_OUTPUT_PATH = path.join(TEST_DIR, 'thumbnail.jpg');
const TRIMMED_VIDEO_PATH = path.join(TEST_DIR, 'trimmed.mp4');
const AUDIO_OUTPUT_PATH = path.join(TEST_DIR, 'audio.mp3');

// FFmpeg 서비스 인스턴스 생성
const ffmpegService = new FFmpegService();

/**
 * 테스트 실행 함수
 */
async function runTests() {
  console.log('===== FFmpeg 서비스 테스트 시작 =====');
  
  try {
    // 1. FFmpeg 설치 확인
    console.log('\n----- FFmpeg 설치 확인 -----');
    console.log(`FFmpeg 초기화 상태: ${ffmpegService.isInitialized()}`);
    
    // 2. 비디오 정보 가져오기
    console.log('\n----- 비디오 정보 가져오기 -----');
    console.log(`테스트 비디오 파일: ${TEST_VIDEO_PATH}`);
    
    if (!fs.existsSync(TEST_VIDEO_PATH)) {
      console.error(`오류: 테스트 비디오 파일을 찾을 수 없습니다: ${TEST_VIDEO_PATH}`);
      console.log('사용법: node test-ffmpeg-service.js [비디오 파일 경로]');
      process.exit(1);
    }
    
    const videoInfo = await ffmpegService.getVideoInfo(TEST_VIDEO_PATH);
    console.log('비디오 정보:');
    console.log(`- 길이: ${videoInfo.duration}초`);
    console.log(`- 해상도: ${videoInfo.width}x${videoInfo.height}`);
    console.log(`- 프레임 레이트: ${videoInfo.frameRate}fps`);
    console.log(`- 비트레이트: ${videoInfo.bitrate}bps`);
    console.log(`- 코덱: ${videoInfo.codec}`);
    
    // 3. 썸네일 생성
    console.log('\n----- 썸네일 생성 -----');
    const thumbnailOptions = {
      timePosition: Math.min(5, videoInfo.duration / 2), // 5초 또는 비디오 중간 지점
      width: 320,
      height: 180,
      quality: 90
    };
    
    console.log(`썸네일 옵션: ${JSON.stringify(thumbnailOptions)}`);
    console.log(`썸네일 출력 경로: ${THUMBNAIL_OUTPUT_PATH}`);
    
    await ffmpegService.generateThumbnail(
      TEST_VIDEO_PATH,
      THUMBNAIL_OUTPUT_PATH,
      thumbnailOptions
    );
    
    console.log(`썸네일 생성 완료: ${THUMBNAIL_OUTPUT_PATH}`);
    console.log(`파일 크기: ${(fs.statSync(THUMBNAIL_OUTPUT_PATH).size / 1024).toFixed(2)}KB`);
    
    // 4. 비디오 트림
    console.log('\n----- 비디오 트림 -----');
    const trimOptions = {
      startTime: 0,
      endTime: Math.min(10, videoInfo.duration), // 처음 10초 또는 전체 길이
      encodingOptions: {
        videoCodec: 'libx264',
        audioBitrate: '128k',
        videoBitrate: '1000k'
      }
    };
    
    console.log(`트림 옵션: ${JSON.stringify(trimOptions)}`);
    console.log(`트림 출력 경로: ${TRIMMED_VIDEO_PATH}`);
    
    // FFmpegServiceExtended 클래스 가져오기
    const { FFmpegServiceExtended } = require('../dist/index');
    const ffmpegServiceExtended = new FFmpegServiceExtended();
    
    await ffmpegServiceExtended.trimVideo(
      TEST_VIDEO_PATH,
      TRIMMED_VIDEO_PATH,
      trimOptions,
      (progress) => {
        process.stdout.write(`\r트림 진행률: ${progress.percent}% (${progress.processedSeconds.toFixed(1)}/${progress.totalSeconds.toFixed(1)}초)`);
      }
    );
    
    console.log('\n트림 완료');
    
    // 5. 오디오 추출
    console.log('\n----- 오디오 추출 -----');
    
    // 절대 경로로 오디오 출력 파일 경로 설정
    const absoluteAudioPath = path.resolve(AUDIO_OUTPUT_PATH);
    
    // 출력 디렉토리 확인 및 생성
    const audioDir = path.dirname(absoluteAudioPath);
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    
    // 기존 파일이 있다면 삭제
    if (fs.existsSync(absoluteAudioPath)) {
      fs.unlinkSync(absoluteAudioPath);
    }
    
    const audioOptions = {
      codec: 'libmp3lame',
      bitrate: '128k',
      channels: 2,
      format: 'mp3'
    };
    
    console.log(`오디오 추출 옵션: ${JSON.stringify(audioOptions)}`);
    console.log(`오디오 출력 경로: ${absoluteAudioPath}`);
    
    try {
      await ffmpegServiceExtended.extractAudio(
        TEST_VIDEO_PATH,
        absoluteAudioPath,
        audioOptions,
        (progress) => {
          process.stdout.write(`\r오디오 추출 진행률: ${progress.percent}% (${progress.processedSeconds.toFixed(1)}/${progress.totalSeconds.toFixed(1)}초)`);
        }
      );
      
      console.log('\n오디오 추출 완료');
      if (fs.existsSync(absoluteAudioPath)) {
        console.log(`파일 크기: ${(fs.statSync(absoluteAudioPath).size / 1024).toFixed(2)}KB`);
      } else {
        console.log('경고: 오디오 파일이 생성되지 않았습니다.');
      }
    } catch (audioError) {
      console.error(`\n오디오 추출 중 오류 발생: ${audioError.message}`);
      console.log('오디오 추출 테스트를 건너뜁니다.');
    }
    
    console.log('\n===== 모든 테스트 완료 =====');
    console.log(`결과 파일 디렉토리: ${TEST_DIR}`);
    
  } catch (error) {
    console.error('\n테스트 중 오류 발생:');
    console.error(error);
    process.exit(1);
  }
}

// 테스트 실행
runTests();
