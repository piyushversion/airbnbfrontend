import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {toast} from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function Card(props){

    const{login,show,setShow} = useContext(AppContext);
    const navigate = useNavigate();

    const list = props.list;
    console.log(list.ratingandreviews)

    let sum = 0;

    function calrat(arr){

        if(arr.length === 0){

            return 0;
        }

        arr.map((item)=>{

            sum = sum + item.rating
        })

        const res = sum/arr.length

        return res
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function click(id){

        if(login){

            navigate(`/alldetails/${id}`)

        }
        else{

            toast.error("login to check details")
            navigate("/login")
        }

    }

    return(

            <div onClick={()=>click(list._id)} className="border rounded-xl cursor-pointer transition-all duration-500 shadow-md hover:-translate-y-[0.6rem] hover:shadow-[0px_15px_20px_-5px_#fe424d]">
                <div className="overflow-hidden">
                    <img src={list.imageurl} className="aspect-[4/3] object-cover w-full  rounded-t-xl" alt="XXX"></img>
                </div>
                <div className="p-[10px]">
                    <div className="flex items-center font-fredoka justify-between">
                        <h2 className="font-fredoka text-lg">{list.title}</h2>
                        <p className="flex items-center text-lg gap-[2px]"><span><FaRegStar></FaRegStar></span>{calrat(list.ratingandreviews)}</p>
                    </div>
                    <div className="flex text-lg gap-1.5 text-gray-600">
                        <p className="font-fredoka"><span>&#8377;</span>{numberWithCommas(list.price)} / night</p>
                        {
                            
                            show ? <p className="font-fredoka text-lg italic">+18% GST</p> : <></>
                        }
                    </div>
                </div>
            </div>
    )
}

export default Card;