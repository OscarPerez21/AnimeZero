import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SearchBar from "./components/SearchBar";
import AnimeCard from "./components/AnimeCard";
import LeftBar from "./components/LeftBar";
import { Anime } from './interfaces'

import './styles/Glassmorphism.css'

const App: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate= useNavigate();

  const goToAnime= (idanime: number) => {
    localStorage.setItem('idanime', idanime.toString())
    navigate("/AnimeSelected")
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Anime[]>('http://192.168.50.129:3000/animes');
        setAnimes(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError("Error al cargar los animes");
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const animesCards= animes.map((anime, index) => (
    <AnimeCard key={index} title={anime.title} episodes={anime.chapters} imageUrl={anime.poster} fn={()=> goToAnime(anime.id_anime)}/>
  ));

  const body= (obj: any) => {
    return (
      <div className="bg-[#001418] w-[100%] h-[100%] flex flex-col justify-center">
        <SearchBar activeSubmitAnime={true} activeSearchInput={false}/>
        <div className="w-f[250px] h-[15%]"></div>
        <div className="flex h-[83%]">
          <div><LeftBar /></div>
          <div className="w-[100%] ft-raleway-light overflow-auto scroll-hidden">
            <p className="text-white text-[25px] mt-[10px] ml-[30px]">Catálogo</p>
            <div className="flex flex-wrap mt-[30px]">
              {obj}
            </div>
          </div>

        </div>
      </div>
    )
  }

  if(loading){ return body(<div className="text-[30px] container text-white">Cargando animes...</div>) }
  if(!loading){ return body(animesCards)}
  if(error){ return body(<div>{error}</div>)}

};

export default App;
