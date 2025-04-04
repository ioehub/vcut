import React from "react";
import { Clip as ClipComponent } from "./Clip";
import { Track as TrackType } from "../types";

interface TrackProps {
  track: TrackType;
  scale: number;
  onClipMove: (clipId: string, trackId: string, newStartTime: number) => void;
  onRemove?: (trackId: string) => void;
}

export const Track: React.FC<TrackProps> = ({ track, scale, onClipMove, onRemove }) => {
  // Track color based on type
  const getTrackColor = () => {
    switch (track.type) {
      case "video":
        return "#e6f7ff"; // Light blue
      case "audio":
        return "#f6ffed"; // Light green
      case "subtitle":
        return "#fff7e6"; // Light yellow
      default:
        return "#f0f0f0"; // Light gray
    }
  };

  return (
    <div 
      className="timeline-track"
      style={{ 
        height: "60px",
        position: "relative",
        backgroundColor: getTrackColor(),
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Track Remove Button */}
      {onRemove && (
        <div
          style={{
            position: "absolute",
            right: "6px",
            top: "6px",
            width: "16px",
            height: "16px",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            color: "#f00",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            cursor: "pointer",
            zIndex: 10,
            opacity: 0.5,
          }}
          onClick={() => onRemove(track.id)}
          onMouseOver={(e) => e.currentTarget.style.opacity = "1"}
          onMouseOut={(e) => e.currentTarget.style.opacity = "0.5"}
        >
          
        </div>
      )}
      
      {/* Render clips */}
      {track.clips.map(clip => (
        <ClipComponent 
          key={clip.id} 
          clip={clip} 
          scale={scale}
          trackId={track.id}
          onMove={onClipMove}
        />
      ))}
    </div>
  );
};
