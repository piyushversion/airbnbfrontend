import { useContext } from "react";
import { SiAirbnb } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {toast} from "react-hot-toast";

function Navbar(){

    const navigate = useNavigate();

    const{clearsessionStorage,login} = useContext(AppContext);

    function logouthandler(){

        clearsessionStorage();
        toast.success(`Logged out successfully`, {
            style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
            },
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
            duration:2000
        });

        navigate("/login")
    }

    function handle(){

        if(login){

            navigate("/createnewlisting")
        }
        else{

            toast.error('Login to create listing', {
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
                duration:2000
            });
            
            navigate("/login")
        }
    }

    return(

        <div className="flex justify-between">

            <div className="flex items-center cursor-pointer gap-[5px]" onClick={()=>{navigate("/")}}>
                <SiAirbnb color="#fe424d" size={35}></SiAirbnb>
                <p className="text-[#fe424d] font-medium text-[28px] font-fredoka">airbnb</p>
            </div>
            <div className="flex items-center gap-4 text-[16px]">
                <p className="cursor-pointer font-fredoka font-normal text-[18px]" onClick={handle}>Airbnb your home</p>

                {   

                    login ? <div><button className="font-medium font-fredoka text-[18px]" onClick={logouthandler}>Log out</button></div> : <div><button className="font-medium font-fredoka text-[18px]" onClick={()=>navigate("/signup")}>Sign up</button>
                    <button className="font-medium font-fredoka text-[18px]" onClick={()=>navigate("/login")}>Log in</button></div>
                }

            </div>
        </div>
    )
}

export default Navbar;