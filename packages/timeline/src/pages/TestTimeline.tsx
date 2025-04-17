import React, { useState, useEffect, useRef } from "react";
import { Timeline } from "../components/Timeline";
import { Track } from "../types";

// Mock data for testing
const initialTracks: Track[] = [
  {
    id: "1",
    name: "메인 비디오",
    type: "video",
    clips: [
      {
        id: "v1",
        type: "video",
        startTime: 0,
        duration: 5,
        source: "/videos/sample1.mp4",
        name: "인트로"
      },
      {
        id: "v2",
        type: "video",
        startTime: 5,
        duration: 10,
        source: "/videos/sample2.mp4",
        name: "메인 내용"
      }
    ]
  },
  {
    id: "2",
    name: "배경 음악",
    type: "audio",
    clips: [
      {
        id: "a1",
        type: "audio",
        startTime: 2,
        duration: 12,
        source: "/audio/background.mp3",
        name: "배경 음악"
      }
    ]
  },
  {
    id: "3",
    name: "자막",
    type: "subtitle",
    clips: [
      {
        id: "s1",
        type: "subtitle",
        startTime: 1,
        duration: 3,
        source: "",
        name: "인트로 자막"
      },
      {
        id: "s2",
        type: "subtitle",
        startTime: 7,
        duration: 4,
        source: "",
        name: "설명 자막"
      }
    ]
  }
];

export const TestTimeline: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [scale, setScale] = useState<number>(100); // 100px per second
  const [currentTime] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const containerRef = useRef<HTMLDivElement>(null);

  // 브라우저 창 크기 변경을 감지하는 이벤트 리스너
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 컨테이너 크기 조정을 위한 효과
  useEffect(() => {
    if (containerRef.current) {
      // 컨테이너 너비 설정
      containerRef.current.style.width = `${Math.max(windowWidth - 40, 320)}px`;
    }
  }, [windowWidth]);

  // Handle clip movement
  const handleClipMove = (clipId: string, trackId: string, newStartTime: number) => {
    setTracks(prevTracks => 
      prevTracks.map(track => {
        if (track.id === trackId) {
          return {
            ...track,
            clips: track.clips.map(clip => 
              clip.id === clipId ? {...clip, startTime: newStartTime} : clip
            )
          };
        }
        return track;
      })
    );
  };

  // Handle track addition
  const handleAddTrack = () => {
    const newTrackId = `track-${Date.now()}`;
    const newTrack: Track = {
      id: newTrackId,
      name: `트랙 ${tracks.length + 1}`,
      type: "video",
      clips: []
    };
    
    setTracks([...tracks, newTrack]);
  };

  // Handle track removal
  const handleRemoveTrack = (trackId: string) => {
    setTracks(tracks.filter(track => track.id !== trackId));
  };

  // Handle zoom in
  const handleZoomIn = () => {
    setScale(prevScale => prevScale * 1.2);
  };

  // Handle zoom out
  const handleZoomOut = () => {
    setScale(prevScale => prevScale / 1.2);
  };

  return (
    <div className="test-timeline">
      <h1>타임라인 테스트</h1>
      
      <div className="controls">
        <button onClick={handleZoomIn}>확대 (+)</button>
        <button onClick={handleZoomOut}>축소 (-)</button>
        <span>스케일: {scale.toFixed(0)}px/초</span>
      </div>
      
      <div className="timeline-container" ref={containerRef}>
        <Timeline 
          tracks={tracks} 
          scale={scale} 
          currentTime={currentTime}
          onClipMove={handleClipMove}
          onTrackAdd={handleAddTrack}
          onTrackRemove={handleRemoveTrack}
        />
      </div>
      
      <div className="current-state">
        <h3>현재 상태:</h3>
        <pre>
          {JSON.stringify(tracks, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TestTimeline;
