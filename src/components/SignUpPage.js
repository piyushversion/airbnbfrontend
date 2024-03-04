import { useContext, useState } from "react";
import Navbar from "./Navbar";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Spinner from "./Spinner";

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

        const formresponse = await fetch("https://airbnbbackend-2.onrender.com/register",{

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
                <div>
                    <form method="POST" onSubmit={submitHandler}>
                        
                        <label htmlFor="username">Username : </label>
                        <input type="text" name="username" className="border-2 outline-0" onChange={changehandler}></input>

                        <label htmlFor="email">Email : </label>
                        <input type="text" name="email" className="border-2 outline-0" onChange={changehandler}></input>

                        <label htmlFor="password">Password : </label>
                        <input type="password" name="password" className="border-2 outline-0" onChange={changehandler}></input>

                        <input type="submit" value="SignUp" className="cursor-pointer"></input>
                    </form>
                </div>
            }  
        </div>
    )
}

export default SignUpPage;