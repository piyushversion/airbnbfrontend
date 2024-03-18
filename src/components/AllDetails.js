import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "./Spinner";
import {toast} from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Rating from "./Rating";
import Navbar from "./Navbar";
import { IoStarSharp } from "react-icons/io5";
import Footer from "./Footer";


function AllDetails(){

    const[loading,setLoading] = useState(true);

    const{logindata} = useContext(AppContext);

    const location = useLocation();
    const navigate = useNavigate();


    const id = location.pathname.split("/").at(-1);

    const[data,setData] = useState([]);

    async function fetchalldetails(){


            try{

                const res = await fetch(`https://airbnbbackend1.onrender.com/getspecifiedlistingid/${id}`,{

                    method:"GET",
                    headers:{
        
                        "Content-Type":"application/json"
                    }
                })

                const resp = await res.json();
                console.log(resp)
                
                if(resp.success){
                    
                    setData(resp.data);
                }
                else{

                    console.log(resp.message);
                    setData([])
                    navigate("/")
                }

                setLoading(false)
            }
            catch(err){

                toast.error("Something went wrong")
                console.log(err.message)
                setData([]);
                setLoading(false)
                navigate("/")
            }
    }

    async function deletehandler(){

        try{

            const r = await fetch(`https://airbnbbackend1.onrender.com/deletelisting/${id}`,{

                method:"DELETE",
                headers:{
        
                    "Content-Type":"application/json"
                }
            })

            const rr = await r.json();

            if(rr.success){

                toast.success("Deleted successfully");
                navigate("/");
            }
            else{

                toast.error("something went wrong");
                navigate("/");
            }
        }
        catch(err){

            toast.error("something went wrong");
            navigate("/")
            console.log(err.message)
        }
    }



    useEffect(()=>{

        fetchalldetails();

    },[])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    console.log(logindata)
    console.log(data)

    return(
        <div>
            <Navbar></Navbar>
            {
                loading ? <Spinner></Spinner> :
                <div className="w-[65%] mx-auto mt-[85px] mb-8 font-fredoka min-[700px]:w-[50%]">
                    <div className="flex flex-col gap-1.5 mt-3">
                        <h1 className="text-3xl">{data.title}</h1>
                        <img src={data.imageurl} className="rounded-xl"></img>
                        <p className="text-xl">Owned by <span className="italic">{data.userwhomadethislisting.username}</span> </p>
                        <p className="text-xl">{data.description}</p>
                        <p className="text-xl"><span>&#8377;</span>{numberWithCommas(data.price)} / night</p>
                        <p className="text-xl capitalize">{data.location}</p>
                        <p className="text-xl capitalize">{data.country}</p>
                    </div>
                    {
                        localStorage.getItem("id") === data.userwhomadethislisting._id ? <div className="flex gap-5 my-2"> <button onClick={()=>navigate(`/alldetails/${id}/edit`)} className="text-white bg-[#fe424d] py-1.5 px-6 rounded-md text-lg">Edit</button><button onClick={deletehandler} className="bg-black text-white py-1.5 px-6 rounded-md text-lg">Delete</button> </div> : <p></p>
                    }
                    <Rating id={id} fetchalldetails={fetchalldetails}></Rating>

                    <div className="text-2xl">All Reviews </div>

                    <div className="grid grid-cols-1 gap-3.5 my-3 min-[520px]:grid-cols-2">
                        {   
                            data.ratingandreviews.length <=0 ? <div className="text-xl">No Ratings Till Now</div> :
                            data.ratingandreviews.map((list,index)=>{

                                return <div className="border-2 text-xl px-1.5 py-1 flex flex-col gap-1.5 rounded-md">{"@"}{data.userwhohasgivenrating[index].username}<div className="flex">{[...Array(5)].map((arr,index)=>{return index< list.rating ? <IoStarSharp color="#ffc107" size={30}></IoStarSharp> : <IoStarSharp color="#808080" size={30}></IoStarSharp> })}</div>{list.reviews}</div>
                            })
                        }
                    </div>
                </div>
            
            }
            <Footer></Footer>
        </div>
    )
}

export default AllDetails;