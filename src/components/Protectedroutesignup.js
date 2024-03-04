import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import SignUpPage from "./SignUpPage";
import {Navigate} from "react-router-dom";

function Protectedroutesignup(){
    
    const{login} = useContext(AppContext);

    return(

        <div>
            {
                login ? <Navigate to="/"/> : <SignUpPage></SignUpPage>
            }
        </div>
    )
}

export default Protectedroutesignup