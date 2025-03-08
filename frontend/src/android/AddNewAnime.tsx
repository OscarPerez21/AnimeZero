import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from '../components/SearchBar';

type FormData = {
  title: string;
  description: string;
  chapters: number;
  poster: string;
  folder_url: string;
}

const AddNewAnime: React.FC = () => {

  const navigate= useNavigate();

  const updateStates= (state: number) =>{
    if (state===0){ return <p></p>}
    if (state===1){ return <p className='text-[#4d98d3]'>Subiendo anime...</p>}
    if (state===2){ return <p className='text-[#00ff00]'>Anime subido correctamente</p>}
    if (state===3){ return <p className='text-[#e06969]'>Error al subir</p>}
  }
  const [submitState, setSubmitState]= useState(updateStates(0));
  const [postState, setPostState]= useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const fetchData= async () => {
      try{
        await axios.post<FormData[]>('http://192.168.50.129:3000/addNewAnime', data);
        setSubmitState(updateStates(2));
        setPostState(false);
        reset();
      }
      catch (error){
        console.error('Error al subir el anime:', error);
        setSubmitState(updateStates(3))
      }
      finally{
        setPostState(true);
      }
    }
    
    fetchData();
    if(postState){ setSubmitState(updateStates(0)); }
  };

  const cancel= () =>{
    navigate('/');
  }

  return (
    <div className="bg-[#001418] w-[100%] h-[100%] flex flex-col">
        <div className="flex flex-col w-full h-[94px]">
          <div className="w-[100%] h-[16%]"></div>
          <SearchBar activeSubmitAnime={false} activeSearchInput={false}/>
        </div>
        <p className='text-center text-[#bd3831] text-[20px] mt-[5px]'>
          Esta funcionalidad por el momento se recomienda que sea utilizada solo por el administrador
        </p>

        <div className='flex-grow flex items-center justify-center ft-raleway-regular'>
            <div className='glass-morphism w-[35%] h-[90%] rounded-[10px] flex flex-col'>
                <p className='text-white text-center mt-[5%] text-[30px]'>Añadir anime</p>
                <form onSubmit={handleSubmit(onSubmit)} className='flex-grow container flex-col'>

                    <div className='flex w-[80%]'>
                      <input {...register("title")}
                      className="border border-white w-[65%] h-[35px] rounded-[5px] mt-[10px] mb-[10px] text-white pl-[10px]"
                      placeholder='Titulo'/>

                      <input {...register("chapters")}
                      className="border border-white w-[30%] h-[35px] rounded-[5px] ml-[20px] mt-[10px] mb-[10px] text-white pl-[10px]"
                      placeholder='capítulos'/>
                    </div>

                    <textarea {...register("description")}
                    className="border border-white w-[80%] h-[150px] resize-none rounded-[5px] mt-[10px] mb-[10px] text-white pl-[10px]"
                    placeholder='Descripción'></textarea>

                    <input {...register("poster")}
                    className="border border-white w-[80%] h-[35px] rounded-[5px] mt-[10px] mb-[10px] text-white pl-[10px]"
                    placeholder='nombre del poster'/>

                    <input {...register("folder_url")}
                    className="border border-white w-[80%] h-[35px] rounded-[5px] mt-[10px] mb-[10px] text-white pl-[10px]"
                    placeholder='url del folder'/>

                    <div className='container w-[80%]'>
                      <button 
                      className='border border-white rounded-[5px] w-[105px] h-[35px] text-white btn-default'>
                        Añadir
                      </button>

                      <button 
                      className='border border-white rounded-[5px] w-[105px] h-[35px] text-white btn-default'
                      type='button'
                      onClick={()=> cancel()}>
                        Cancelar
                      </button>
                    </div>

                    {submitState}

                </form>
            </div>
        </div>
    </div>
  );
};

export default AddNewAnime;