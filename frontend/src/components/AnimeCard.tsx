import React from 'react';
import PlayIcon from '../assets/icons/play-icon.svg'

interface AnimeCardProps {
  title: string;
  episodes: number | null;
  imageUrl: string | null;
  fn: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ title, episodes, imageUrl, fn }) => {

  return (
    <div className="relative w-[39vh] h-[28vw] rounded-2xl overflow-hidden group ml-[2.5%] mr-[2.5%] mb-[2.5%]" onClick={() => fn()}>
      {/* Card Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(public/images/${imageUrl})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {/* Episodes Badge */}
        <div className="flex items-center gap-1 mb-2 text-sm opacity-80">
            <img src={PlayIcon} alt="play-icon" />
            <span>{episodes} Episodios</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg ft-raleway-light leading-tight">{title}</h3>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default AnimeCard;