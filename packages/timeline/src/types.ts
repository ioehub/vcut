export interface Clip {
  id: string;
  type: 'video' | 'audio' | 'subtitle';
  startTime: number; // in seconds
  duration: number; // in seconds
  source: string; // path to the source file
  name: string;
}

export interface Track {
  id: string;
  name: string;
  clips: Clip[];
  type: 'video' | 'audio' | 'subtitle';
}

export interface TimelineProps {
  tracks: Track[];
  scale: number; // pixels per second
  currentTime: number;
  onClipMove: (clipId: string, trackId: string, newStartTime: number) => void;
  onTrackAdd?: () => void;
  onTrackRemove?: (trackId: string) => void;
}

export interface TrackProps {
  track: Track;
  scale: number; // pixels per second
  onClipMove: (clipId: string, trackId: string, newStartTime: number) => void;
}

export interface ClipProps {
  clip: Clip;
  scale: number; // pixels per second
  onMove: (clipId: string, trackId: string, newStartTime: number) => void;
  trackId: string;
}
