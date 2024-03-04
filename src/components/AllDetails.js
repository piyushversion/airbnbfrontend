import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "./Spinner";
import {toast} from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Rating from "./Rating";
import Navbar from "./Navbar";
import { IoStarSharp } from "react-icons/io5";


function AllDetails(){

    const[loading,setLoading] = useState(true);

    const{logindata} = useContext(AppContext);

    const location = useLocation();
    const navigate = useNavigate();


    const id = location.pathname.split("/").at(-1);

    const[data,setData] = useState([]);

    async function fetchalldetails(){


            try{

                const res = await fetch(`https://airbnbbackend-2.onrender.com/getspecifiedlistingid/${id}`,{

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

            const r = await fetch(`https://airbnbbackend-2.onrender.com/deletelisting/${id}`,{

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
                <div>
                    <div>
                        <h1>{data.title}</h1>
                        <img src={data.imageurl}></img>
                        <p>Owned by {data.userwhomadethislisting.username} </p>
                        <p>{data.description}</p>
                        <p><span>&#8377;</span>{numberWithCommas(data.price)} / night</p>
                        <p>{data.location}</p>
                        <p>{data.country}</p>
                    </div>
                    {
                        sessionStorage.getItem("id") === data.userwhomadethislisting._id ? <div> <button onClick={()=>navigate(`/alldetails/${id}/edit`)}>Edit</button><button onClick={deletehandler}>Delete</button> </div> : <p></p>
                    }
                    <Rating id={id} fetchalldetails={fetchalldetails}></Rating>
                    <div>
                        {   
                            data.ratingandreviews.length <=0 ? <div>No Ratings Till Now</div> :
                            data.ratingandreviews.map((list,index)=>{

                                return <div className="border-2">{data.userwhohasgivenrating[index].username}<div>{[...Array(5)].map((arr,index)=>{return index< list.rating ? <IoStarSharp color="#ffc107"></IoStarSharp> : <IoStarSharp color="#808080"></IoStarSharp> })}</div>{list.reviews}</div>
                            })
                        }
                    </div>
                </div>
            
            }


        </div>
    )
}

export default AllDetails;