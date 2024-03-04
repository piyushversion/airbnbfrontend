import { useContext, useEffect} from "react";
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

function HomePage(){

    const{fetchalllisting,alllisting,fetchspecifiedlisting,loading,setLoading} = useContext(AppContext);
    
    function filter(tagg){

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
            <div className="flex justify-center gap-6">

                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("all")}>
                    <span><ImEarth></ImEarth></span>
                    <span className="font-fredoka">All</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("room")}>
                    <span><FaBed></FaBed></span>
                    <span className="font-fredoka">Rooms</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("house")}>
                    <span><FaHouse></FaHouse></span>
                    <span className="font-fredoka">Houses</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("bungalow")}>
                    <span><MdBungalow></MdBungalow></span>
                    <span className="font-fredoka">Bungalow</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("swimmingpool")}>
                    <span><LiaSwimmingPoolSolid></LiaSwimmingPoolSolid></span>
                    <span className="font-fredoka">Pools</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("boat")}>
                    <span><FaSailboat></FaSailboat></span>
                    <span className="font-fredoka">Boats</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("camping")}>
                    <span><GiCampingTent></GiCampingTent></span>
                    <span className="font-fredoka">Camping</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("island")}>
                    <span><GiIsland></GiIsland></span>
                    <span className="font-fredoka">Islands</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("farm")}>
                    <span><GiFarmer></GiFarmer></span>
                    <span className="font-fredoka">Farms</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("treehouse")}>
                    <span><GiTreehouse></GiTreehouse></span>
                    <span className="font-fredoka">Tree Houses</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={()=>filter("beach")}>
                    <span><FaUmbrellaBeach></FaUmbrellaBeach></span>
                    <span className="font-fredoka">Beachs</span>
                </div>
            </div>

            <ToggleSwitch></ToggleSwitch>

            {
                loading ? <Spinner></Spinner> : 
                <div>
                    {
                        alllisting.length <= 0 ? <div>No post found</div> :
                        alllisting.map((list)=>{
                            
                            return <Card list={list}></Card>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default HomePage;