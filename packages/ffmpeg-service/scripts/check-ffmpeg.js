/**
 * FFmpeg 설치 확인 스크립트
 * 
 * 이 스크립트는 시스템에 FFmpeg가 설치되어 있는지 확인하고,
 * 설치되어 있지 않은 경우 설치 방법에 대한 안내를 제공합니다.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// 색상 코드
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * 명령어 실행 가능 여부 확인
 * @param {string} command 확인할 명령어
 * @returns {boolean} 명령어 실행 가능 여부
 */
function isCommandAvailable(command) {
  try {
    const platform = os.platform();
    const cmd = platform === 'win32' ? 'where' : 'which';
    execSync(`${cmd} ${command}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * FFmpeg 버전 가져오기
 * @returns {string|null} FFmpeg 버전 또는 null
 */
function getFFmpegVersion() {
  try {
    const output = execSync('ffmpeg -version').toString();
    const versionMatch = output.match(/ffmpeg version (\S+)/);
    return versionMatch ? versionMatch[1] : null;
  } catch (error) {
    return null;
  }
}

/**
 * FFprobe 버전 가져오기
 * @returns {string|null} FFprobe 버전 또는 null
 */
function getFFprobeVersion() {
  try {
    const output = execSync('ffprobe -version').toString();
    const versionMatch = output.match(/ffprobe version (\S+)/);
    return versionMatch ? versionMatch[1] : null;
  } catch (error) {
    return null;
  }
}

/**
 * 운영체제별 FFmpeg 설치 안내 출력
 */
function printInstallationInstructions() {
  const platform = os.platform();
  
  console.log(`${colors.yellow}FFmpeg가 설치되어 있지 않습니다.${colors.reset}`);
  console.log(`${colors.yellow}다음 안내에 따라 FFmpeg를 설치해 주세요:${colors.reset}\n`);
  
  if (platform === 'win32') {
    console.log(`${colors.cyan}Windows에서 FFmpeg 설치하기:${colors.reset}`);
    console.log('1. https://ffmpeg.org/download.html 에서 Windows 빌드를 다운로드하거나');
    console.log('2. Chocolatey를 사용하여 설치: choco install ffmpeg');
    console.log('3. Scoop을 사용하여 설치: scoop install ffmpeg');
    console.log('4. 시스템 환경 변수 PATH에 FFmpeg 경로 추가');
  } else if (platform === 'darwin') {
    console.log(`${colors.cyan}macOS에서 FFmpeg 설치하기:${colors.reset}`);
    console.log('1. Homebrew를 사용하여 설치: brew install ffmpeg');
    console.log('2. MacPorts를 사용하여 설치: sudo port install ffmpeg');
  } else if (platform === 'linux') {
    console.log(`${colors.cyan}Linux에서 FFmpeg 설치하기:${colors.reset}`);
    console.log('Ubuntu/Debian: sudo apt update && sudo apt install ffmpeg');
    console.log('Fedora: sudo dnf install ffmpeg');
    console.log('CentOS/RHEL: sudo yum install epel-release && sudo yum install ffmpeg');
    console.log('Arch Linux: sudo pacman -S ffmpeg');
  }
  
  console.log(`\n${colors.yellow}설치 후 npm install을 다시 실행하거나 애플리케이션을 재시작하세요.${colors.reset}`);
}

// 메인 함수
function main() {
  console.log(`${colors.blue}FFmpeg 확인 중...${colors.reset}`);
  
  const ffmpegAvailable = isCommandAvailable('ffmpeg');
  const ffprobeAvailable = isCommandAvailable('ffprobe');
  
  if (ffmpegAvailable && ffprobeAvailable) {
    const ffmpegVersion = getFFmpegVersion();
    const ffprobeVersion = getFFprobeVersion();
    
    console.log(`${colors.green}FFmpeg가 설치되어 있습니다.${colors.reset}`);
    console.log(`FFmpeg 버전: ${ffmpegVersion || '알 수 없음'}`);
    console.log(`FFprobe 버전: ${ffprobeVersion || '알 수 없음'}`);
  } else {
    printInstallationInstructions();
  }
}

// 스크립트 실행
main();
