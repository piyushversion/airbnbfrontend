import { AppContext } from "../context/AppContext";
import Navbar from "./Navbar";
import {useContext,useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import{useNavigate} from "react-router-dom";
import Spinner from "./Spinner";
import Footer from "./Footer";

function CreateListing(){

    const{login,fetchalllisting,loading,setLoading} = useContext(AppContext);

    const navigate = useNavigate();

    const[title,setTitle] = useState();
    const[description,setDescription] = useState();
    const[file,setFile] = useState();
    const[tag,setTag] = useState();
    const[price,setPrice] = useState();
    const[country,setCountry] = useState();
    const[location,setLocation] = useState();

    function changehandler(event){

        if(event.target.type === "file"){

            setFile(event.target.files[0]);
        }
        else{

            if(event.target.name === "title"){

                setTitle(event.target.value)
             }
             else if(event.target.name === "description"){
    
                setDescription(event.target.value)
    
             }
             else if(event.target.name === "tag"){
    
                setTag(event.target.value)
    
             }
             else if(event.target.name === "price"){
    
                setPrice(event.target.value)
    
             }
             else if(event.target.name === "country"){
    
                setCountry(event.target.value)
    
             }
             else{
    
                setLocation(event.target.value)
    
             }
             
        }
    }

    async function submithandler(event){

        
        event.preventDefault();
        
        setLoading(true);

        const formData = new FormData();

        formData.append('title',title)
        formData.append('description',description)
        formData.append('tag',tag)
        formData.append('price',price)
        formData.append('country',country)
        formData.append('location',location)
        formData.append('file',file)

        try{

            const response = await fetch("https://airbnbbackend1.onrender.com/listing",{

                method:"POST",
                headers:{

                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                },
                body:formData
            })   

            const r = await response.json();

            setLoading(false)

            if(r.success){

                toast.success(`Listing created successfully`, {
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

                fetchalllisting();
                navigate("/");
            }
            else{

                if(`${r.note}` === "partially"){

                    toast.error(`${r.message}`, {
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
                    
                    console.log(r.message)
                }
            }
            
        }
        catch(err){

            toast.error(`${err.message}`, {
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

            setLoading(false)
            navigate("/")
            console.log(err);
        }
    }

    useEffect(()=>{
        
        if(login === false){

            navigate("/login")
        }

    },[])
        

    return(

        <div>

            <Navbar></Navbar>
            
            {

            loading ? <Spinner></Spinner> : 

            <div className="font-fredoka w-[70%] mx-auto mt-[90px] min-[500px]:w-[65%] min-[800px]:w-[50%]">

                <div className="text-[23px] my-5 min-[450px]:text-3xl">Create a New Listing</div>

                <form method="POST" onSubmit={submithandler} className="flex flex-col gap-3">
                    
                    <div className="flex flex-col">
                        <span className="text-lg">Title</span>
                        <input type="text" autoComplete="off" placeholder="Add a catchy title" name="title" className="border-2 outline-0 pl-1.5 py-1 duration-200 focus:border-2 focus:border-[#A6C6F5]" onChange={changehandler}></input>
                    </div>


                    <div className="flex flex-col">
                        <span className="text-lg">Description</span>
                        <textarea className="border-2 outline-0 duration-200 focus:border-2 focus:border-[#A6C6F5]" name="description" onChange={changehandler}></textarea>
                    </div>
                        

                    <div className="flex flex-col">
                        <span className="text-lg">Upload Image</span>
                        <input type="file" name="file" className="border-2 outline-0 duration-200 focus:border-2 focus:border-[#A6C6F5]" onChange={changehandler}></input>
                    </div>


                    <div className="flex gap-0.5 flex-col min-[800px]:flex-row min-[800px]:gap-3">

                        <span className="text-lg">Select Category</span>
                        <select name="tag" className="border-2 outline-0 overflow-scroll" onChange={changehandler}>

                            <option disabled selected>--Select the category of listing--</option>
                            <option value="room">Rooms</option>
                            <option value="house">Houses</option>
                            <option value="bungalow">Bungalow</option>
                            <option value="swimmingpool">Pools</option>
                            <option value="boat">Boats</option>
                            <option value="camping">Camping</option>
                            <option value="island">Islands</option>
                            <option value="farm">Farms</option>
                            <option value="treehouse">Treehouses</option>
                            <option value="beach">Beachs</option>
                        </select>
                    </div>


                    <div className="flex gap-1 flex-col min-[650px]:flex-row min-[650px]:gap-4">

                        <div className="flex flex-col">
                            <span className="text-lg">Price</span>
                            <input type="text" placeholder="1200" name="price" className="border-2 outline-0 pl-1.5 py-1 duration-200 focus:border-2 focus:border-[#A6C6F5]" autoComplete="off" onChange={changehandler}></input>
                        </div>


                        <div className="flex flex-col w-full">
                            <span className="text-lg">Country</span>
                            <input type="text" name="country" placeholder="India" className="border-2 outline-0 pl-1.5 py-1 duration-200 focus:border-2 focus:border-[#A6C6F5]" autoComplete="off" onChange={changehandler}></input>
                        </div>
                    </div>


                    <div className="flex flex-col">
                        <span className="text-lg">Location</span>
                        <input type="text" name="location" className="border-2 outline-0 pl-1.5 py-1 duration-200 focus:border-2 focus:border-[#A6C6F5]" placeholder="Bhilai, Chattisgarh" autoComplete="off" onChange={changehandler}></input>
                    </div>


                    <input type="submit" value="Add" className="self-start bg-[#fe424d] text-white cursor-pointer rounded-md px-5 py-1.5 mb-3 mx-auto min-[450px]:mx-0 duration-200 focus:border-2 focus:border-[#A6C6F5]"></input>
                </form>
            </div>
            }
            <Footer></Footer>
        </div>
    )
}

export default CreateListing;