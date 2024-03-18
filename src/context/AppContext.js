
import{createContext} from "react";
import { useState } from "react";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export function AppContextProvider(props){

    const navigate = useNavigate();

    const[logindata,setLoginData] = useState();

    const[loading,setLoading] = useState(false);

    const[token,setToken] = useState(localStorage.getItem("token"));

    function setsessionStorage(token){

        localStorage.setItem("token",token);
        setToken(localStorage.getItem("token"));
    }

    function clearsessionStorage(){

        setToken(null);
        localStorage.clear();
    }

    let login = !! localStorage.getItem("token");
    console.log(login)
    console.log(localStorage.getItem("token"))


    const[alllisting,setAllListing] = useState([]);
    
    async function fetchalllisting(){

        setLoading(true);

        const response = await fetch(`https://airbnbbackend1.onrender.com/getalllisting`,{

            method:"GET",
            headers:{

                "Content-Type":"application/json"
            }
        })

        const jsonlisting = await response.json();
        console.log(jsonlisting.data);

        if(! jsonlisting.success){

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

            console.log(jsonlisting.message);
            setAllListing([]);
        }
        else{

            setAllListing(jsonlisting.data);
        }

        setLoading(false);

    }

    async function fetchspecifiedlisting(cat){

        setLoading(true)

        const response = await fetch(`https://airbnbbackend1.onrender.com/getspecifiedlistingcat/${cat}`,{

            method:"GET",
            headers:{

                "Content-Type":"application/json"
            }
        })

        const jsonslisting = await response.json();
        console.log(jsonslisting.data);

        if(! jsonslisting.success){

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

            console.log(jsonslisting.message);
            setAllListing([]);
        }
        else{

            setAllListing(jsonslisting.data);
        }

        setLoading(false)

    }

    const[show,setShow] = useState(false);

    const data = {

        fetchalllisting,
        login,
        setsessionStorage,
        clearsessionStorage,
        token,
        setToken,
        alllisting,
        setAllListing,
        fetchspecifiedlisting,
        loading,
        setLoading,
        logindata,
        setLoginData,
        show,
        setShow
    }
    
    return <AppContext.Provider value={data}>{props.children}</AppContext.Provider>
}