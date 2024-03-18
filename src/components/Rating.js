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

            const response = await fetch(`https://airbnbbackend1.onrender.com/ratingandreviews/${id}`,{

                method:"POST",
                headers:{

                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
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

        <div className="my-6">
            <form onSubmit={submithandler}>

                <h1 className="text-3xl pb-3">Leave a Review</h1>
                <p className="text-xl pb-3">Rating</p>
                <div className="flex pb-3">

                    {[...Array(5)].map((element,index)=>{
                        
                        const ratingvalue = index+1;
                        
                        return (

                            <label>

                                <IoStarSharp size={40} color={ratingvalue <= rating ? "#ffc107" : "#808080"} onClick={()=>setRating(ratingvalue)}></IoStarSharp>

                            </label>
                        )
                    })}
                </div>
                <div className="pb-3">
                    <div className="text-xl">Comments</div>
                    <textarea className="border-2 outline-0 w-full h-[100px] resize-none"  onChange={changehandler} maxLength="100"></textarea>
                </div>

                <input type="submit" value="Submit" className="text-xl border border-black rounded-md px-6 py-1.5 cursor-pointer transition-all duration-200 hover:bg-black hover:text-white w-[100%] min-[400px]:w-fit"></input>

            </form>
        </div>
    )
}

export default Rating