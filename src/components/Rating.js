import { IoStarSharp } from "react-icons/io5";
import {useState} from "react";
import{toast} from "react-hot-toast";

function Rating({id,fetchalldetails}){

    const[rating,setRating] = useState(null)
    const[comment,setComment] = useState(null);

    function changehandler(event){
        
        setComment(event.target.value)
    }

    async function submithandler(event){

        event.preventDefault();

        const formData = new FormData();
        
        formData.append('rating',rating)
        formData.append('reviews',comment)

        try{

            const response = await fetch(`https://airbnbbackend-2.onrender.com/ratingandreviews/${id}`,{

                method:"POST",
                headers:{

                    "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
                },
                body:formData
            })   

            const r = await response.json();
            console.log(r)

            if(r.success){

                toast.success("rating and reviews created successfully")
                fetchalldetails();
            }
            else{

                toast.error("something went wrong")
            }
        }
        catch(err){

            toast.error("something went wrong")
        }
    }
    
    console.log(rating)
    console.log(comment)

    return(

        <div>
            <form onSubmit={submithandler}>

                <h1>Leave a Review</h1>
                <p>Rating</p>
                <div className="flex">

                    {[...Array(5)].map((element,index)=>{
                        
                        const ratingvalue = index+1;
                        
                        return (

                            <label>

                                <IoStarSharp size={40} color={ratingvalue <= rating ? "#ffc107" : "#808080"} onClick={()=>setRating(ratingvalue)}></IoStarSharp>

                            </label>
                        )
                    })}
                </div>
                <label>Comments</label>
                <br></br>
                <textarea className="border-2 outline-0" onChange={changehandler}></textarea>

                <input type="submit" value="Submit"></input>

            </form>
        </div>
    )
}

export default Rating