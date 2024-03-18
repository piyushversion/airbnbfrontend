import { useContext } from "react";
import { SiAirbnb } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {toast} from "react-hot-toast";
import{useState} from "react";

function Navbar(){

    const navigate = useNavigate();

    const[hamBurger,setHamBurger] = useState(false);

    hamBurger ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset'

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

        setHamBurger(!hamBurger);
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

        setHamBurger(!hamBurger);
    }

    function signuphandler(){

        navigate("/signup")
        setHamBurger(!hamBurger);

    }

    function loginhandler(){

        navigate("/login")
        setHamBurger(!hamBurger);

    }

    return(

    <>
        <div className="flex justify-between border-b border-[#dee2e6] px-7 py-3 fixed top-0 right-0 left-0 bg-white z-10">

            <div className="flex items-center cursor-pointer gap-[5px] -z-20" onClick={()=>{navigate("/")}}>
                <SiAirbnb color="#fe424d" size={35}></SiAirbnb>
                <p className="text-[#fe424d] font-medium text-[28px] font-fredoka">airbnb</p>
            </div>


            <div className="flex relative">

                <button className="inline h-12 w-16 z-30 rounded-lg border-2 border-white min-[600px]:hidden" onClick={()=>setHamBurger(!hamBurger)}>
                    <div className="grid justify-items-center gap-1.5">

                        <span className={`h-1 w-8 rounded-full bg-black transition ${hamBurger ? "rotate-45 translate-y-2.5":"rotate-0 translate-y-0"}`}></span>

                        <span className={`h-1 w-8 rounded-full bg-black ${hamBurger ? "scale-x-0":"scale-x-100"} transition`}></span>

                        <span className={`h-1 w-8 rounded-full bg-black transition ${hamBurger ? "-rotate-45 -translate-y-2.5":"-rotate-0 -translate-y-0"}`}></span>

                    </div>
                </button>

                <div className={`block min-[600px]:hidden ${hamBurger ? "block absolute -z-10 bg-white text-black top-[-12px] right-[-28px] h-screen w-screen" :"hidden"}`}>

                    {   

                        login ? <div className="h-full flex flex-col items-center justify-center"><button className="font-medium font-fredoka text-[30px] transition-all duration-200 hover:text-gray-500" onClick={handle}>Airbnb your home</button><button className="font-medium font-fredoka text-[30px] transition-all duration-200 hover:text-gray-500" onClick={logouthandler}>Log out</button></div> : <div className="flex gap-[12px] flex-col h-full justify-center"><button className="font-medium font-fredoka text-[30px] transition-all duration-200 hover:text-gray-500" onClick={signuphandler}>Sign up</button>
                        <button className="font-medium font-fredoka text-[30px] transition-all duration-200 hover:text-gray-500 " onClick={loginhandler}>Log in</button></div>
                    }   

                </div>

                <div className="hidden items-center gap-4 text-[16px] min-[600px]:flex">
                
                    <p className="cursor-pointer font-fredoka font-normal text-[18px] transition-all duration-200 hover:text-[#fe424d]" onClick={handle}>Airbnb your home</p>

                    {   

                        login ? <div><button className="font-medium font-fredoka text-[18px] transition-all duration-200 hover:text-gray-500" onClick={logouthandler}>Log out</button></div> : <div className="flex gap-[12px]"><button className="font-medium font-fredoka text-[18px] transition-all duration-200 hover:text-gray-500" onClick={()=>navigate("/signup")}>Sign up</button>
                        <button className="font-medium font-fredoka text-[18px] transition-all duration-200 hover:text-gray-500 " onClick={()=>navigate("/login")}>Log in</button></div>
                    }

                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar;