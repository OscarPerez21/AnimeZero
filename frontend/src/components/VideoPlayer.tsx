import React, { useState, useEffect, useRef } from "react";

// Definir los tipos de las props para el componente
interface VideoPlayerProps {
  src: string;
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, videoId }) => {
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  // const [progress, setProgress] = useState<number>(0);

  // // Recupera el progreso guardado en localStorage cuando el componente se monta.
  // useEffect(() => {
  //   const savedProgress = localStorage.getItem(`video-${videoId}-progress`);
  //   if (savedProgress) {
  //     setProgress(parseFloat(savedProgress));
  //   }
  // }, [videoId]);

  // // Guarda el progreso cuando el video se pausa.
  // const handlePause = () => {
  //   if (videoRef.current) {
  //     const currentTime = videoRef.current.currentTime;
  //     setProgress(currentTime);
  //     localStorage.setItem(`video-${videoId}-progress`, currentTime.toString());
  //   }
  // };

  // // Resetea el progreso cuando el video se reinicia o se cambia.
  // const handleVideoEnd = () => {
  //   localStorage.removeItem(`video-${videoId}-progress`);
  // };

  // // Resetea el progreso si el video empieza a reproducirse nuevamente.
  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = progress;
  //   }
  // }, [progress]);

  return (
    <div>
      <video
        // ref={videoRef}
        controls
        // onPause={handlePause}
        // onEnded={handleVideoEnd}
        src={src}
        className="object-cover"
      >
        Tu navegador no soporta el video.
      </video>
    </div>
  );
};

export default VideoPlayer;