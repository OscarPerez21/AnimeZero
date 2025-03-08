import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react"; 
import { AnimeName } from "../interfaces";
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios";

const NombreComponente: React.FC = () => {

    const [animeName, setAnimeName] = useState<AnimeName[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [chapter, setChapter] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
        const dataString = localStorage.getItem("idanime")
        const data: number[] = dataString ? [parseInt(dataString)] : [0];
        setLoading(true);

        try {
            const response= await axios.post<AnimeName[]>('http://192.168.50.129:3000/AnimeName', data);
            setAnimeName(response.data);
            setChapter(Number(localStorage.getItem("episode")));
          } catch (error) {
            console.error('Error al obtener datos:', error);
          } finally{
            setLoading(false);
          }
    };
    
    fetchData();
    }, []);

    const totalCapitulos: number= Number(localStorage.getItem("chapters"));

    const storedEpisodes = localStorage.getItem("episodes");
    const episodesData = storedEpisodes ? JSON.parse(storedEpisodes) : [];

    const next= () =>{ setChapter(chapter + 1); }
    const previous= () =>{ setChapter(chapter - 1); }

  return (
    <div className="bg-[#001418] w-[100%] h-[100%] flex flex-col items-center">
        <div className="flex flex-col w-full h-[94px]">
          <div className="w-[100%] h-[16%]"></div>
          <SearchBar activeSubmitAnime={false} activeSearchInput={false}/>
        </div>

        <div className="flex flex-col w-[95%] overflow-auto scroll-hidden">
            {loading? <p className="text-white text-[30px] leading-none mt-[60px]">Cargando...</p>
            : <p className="text-white text-[30px] leading-none pt-[30px]">{animeName[0].title}</p>}

            <p className="text-white text-[20px]">Episodio {chapter}</p>
            <div className='flex-grow flex ft-raleway-regular'>
                <div className='glass-morphism w-[60%] rounded-[10px] flex flex-col overflow-hidden'>
                    <VideoPlayer src={episodesData[chapter-1]} videoId="aaa"/>
                </div>
                <div className='glass-morphism w-[35%] h-[100%] rounded-[10px] flex flex-col ml-[60px]'></div>
            </div>
            <div className="flex">
                <button className="border border-white w-[40px] h-[40px] rounded-[5px] mt-3 mr-3"></button>
                
                {chapter===1?
                null: <button className="border border-white w-[160px] h-[40px] rounded-[5px] mt-3 mr-3 text-white" onClick={previous}> Anterior </button>}
                
                {chapter===totalCapitulos?
                null: <button className="border border-white w-[160px] h-[40px] rounded-[5px] mt-3 text-white" onClick={next}> Siguiente </button>}
            
            </div>
        </div>
    </div>
  );
};

export default NombreComponente;