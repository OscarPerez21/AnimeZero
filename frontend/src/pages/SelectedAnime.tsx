import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import LeftBar from "../components/LeftBar";
import EpisodeCard from "../components/EpisodeCard";
import { AnimeData, FileResponse } from "../interfaces";

import "../styles/Glassmorphism.css";
import { JSX } from "react/jsx-runtime";

const SelectedAnime: React.FC = () => {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<JSX.Element[]>([]);
  const [loadingVideos, setLoadingVideos] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const dataString = localStorage.getItem("idanime");
      const data: number[] = dataString ? [parseInt(dataString)] : [0];

      try {
        const response = await axios.post<AnimeData[]>(
          "http://192.168.50.129:3000/animeSelected",
          data
        );
        setAnimes(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError("Error al cargar los animes");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getThumbnail = async (url: string[]): Promise<string[]> => {
    try {
      const response = await axios.post<FileResponse>(
        "http://192.168.50.129:3000/getThumbnails",
        url
      );
      return response.data.mediaFiles;
    } catch (error) {
      console.error("Error al obtener miniaturas:", error);
      return [];
    }
  };

  const getVideo = async (url: string[]): Promise<string[]> => {
    try {
      const response = await axios.post<FileResponse>(
        "http://192.168.50.129:3000/getVideos",
        url
      );
      return response.data.mediaFiles;
    } catch (error) {
      console.error("Error al obtener videos:", error);
      return [];
    }
  };

  useEffect(() => {
    if (animes.length > 0) {
      const loadVideos = async () => {
        setLoadingVideos(true);
        
        const videoUrl = animes[0].anime_chapters[0].video_url;
        const thumbnails = await getThumbnail([videoUrl]);
        const videos = await getVideo([videoUrl]);

        const iterations = animes[0].chapters || 0;
        localStorage.setItem("chapters", iterations.toString());

        const newEpisodes = Array.from({ length: iterations }, (_, i) => (
          <EpisodeCard key={i} episode={i + 1} thumbnail={thumbnails[i]}/>
        ));

        const episodesData = newEpisodes.map((_, i) => ( videos[i] ));

        localStorage.setItem("episodes", JSON.stringify(episodesData));
        setEpisodes(newEpisodes);
        setLoadingVideos(false);
      };
      
      loadVideos();
    }
  }, [animes]);

  const renderBody = (content: JSX.Element) => (
    <div className="bg-[#001418] w-[100%] h-[100%] flex justify-center">
      <div className="flex flex-col">
        <div className="w-[100%] h-[16%]"></div>
        <SearchBar activeSubmitAnime={false} activeSearchInput={false} />
        <div className="flex h-[83%]">
          <LeftBar />
        </div>
      </div>
      <div className="flex-grow ft-raleway-light flex flex-col items-center">{content}</div>
    </div>
  );

  if (loading) return renderBody(<div className="text-[30px] text-white mt-[200px]">Cargando capítulos...</div>);
  if (error) return renderBody(<div>{error}</div>);

  return (
    <div className="bg-[#001418] w-[100%] h-[100%] flex justify-center">
      <div className="flex flex-col">
        <div className="w-[100%] h-[16%]"></div>
        <SearchBar activeSubmitAnime={false} activeSearchInput={false} />
        <div className="flex h-[83%]">
          <LeftBar />
        </div>
      </div>
      <div className="flex-grow ft-raleway-light flex flex-col items-center">
        <div className="h-[100%] container flex-wrap overflow-auto scroll-hidden">
          <div className="w-[100%] h-[16%]"></div>
          <div
            className="relative h-[40%] w-[99%] rounded-[10px] mb-[30px] container flex-col"
            style={{
              backgroundImage: `url(public/images/${animes[0].poster})`,
              backgroundSize: "50% 500%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="rounded-[10px] absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/50" />
            <p className="z-1 ft-raleway-regular text-white text-[40px] text-center mb-[20px]">{animes[0].title}</p>
            <p className="z-1 ft-raleway-regular text-white text-[14px] mx-[15px]">{animes[0].description}</p>
          </div>
          {loadingVideos ? <div className="text-white">Cargando episodios...</div> : <div className="flex flex-wrap">{episodes}</div>}
        </div>
      </div>
    </div>
  );
};

export default SelectedAnime;