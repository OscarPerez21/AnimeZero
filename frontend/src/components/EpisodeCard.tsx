import { useNavigate } from "react-router-dom";

interface EpisodeCardProps {
  episode: number;
  thumbnail: string;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, thumbnail }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    localStorage.setItem("episode", episode.toString());
    navigate("/WatchEpisode");
  };

  return (
    <div
      className="relative w-[300px] h-[200px] rounded-2xl overflow-hidden group ml-[1%] mr-[1%] mb-[2%]"
      onClick={handlePlay}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnail})` }}
      />

      {/* Capa con el gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Contenido dentro de la tarjeta */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-raleway-light leading-tight">
          Episodio {episode}
        </h3>
      </div>

      {/* Efecto hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default EpisodeCard;