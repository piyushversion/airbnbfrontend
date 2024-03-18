import { useContext, useState } from "react";
import Navbar from "./Navbar";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Spinner from "./Spinner";
import Footer from "./Footer";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

function SignUpPage(){

    const navigate = useNavigate();
    const{loading,setLoading} = useContext(AppContext);

    const[formData,setFormData] = useState({username:"",email:"",password:""})

    function changehandler(event){

        setFormData((previousformdata)=>{

            return{

                ...previousformdata,[event.target.name]:event.target.value
            }
        })
    }

    async function submitHandler(event){

        setLoading(true)
        event.preventDefault();

        const formresponse = await fetch("https://airbnbbackend1.onrender.com/register",{

            method:"POST",
            headers:{

                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData)
        })

        const jsonresponse = await formresponse.json()
        
        setLoading(false)

        if(jsonresponse.success){

            toast.success('Signed Up Successfully', {
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


              navigate("/")
        }
        else{

            if(`${jsonresponse.note}` === "partially"){

                toast.error(`${jsonresponse.message}`, {
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

            }
            else{

                toast.error(`Something went wrong`, {
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

                console.log(jsonresponse.message)
            }
        }
    }

    console.log(formData);

    return(

        <div>
            <Navbar></Navbar>
            {

            loading ? <Spinner></Spinner> : 
                <div className="flex flex-col-reverse gap-5 items-center mx-8 mb-12 mt-24 border rounded-2xl shadow-[0px_10px_15px_0px_rgb(0,0,0,0.2)] px-4 py-8 min-[1050px]:px-20 min-[1050px]:py-8 min-[950px]:flex-row min-[950px]:gap-0 min-[570px]:mx-20 min-[570px]:mb-12 min-[400px]:px-8">

                    <div className="flex flex-col justify-between w-full text-center min-[950px]:text-justify">
                        
                        <form method="POST" onSubmit={submitHandler}>
                            
                            <div className="flex justify-center items-center gap-1.5 mb-3 min-[950px]:justify-start">
                                <FaUser size={25} color="gray"></FaUser>
                                <input type="text" autoComplete="off" required name="username" placeholder="Your Username" className="border-2 text-gray-500 outline-0 font-fredoka rounded px-2.5 py-1.5 bg-white w-[70%] duration-200 focus:border-2 focus:border-[#7c3aed]" onChange={changehandler}></input>
                            </div>
                            
                            <div className="flex justify-center items-center gap-1.5 mb-3 min-[950px]:justify-start">
                                <MdEmail size={25} color="gray"></MdEmail>
                                <input type="email" autoComplete="off" required name="email" placeholder="Your Email" className="border-2 text-gray-500 outline-0 font-fredoka rounded px-2.5 py-1.5 bg-white w-[70%] duration-200 focus:border-2 focus:border-[#7c3aed]" onChange={changehandler}></input>
                            </div>

                            <div className="flex justify-center items-center gap-1.5 mb-3 min-[950px]:justify-start">
                                <RiLockPasswordFill size={25} color="gray"></RiLockPasswordFill>
                                <input type="password" autoComplete="off" required name="password" placeholder="Your Password" className="border-2 text-gray-500 outline-0 font-fredoka rounded px-2.5 py-1.5 bg-white w-[70%] duration-200 focus:border-2 focus:border-[#7c3aed]" onChange={changehandler}></input>
                            </div>

                            <div className="font-fredoka mb-5">Already have an account? <span className="cursor-pointer underline" onClick={()=>navigate("/login")}>Log in</span></div>

                            {/* <input type="submit" value="SignUp" className="cursor-pointer font-fredoka text-white bg-[#3b71ca] px-8 py-2 "></input> */}

                            <button className="font-fredoka text-lg group relative inline-block overflow-hidden rounded border border-gray-100 bg-gray-200 px-12 py-2 font-medium text-slate-800 hover:text-violet-600 focus:outline-none focus:ring active:bg-indigo-600 active:text-white">
                                <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
                                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
	                            Sign up
                            </button>
                        </form>
                    </div>

                    <div>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"></img>
                    </div>
                </div>
            }  
            <Footer></Footer>
        </div>
    )
}

export default SignUpPage;