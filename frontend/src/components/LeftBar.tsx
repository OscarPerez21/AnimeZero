import { useState } from "react";

import CategoryButton from "./CategoryButton";

import Contract from '../assets/icons/contract.svg'
import Expand from '../assets/icons/expand.svg'


interface LeftBarProps {
    
}

const LeftBar: React.FC<LeftBarProps> = () => {

    const [leftBarState, setLeftBarState] = useState<boolean>(false);
    const [leftBarIcon, setLeftBarIcon] = useState(Contract);
    const [leftBarSize, setLeftBarSize]= useState<number>(250);

    const categories: string[]= ["Todo", "Acción", "Aventura", "Drama", "Comedia"];

    const Categories = categories.map((category, index) => (
        <CategoryButton key={index} category={category} />
    ));

    const LeftBarState = () => {
        setLeftBarState(!leftBarState)
        if(!leftBarState){
            setLeftBarIcon(Expand)
            setLeftBarSize(40)
        } else {
            setLeftBarIcon(Contract)
            setLeftBarSize(250)
        }
    }

    return (
        <div style={{ width: leftBarSize }} className="w-[250px] h-[100%] bg-[#032128] tp-border rounded-[10px]">
            <div className="container w-full h-[30px] mt-[10px] mb-[10px]">
                <p
                style={{ display: leftBarState? 'none' : 'block'}}
                className="text-white text-[25px] mt-[20px] ml-[20px] mr-[25%] ft-raleway-light mb-[25px]">Categorías</p>
                <button className="text-white w-[30px] h-[30px] rounded-[5px] bg-[#06282f] transition duration-300 ease-in-out hover:bg-[#0a333b] active:bg-[#12434d]" onClick={()=> LeftBarState()}>
                    <img src={leftBarIcon} alt="" />
                </button>
            </div>
            <div style={{ display: leftBarState? 'none' : 'block'}}>
                {Categories}
            </div>
        </div>
    );
};

export default LeftBar;