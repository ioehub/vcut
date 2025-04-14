/**
 * 경로 유틸리티 함수
 */
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';

/**
 * 디렉토리가 존재하는지 확인하고, 없으면 생성
 * @param dirPath 디렉토리 경로
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 임시 디렉토리 경로 가져오기
 * @returns 임시 디렉토리 경로
 */
export function getTempDirectory(): string {
  const tempDir = path.join(os.tmpdir(), 'vcut-ffmpeg');
  ensureDirectoryExists(tempDir);
  return tempDir;
}

/**
 * 임시 파일 경로 생성
 * @param prefix 파일 이름 접두사
 * @param extension 파일 확장자 (점 제외)
 * @returns 임시 파일 경로
 */
export function getTempFilePath(prefix: string = 'temp', extension: string = ''): string {
  const tempDir = getTempDirectory();
  const fileName = `${prefix}-${uuidv4()}${extension ? `.${extension}` : ''}`;
  return path.join(tempDir, fileName);
}

/**
 * 파일 확장자 가져오기
 * @param filePath 파일 경로
 * @returns 확장자 (점 제외)
 */
export function getFileExtension(filePath: string): string {
  return path.extname(filePath).slice(1).toLowerCase();
}

/**
 * 파일 이름 가져오기 (확장자 제외)
 * @param filePath 파일 경로
 * @returns 파일 이름 (확장자 제외)
 */
export function getFileNameWithoutExtension(filePath: string): string {
  const baseName = path.basename(filePath);
  const extName = path.extname(baseName);
  return baseName.slice(0, baseName.length - extName.length);
}

/**
 * 파일 경로에서 디렉토리 경로 가져오기
 * @param filePath 파일 경로
 * @returns 디렉토리 경로
 */
export function getDirectoryPath(filePath: string): string {
  return path.dirname(filePath);
}

/**
 * 파일이 존재하는지 확인
 * @param filePath 파일 경로
 * @returns 파일 존재 여부
 */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

/**
 * 디렉토리가 존재하는지 확인
 * @param dirPath 디렉토리 경로
 * @returns 디렉토리 존재 여부
 */
export function directoryExists(dirPath: string): boolean {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

/**
 * 파일 삭제
 * @param filePath 파일 경로
 * @returns 삭제 성공 여부
 */
export function deleteFile(filePath: string): boolean {
  try {
    if (fileExists(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`파일 삭제 중 오류 발생: ${(error as Error).message}`);
    return false;
  }
}

/**
 * 디렉토리 삭제 (재귀적)
 * @param dirPath 디렉토리 경로
 * @returns 삭제 성공 여부
 */
export function deleteDirectory(dirPath: string): boolean {
  try {
    if (directoryExists(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      return true;
    }
    return false;
  } catch (error) {
    console.error(`디렉토리 삭제 중 오류 발생: ${(error as Error).message}`);
    return false;
  }
}

/**
 * 파일 이동
 * @param sourcePath 원본 파일 경로
 * @param targetPath 대상 파일 경로
 * @returns 이동 성공 여부
 */
export function moveFile(sourcePath: string, targetPath: string): boolean {
  try {
    if (fileExists(sourcePath)) {
      ensureDirectoryExists(path.dirname(targetPath));
      fs.renameSync(sourcePath, targetPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`파일 이동 중 오류 발생: ${(error as Error).message}`);
    return false;
  }
}

/**
 * 파일 복사
 * @param sourcePath 원본 파일 경로
 * @param targetPath 대상 파일 경로
 * @returns 복사 성공 여부
 */
export function copyFile(sourcePath: string, targetPath: string): boolean {
  try {
    if (fileExists(sourcePath)) {
      ensureDirectoryExists(path.dirname(targetPath));
      fs.copyFileSync(sourcePath, targetPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`파일 복사 중 오류 발생: ${(error as Error).message}`);
    return false;
  }
}
