import React from 'react';
import Upload from '../assets/icons/upload.svg'
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  activeSubmitAnime: boolean;
  activeSearchInput: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({activeSubmitAnime, activeSearchInput}) => {

  const navigate= useNavigate();

  const goToAddAnime= () => {
    navigate('/AddAnime');
  }

  return (
    <div className='z-2 border border-white w-[100%] h-[15%] flex glass-morphism fixed top-0 left-0'>
        <div className='w-auto h-[100%] container'>
            <p className='text-white text-[5vh] pl-[30px]'>Anime<span className='text-[#80bcc8]'>Zero</span></p>
        </div>

        <div className='w-[35%] h-[100%] ml-[25%] container'>

          { activeSubmitAnime? 
            <button 
            className='border border-white rounded-[5px] h-[40px] mr-[30px] btn-default container'
            onClick={()=> goToAddAnime()}>
              <img src={Upload} alt="Upload" className='w-[30px] h-[30px] mr-[10px]'/>
              <p>Añadir Anime</p>
            </button> : null
          }

          { activeSearchInput?
          <input type="text" name="" id="" placeholder='Buscar Anime' className='border border-white rounded-[50px] h-[40px] text-white pl-[15px]'/>
          : null}
        </div>
    </div>
  );
};

export default SearchBar;