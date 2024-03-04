import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import LoginPage from "./LoginPage";
import {Navigate} from "react-router-dom";

function ProtectedRoute(){
    
    const{login} = useContext(AppContext);

    return(

        <div>
            {
                login ? <Navigate to="/"/> : <LoginPage></LoginPage>
            }
        </div>
    )
}

export default ProtectedRoute