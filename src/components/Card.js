import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {toast} from "react-hot-toast";

function Card(props){

    const{login,show,setShow} = useContext(AppContext);
    const navigate = useNavigate();

    const list = props.list;

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

            <div onClick={()=>click(list._id)}>
                <img src={list.imageurl} className="w-[30%]" alt="XXX"></img>
                <h2 className="font-fredoka">{list.title}</h2>
                <div>
                    <p className="font-fredoka"><span>&#8377;</span>{numberWithCommas(list.price)} / night</p>
                    {

                        show ? <p>+18% GST</p> : <span>No Tax</span>
                    }
                </div>
            </div>
    )
}

export default Card;