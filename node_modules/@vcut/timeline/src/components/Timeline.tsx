import React from "react";
import { Track as TrackComponent } from "./Track";
import { Track } from "../types";

interface TimelineProps {
  tracks: Track[];
  scale: number;
  currentTime: number;
  onClipMove: (clipId: string, trackId: string, newStartTime: number) => void;
  onTrackAdd?: () => void;
  onTrackRemove?: (trackId: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  tracks,
  scale,
  currentTime,
  onClipMove,
  onTrackAdd,
  onTrackRemove
}) => {
  // Calculate max time based on clips
  const maxTime = Math.max(
    30, // Minimum timeline length (30 seconds)
    ...tracks.flatMap(track => 
      track.clips.map(clip => clip.startTime + clip.duration)
    )
  );

  // Generate time markers
  const timeMarkers = [];
  for (let i = 0; i <= maxTime; i++) {
    if (i % 1 === 0) { // Show marker every second
      timeMarkers.push(
        <div 
          key={`marker-${i}`}
          style={{
            position: "absolute",
            left: `${i * scale}px`,
            top: 0,
            height: "100%",
            borderLeft: i % 5 === 0 ? "1px solid #aaa" : "1px solid #ddd",
            zIndex: 1,
            pointerEvents: "none"
          }}
        />
      );
    }
  }

  // Generate second labels
  const secondLabels = [];
  for (let i = 0; i <= maxTime; i++) {
    if (i % 1 === 0) { // Show label every second
      secondLabels.push(
        <div 
          key={`label-${i}`}
          style={{
            position: "absolute",
            left: `${i * scale}px`,
            top: 0,
            fontSize: "12px",
            color: "#666",
            transform: "translateX(-50%)",
            userSelect: "none"
          }}
        >
          {i}s
        </div>
      );
    }
  }

  return (
    <div className="timeline" style={{ position: "relative", width: "100%" }}>
      {/* Time ruler */}
      <div 
        style={{ 
          height: "20px", 
          position: "relative", 
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ddd",
          marginLeft: "80px",  // Space for track labels
          width: `${maxTime * scale}px`,
          overflow: "hidden"
        }}
      >
        {secondLabels}
      </div>
      
      {/* Track header */}
      <div style={{ 
        width: "80px", 
        position: "absolute", 
        top: 0, 
        left: 0, 
        height: "20px",
        backgroundColor: "#e0e0e0",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "bold",
        borderRight: "1px solid #ccc"
      }}>
        Track
      </div>
      
      {/* Tracks container */}
      <div style={{ 
        position: "relative", 
        marginLeft: "80px",
        width: `${maxTime * scale}px`
      }}>
        {timeMarkers}
        
        {/* Render tracks */}
        {tracks.map(track => (
          <TrackComponent 
            key={track.id} 
            track={track} 
            scale={scale}
            onClipMove={onClipMove}
            onRemove={onTrackRemove}
          />
        ))}
      </div>
      
      {/* Track labels container (fixed width) */}
      <div style={{ position: "absolute", top: "20px", left: 0, width: "80px" }}>
        {tracks.map(track => (
          <div 
            key={`label-${track.id}`}
            style={{
              height: "60px",
              backgroundColor: "#f0f0f0",
              borderBottom: "1px solid #ddd",
              padding: "0 8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "12px",
              borderRight: "1px solid #ccc",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            <div style={{ fontWeight: "bold" }}>{track.name}</div>
            <div style={{ fontSize: "10px", color: "#666" }}>{track.type}</div>
          </div>
        ))}
      </div>
      
      {/* Add track button */}
      <div style={{ 
        height: "40px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
        border: "1px dashed #ccc",
        borderRadius: "4px",
        margin: "4px 0",
        marginLeft: "80px",
        color: "#666",
        fontSize: "14px",
        userSelect: "none",
        width: `${maxTime * scale}px`
      }} onClick={onTrackAdd}>
        Add Track
      </div>
      
      {/* Time cursor */}
      <div style={{
        position: "absolute",
        left: `${currentTime * scale + 80}px`, // 80px offset for track labels
        top: 0,
        width: "2px",
        height: `${tracks.length * 60 + 60}px`, // +60 for header and add track button
        backgroundColor: "red",
        zIndex: 100,
        pointerEvents: "none"
      }} />
    </div>
  );
};
