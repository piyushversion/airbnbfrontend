import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import AllDetails from "./AllDetails";
import LoginPage from "./LoginPage";
import {Navigate} from "react-router-dom";

function ProtectedRouteDetails(){

    const{login} = useContext(AppContext);

    return(

        <div>
            {
                login ? <AllDetails></AllDetails> : <Navigate to="/login" />
            }
        </div>
    )
}

export default ProtectedRouteDetails