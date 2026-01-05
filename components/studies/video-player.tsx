'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  src: string | string[];
  poster?: string;
  title?: string;
  className?: string;
}

/**
 * Enterprise-quality video player with full controls
 * Supports multiple video formats (mov, mp4, webm, ogv, etc.)
 */
export function VideoPlayer({ src, poster, title, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const sourcesLoadedRef = useRef<string>('');

  // Normalize src to array format
  const videoSources = Array.isArray(src) ? src : [src];
  
  // Log for debugging and verify sources
  useEffect(() => {
    console.log('VideoPlayer: Initializing with sources:', videoSources);
    // Check if sources are valid URLs or paths
    videoSources.forEach((source, index) => {
      console.log(`VideoPlayer: Source ${index}:`, source);
      // Try to create a test image to verify path is accessible
      if (source.startsWith('/')) {
        const testImg = new Image();
        testImg.onload = () => console.log(`VideoPlayer: Source ${index} path is accessible`);
        testImg.onerror = () => console.warn(`VideoPlayer: Source ${index} path may not be accessible:`, source);
        // This won't work for video, but helps verify the public path structure
      }
    });
  }, [videoSources.join(',')]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const togglePlay = async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        // Handle play() promise rejection (e.g., user interaction required, video loading)
        console.warn('Play failed:', error);
        setIsPlaying(false);
      }
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
      videoRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Update current time and handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      if (!isNaN(video.currentTime)) {
        setCurrentTime(video.currentTime);
      }
    };
    
    const updateDuration = () => {
      if (!isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
        setIsLoading(false);
      }
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
      setIsBuffering(false);
    };
    
    const handlePause = () => setIsPlaying(false);
    
    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };
    
    const handleLoadedData = () => {
      if (!isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
      }
      setIsLoading(false);
    };
    
    const handleLoadedMetadata = () => {
      console.log('VideoPlayer: loadedmetadata event. duration:', video.duration, 'readyState:', video.readyState);
      if (!isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
        setIsLoading(false);
      }
    };
    
    const handleCanPlay = () => {
      setIsLoading(false);
      setIsBuffering(false);
      if (!isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
      }
    };
    
    const handleCanPlayThrough = () => {
      setIsLoading(false);
      setIsBuffering(false);
    };
    
    const handleWaiting = () => {
      if (isPlaying) {
        setIsBuffering(true);
      }
    };
    
    const handlePlaying = () => {
      setIsBuffering(false);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    const handleError = (e: Event) => {
      setIsLoading(false);
      setIsBuffering(false);
      const videoError = (e.target as HTMLVideoElement)?.error;
      console.error('VideoPlayer: Error event', {
        error: videoError,
        code: videoError?.code,
        message: videoError?.message,
        networkState: video.networkState,
        readyState: video.readyState,
        src: video.currentSrc,
        sources: videoSources
      });
      
      if (videoError) {
        let errorMsg = 'Failed to load video';
        switch (videoError.code) {
          case videoError.MEDIA_ERR_ABORTED:
            errorMsg = 'Video loading aborted';
            break;
          case videoError.MEDIA_ERR_NETWORK:
            errorMsg = 'Network error while loading video. Check if the file exists and is accessible.';
            break;
          case videoError.MEDIA_ERR_DECODE:
            errorMsg = 'Video decoding error. The file may be corrupted or the format is not supported.';
            break;
          case videoError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMsg = 'Video format not supported. MOV files may not be supported in all browsers. Please convert to MP4 format.';
            break;
        }
        console.error('Video error:', errorMsg, videoError);
        setError(errorMsg);
      } else {
        console.error('Unknown video error:', e);
        setError('Unknown video error. Check browser console for details.');
      }
    };
    
    const handleStalled = () => {
      setIsBuffering(true);
    };
    
    const handleSuspend = () => {
      setIsLoading(false);
    };

    // Add all event listeners
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('suspend', handleSuspend);

    // Only load if sources have changed
    const currentSources = videoSources.join(',');
    const shouldLoad = sourcesLoadedRef.current !== currentSources;
    
    if (shouldLoad) {
      sourcesLoadedRef.current = currentSources;
      console.log('VideoPlayer: Loading new sources:', currentSources);
      setIsLoading(true);
      setError(null);
      // Always call load() when sources change to ensure video loads
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        if (videoRef.current) {
          console.log('VideoPlayer: Calling load() on video element');
          videoRef.current.load();
        }
      }, 100);
    } else if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      // Sources haven't changed, just update duration if available
      updateDuration();
    } else if (video.readyState === HTMLMediaElement.HAVE_NOTHING || video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
      // If sources haven't changed but video hasn't loaded, try loading
      console.log('VideoPlayer: Sources unchanged but video not loaded, forcing load. readyState:', video.readyState, 'networkState:', video.networkState);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 100);
    }
    
    // Also check duration after a short delay in case metadata loads asynchronously
    const checkDuration = setTimeout(() => {
      console.log('VideoPlayer: Checking duration after delay. readyState:', video.readyState, 'duration:', video.duration);
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA && !isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
        setIsLoading(false);
      } else if (video.readyState === HTMLMediaElement.HAVE_NOTHING) {
        // Video hasn't started loading, try loading again
        console.log('VideoPlayer: Video not loaded, retrying load()');
        video.load();
      }
    }, 1000);

    return () => {
      clearTimeout(checkDuration);
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('suspend', handleSuspend);
    };
  }, [videoSources.join(',')]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(true);
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', resetControlsTimeout);
    container.addEventListener('mouseleave', () => {
      if (isPlaying) setShowControls(false);
    });

    resetControlsTimeout();

    return () => {
      container.removeEventListener('mousemove', resetControlsTimeout);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      const video = videoRef.current;

      // Space bar: play/pause
      if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay().catch(console.error);
      }
      // Arrow left: rewind 10s
      else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 10);
      }
      // Arrow right: forward 10s
      else if (e.code === 'ArrowRight') {
        e.preventDefault();
        video.currentTime = Math.min(duration, video.currentTime + 10);
      }
      // Arrow up: increase volume
      else if (e.code === 'ArrowUp') {
        e.preventDefault();
        const newVolume = Math.min(1, volume + 0.1);
        video.volume = newVolume;
        setVolume(newVolume);
        if (isMuted) {
          setIsMuted(false);
          video.muted = false;
        }
      }
      // Arrow down: decrease volume
      else if (e.code === 'ArrowDown') {
        e.preventDefault();
        const newVolume = Math.max(0, volume - 0.1);
        video.volume = newVolume;
        setVolume(newVolume);
        if (newVolume === 0) {
          setIsMuted(true);
          video.muted = true;
        }
      }
      // M: mute/unmute
      else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      }
      // F: fullscreen
      else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, volume, isMuted, duration]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative group bg-black rounded-xl overflow-hidden border border-slate-800/50 ${className}`}
      onMouseEnter={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-auto"
        preload="auto"
        playsInline
        onLoadStart={() => console.log('VideoPlayer: onLoadStart')}
        onLoadedMetadata={() => console.log('VideoPlayer: onLoadedMetadata')}
        onCanPlay={() => console.log('VideoPlayer: onCanPlay')}
        onError={(e) => {
          console.log('VideoPlayer: onError on video element', e);
          const video = e.currentTarget as HTMLVideoElement;
          if (video.error) {
            console.error('Video error code:', video.error.code, 'message:', video.error.message);
          }
        }}
      >
        {videoSources.map((source, index) => {
          const extension = source.split('.').pop()?.toLowerCase();
          const type = extension === 'mov' ? 'video/quicktime' : 
                      extension === 'mp4' ? 'video/mp4' :
                      extension === 'webm' ? 'video/webm' :
                      extension === 'ogv' ? 'video/ogg' :
                      extension === 'avi' ? 'video/x-msvideo' :
                      extension === 'wmv' ? 'video/x-ms-wmv' :
                      extension === 'flv' ? 'video/x-flv' :
                      extension === 'mkv' ? 'video/x-matroska' :
                      'video/mp4';
          return (
            <source 
              key={`${source}-${index}`} 
              src={source} 
              type={type}
              onError={(e) => {
                console.error(`VideoPlayer: Source ${index} error:`, source, 'type:', type, e);
                // If this is the last source and it fails, show error
                if (index === videoSources.length - 1) {
                  setError(`Video format not supported. MOV files are not supported in Chrome/Edge. Please convert to MP4 format.`);
                  setIsLoading(false);
                }
              }}
            />
          );
        })}
        Your browser does not support the video tag.
      </video>

      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-6">
          <div className="text-red-400 text-lg font-semibold mb-2">Error Loading Video</div>
          <div className="text-slate-300 text-sm text-center">{error}</div>
          <button
            onClick={() => {
              setError(null);
              setIsLoading(true);
              if (videoRef.current) {
                videoRef.current.load();
              }
            }}
            className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
        </div>
      )}

      {/* Buffering indicator */}
      {isBuffering && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Center play button */}
        {!isPlaying && (
          <button
            onClick={() => togglePlay().catch(console.error)}
            className="absolute inset-0 flex items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Play"
          >
            <div className="bg-black/60 rounded-full p-6 backdrop-blur-sm">
              <Play className="h-16 w-16 text-white ml-1" fill="white" />
            </div>
          </button>
        )}

        {/* Bottom controls bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          {/* Progress bar */}
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="h-1.5 bg-slate-700/50 rounded-full cursor-pointer group/progress hover:h-2 transition-all"
          >
            <div
              className="h-full bg-cyan-400 rounded-full relative group-hover/progress:bg-cyan-300 transition-colors"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-cyan-400 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={() => togglePlay().catch(console.error)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" fill="white" />
                )}
              </button>

              {/* Volume control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Time display */}
              <div className="text-sm text-white font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5 text-white" />
              ) : (
                <Maximize className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Title overlay */}
      {title && (
        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-white text-lg font-semibold drop-shadow-lg">{title}</h3>
        </div>
      )}
    </div>
  );
}

