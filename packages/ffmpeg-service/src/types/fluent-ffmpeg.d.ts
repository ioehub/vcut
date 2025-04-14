declare module 'fluent-ffmpeg' {
  interface FfmpegCommand {
    input(input: string): FfmpegCommand;
    inputOptions(options: string[]): FfmpegCommand;
    seekInput(time: number): FfmpegCommand;
    duration(duration: number): FfmpegCommand;
    format(format: string): FfmpegCommand;
    videoCodec(codec: string): FfmpegCommand;
    audioCodec(codec: string): FfmpegCommand;
    videoBitrate(bitrate: string | number): FfmpegCommand;
    audioBitrate(bitrate: string | number): FfmpegCommand;
    fps(fps: number): FfmpegCommand;
    size(size: string): FfmpegCommand;
    audioChannels(channels: number): FfmpegCommand;
    audioFrequency(frequency: number): FfmpegCommand;
    outputOptions(options: string | string[]): FfmpegCommand;
    noVideo(): FfmpegCommand;
    videoFilters(filters: string | string[]): FfmpegCommand;
    audioFilters(filters: string | string[]): FfmpegCommand;
    frames(count: number): FfmpegCommand;
    output(output: string): FfmpegCommand;
    on(event: 'start' | 'end' | 'error' | 'progress', callback: Function): FfmpegCommand;
    run(): void;
  }

  // 기본 함수 선언
  function ffmpeg(input?: string): FfmpegCommand;
  
  // 정적 메서드 선언
  namespace ffmpeg {
    function setFfmpegPath(path: string): void;
    function setFfprobePath(path: string): void;
    function ffprobe(input: string, callback: (err: Error | null, data: any) => void): void;
  }
  
  export default ffmpeg;
}
