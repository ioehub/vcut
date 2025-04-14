/**
 * 디렉토리가 존재하는지 확인하고, 없으면 생성
 * @param dirPath 디렉토리 경로
 */
export declare function ensureDirectoryExists(dirPath: string): void;
/**
 * 임시 디렉토리 경로 가져오기
 * @returns 임시 디렉토리 경로
 */
export declare function getTempDirectory(): string;
/**
 * 임시 파일 경로 생성
 * @param prefix 파일 이름 접두사
 * @param extension 파일 확장자 (점 제외)
 * @returns 임시 파일 경로
 */
export declare function getTempFilePath(prefix?: string, extension?: string): string;
/**
 * 파일 확장자 가져오기
 * @param filePath 파일 경로
 * @returns 확장자 (점 제외)
 */
export declare function getFileExtension(filePath: string): string;
/**
 * 파일 이름 가져오기 (확장자 제외)
 * @param filePath 파일 경로
 * @returns 파일 이름 (확장자 제외)
 */
export declare function getFileNameWithoutExtension(filePath: string): string;
/**
 * 파일 경로에서 디렉토리 경로 가져오기
 * @param filePath 파일 경로
 * @returns 디렉토리 경로
 */
export declare function getDirectoryPath(filePath: string): string;
/**
 * 파일이 존재하는지 확인
 * @param filePath 파일 경로
 * @returns 파일 존재 여부
 */
export declare function fileExists(filePath: string): boolean;
/**
 * 디렉토리가 존재하는지 확인
 * @param dirPath 디렉토리 경로
 * @returns 디렉토리 존재 여부
 */
export declare function directoryExists(dirPath: string): boolean;
/**
 * 파일 삭제
 * @param filePath 파일 경로
 * @returns 삭제 성공 여부
 */
export declare function deleteFile(filePath: string): boolean;
/**
 * 디렉토리 삭제 (재귀적)
 * @param dirPath 디렉토리 경로
 * @returns 삭제 성공 여부
 */
export declare function deleteDirectory(dirPath: string): boolean;
/**
 * 파일 이동
 * @param sourcePath 원본 파일 경로
 * @param targetPath 대상 파일 경로
 * @returns 이동 성공 여부
 */
export declare function moveFile(sourcePath: string, targetPath: string): boolean;
/**
 * 파일 복사
 * @param sourcePath 원본 파일 경로
 * @param targetPath 대상 파일 경로
 * @returns 복사 성공 여부
 */
export declare function copyFile(sourcePath: string, targetPath: string): boolean;
