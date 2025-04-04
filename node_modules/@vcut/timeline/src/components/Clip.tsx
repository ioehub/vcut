import React, { useState, useRef } from "react";
import { Clip as ClipType } from "../types";

interface ClipProps {
  clip: ClipType;
  scale: number;
  trackId: string;
  onMove: (clipId: string, trackId: string, newStartTime: number) => void;
}

export const Clip: React.FC<ClipProps> = ({ clip, scale, trackId, onMove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDragX, setStartDragX] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const clipRef = useRef<HTMLDivElement>(null);

  // Calculate clip color based on type
  const getClipColor = () => {
    switch (clip.type) {
      case "video":
        return "#1890ff"; // Blue
      case "audio":
        return "#52c41a"; // Green
      case "subtitle":
        return "#faad14"; // Yellow/Orange
      default:
        return "#6c757d"; // Gray
    }
  };

  // Handle mouse down event (start dragging)
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartDragX(e.clientX);
    setStartPosition(clip.startTime);
    
    // Add event listeners for mouse move and up
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle mouse move event (during dragging)
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startDragX;
    const newPosition = Math.max(0, startPosition + (deltaX / scale));
    
    // Move the clip visually during drag
    if (clipRef.current) {
      clipRef.current.style.left = `${newPosition * scale}px`;
    }
  };

  // Handle mouse up event (end dragging)
  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startDragX;
    const newPosition = Math.max(0, startPosition + (deltaX / scale));
    
    // Update the clip position
    onMove(clip.id, trackId, newPosition);
    
    // Reset dragging state
    setIsDragging(false);
    
    // Remove event listeners
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Handle touch events for mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartDragX(e.touches[0].clientX);
    setStartPosition(clip.startTime);
    
    // Add event listeners for touch move and end
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startDragX;
    const newPosition = Math.max(0, startPosition + (deltaX / scale));
    
    // Move the clip visually during drag
    if (clipRef.current) {
      clipRef.current.style.left = `${newPosition * scale}px`;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.changedTouches[0].clientX - startDragX;
    const newPosition = Math.max(0, startPosition + (deltaX / scale));
    
    // Update the clip position
    onMove(clip.id, trackId, newPosition);
    
    // Reset dragging state
    setIsDragging(false);
    
    // Remove event listeners
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div
      ref={clipRef}
      className="timeline-clip"
      style={{
        left: `${clip.startTime * scale}px`,
        width: `${clip.duration * scale}px`,
        backgroundColor: getClipColor(),
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isDragging ? 100 : 10,
        opacity: isDragging ? 0.8 : 1,
        transition: isDragging ? "none" : "opacity 0.2s",
        fontSize: `${Math.min(14, Math.max(10, clip.duration * scale / 10))}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div style={{ padding: "0 8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {clip.name}
      </div>
      <div style={{ fontSize: "10px", position: "absolute", bottom: "2px", right: "4px" }}>
        {clip.duration.toFixed(1)}s
      </div>
    </div>
  );
};
