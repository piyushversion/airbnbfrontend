
import {useState,useContext, useEffect} from "react";
import {toast} from "react-hot-toast";
import{useNavigate} from "react-router-dom";
import Spinner from "./Spinner";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";


function Edit(){

    const{fetchalllisting} = useContext(AppContext);

    const Location = useLocation();

    const[loading,setLoading] = useState(true);

    const id = Location.pathname.split("/").at(-2);

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

            const response = await fetch(`https://airbnbbackend-2.onrender.com/editlisting/${id}`,{

                method:"POST",
                headers:{

                    "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
                },
                body:formData
            })   

            const r = await response.json();

            setLoading(false)

            if(r.success){

                toast.success(`Updated successfully`, {
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
                navigate(-1);
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

    useEffect(()=>{

        fetchalldetails(id)
    },[])

    return (

        <div>

            {

            loading ? <Spinner></Spinner> : 

            <div>

                <form method="POST" onSubmit={submithandler}>
                    
                    <label htmlFor="title">Title : </label>
                    <input type="text" name="title" className="border-2 outline-0" onChange={changehandler} placeholder={`${data.title}`}></input>

                    <br></br>

                    <label htmlFor="description">Description : </label>
                    <input type="text" name="description" className="border-2 outline-0" onChange={changehandler} placeholder={`${data.description}`}></input>

                    <br></br>

                    <img src={data.imageurl} width="100px"></img>

                    <label htmlFor="file">File : </label>
                    <input type="file" name="file" className="border-2 outline-0" onChange={changehandler}></input>

                    <br></br>

                    <label htmlFor="tag">Category : </label>
                    <select name="tag" className="border-2 outline-0" onChange={changehandler}>

                        <option>--Select the category of listing--</option>
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

                    <br></br>

                    <label htmlFor="price">Price : </label>
                    <input type="text" name="price" className="border-2 outline-0" onChange={changehandler} placeholder={`${data.price}`}></input>

                    <br></br>

                    <label htmlFor="country">Country : </label>
                    <input type="text" name="country" className="border-2 outline-0" onChange={changehandler} placeholder={`${data.country}`}></input>

                    <br></br>

                    <label htmlFor="location">Location : </label>
                    <input type="text" name="location" className="border-2 outline-0" onChange={changehandler} placeholder={`${data.location}`}></input>

                    <br></br>

                    <input type="submit" value="Edit"></input>
                </form>
            </div>
            }
        </div>
    )
}

export default Edit;