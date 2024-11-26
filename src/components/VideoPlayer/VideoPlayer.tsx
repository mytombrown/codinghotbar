import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  onMarkIn?: (time: number) => void;
  onMarkOut?: (time: number) => void;
}

const VideoPlayer = ({ src, onMarkIn, onMarkOut }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-menu-darker rounded-lg p-4 space-y-4">
      <video
        ref={videoRef}
        className="w-full rounded-lg"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={src} type="video/mp4" />
      </video>
      
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={handleSeek}
          className="w-full"
        />
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">{formatTime(currentTime)}</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMarkIn?.(currentTime)}
              className="text-white hover:bg-menu-highlight"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-menu-highlight"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMarkOut?.(currentTime)}
              className="text-white hover:bg-menu-highlight"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-white">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;