import { useContext, useEffect, useState} from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "./Navbar";
import { FaBed } from "react-icons/fa6";
import { ImEarth } from "react-icons/im";
import { FaHouse } from "react-icons/fa6";
import { MdBungalow } from "react-icons/md";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { FaSailboat } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";
import { GiIsland } from "react-icons/gi";
import { GiFarmer } from "react-icons/gi";
import { GiTreehouse } from "react-icons/gi";
import { FaUmbrellaBeach } from "react-icons/fa";
import Card from "../components/Card";
import Spinner from "./Spinner";
import ToggleSwitch from "./ToggleSwitch";
import Footer from "./Footer";

function HomePage(){

    const[color,setColor] = useState("all")

    const{fetchalllisting,alllisting,fetchspecifiedlisting,loading,setLoading} = useContext(AppContext);
    
    function filter(tagg){

        setColor(tagg);

        if(tagg === "all"){

            fetchalllisting();
        }
        else{   

            
            fetchspecifiedlisting(tagg);
        }

    }

    
    useEffect(()=>{

        fetchalllisting();
    },[])

    return(

        <div>
            <Navbar></Navbar>
            <div className="flex justify-center gap-7 mt-24 flex-wrap mx-6">

                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("all")}>
                    <span className={color === "all" ? "text-[#fe4f4d]" : ""}><ImEarth></ImEarth></span>
                    <span className={color==="all" ? "text-[#fe4f4d]" : "text-gray-600"}>All</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("room")}>
                    <span className={color === "room" ? "text-[#fe4f4d]" : ""}><FaBed></FaBed></span>
                    <span className={color === "room"?"text-[#fe4f4d]":"text-gray-600"}>Rooms</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("house")}>
                    <span className={color === "house" ? "text-[#fe4f4d]" : ""}><FaHouse></FaHouse></span>
                    <span className={color === "house" ? "text-[#fe4f4d]" : "text-gray-600"}>Houses</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("bungalow")}>
                    <span className={color === "bungalow" ? "text-[#fe4f4d]" : ""}><MdBungalow></MdBungalow></span>
                    <span className={color === "bungalow" ? "text-[#fe4f4d]" : "text-gray-600"}>Bungalow</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("swimmingpool")}>
                    <span className={color === "swimmingpool" ? "text-[#fe4f4d]" : ""}><LiaSwimmingPoolSolid></LiaSwimmingPoolSolid></span>
                    <span className={color === "swimmingpool" ? "text-[#fe4f4d]" : "text-gray-600"}>Pools</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("boat")}>
                    <span className={color === "boat" ? "text-[#fe4f4d]" : ""}><FaSailboat></FaSailboat></span>
                    <span className={color === "boat" ? "text-[#fe4f4d]" : "text-gray-600"}>Boats</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("camping")}>
                    <span className={color === "camping" ? "text-[#fe4f4d]" : ""}><GiCampingTent></GiCampingTent></span>
                    <span className={color === "camping" ? "text-[#fe4f4d]" : "text-gray-600"}>Camping</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("island")}>
                    <span className={color === "island" ? "text-[#fe4f4d]" : ""}><GiIsland></GiIsland></span>
                    <span className={color === "island" ? "text-[#fe4f4d]" : "text-gray-600"}>Islands</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("farm")}>
                    <span className={color === "farm" ? "text-[#fe4f4d]" : ""}><GiFarmer></GiFarmer></span>
                    <span className={color === "farm" ? "text-[#fe4f4d]" : "text-gray-600"}>Farms</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("treehouse")}>
                    <span className={color === "treehouse" ? "text-[#fe4f4d]" : ""}><GiTreehouse></GiTreehouse></span>
                    <span className={color === "treehouse" ? "text-[#fe4f4d]" : "text-gray-600"}>Tree Houses</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer font-fredoka" onClick={()=>filter("beach")}>
                    <span className={color === "beach" ? "text-[#fe4f4d]" : ""}><FaUmbrellaBeach></FaUmbrellaBeach></span>
                    <span className={color === "beach" ? "text-[#fe4f4d]" : "text-gray-600"}>Beachs</span>
                </div>
            </div>

            <ToggleSwitch></ToggleSwitch>

            {
                loading ? <Spinner></Spinner> : 
                <div className="grid-cols-1 grid gap-x-8 gap-y-10 mx-8 my-10 min-[900px]:grid-cols-3 min-[750px]:grid-cols-2 min-[500px]:mx-20">
                    {
                        alllisting.length <= 0 ? <div className="font-fredoka">No post found</div> :
                        alllisting.map((list)=>{
                            
                            return <div> <Card list={list}></Card> </div>
                        })
                    }
                </div>
            }

            {
                loading ? <></> : <Footer></Footer>
            }
        </div>
    )
}

export default HomePage;