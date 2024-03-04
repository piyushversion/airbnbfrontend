import './App.css';
import {Routes,Route, useNavigate} from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CreateListing from './components/CreateListing';
import AllDetails from './components/AllDetails';
import {useLocation} from "react-router-dom";
import {useContext, useEffect} from "react";
import { AppContext } from './context/AppContext';
import {toast} from "react-hot-toast";
import ProtectedRoute from './components/ProtectedRoute';
import Protectedroutesignup from './components/Protectedroutesignup';
import ProtectedRouteDetails from './components/ProtectedRouteDetails';
import Edit from './components/Edit';

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const{login,clearsessionStorage,fetchalllising} = useContext(AppContext);

  async function check(){

      try{

          const res = await fetch("https://airbnbbackend-2.onrender.com/check",{

              method:"POST",
              headers:{

                "Content-Type":"application/json",
                "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
              },
              body:""
          })

          const r = await res.json();

          if(r.success === false){

            toast.error('Session Expired ! please login to continue', {
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

            clearsessionStorage();
            navigate("/login")
          }
      }
      catch(err){

        toast.error('Something went wrong ! please login again to continue', {
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
        clearsessionStorage();
        navigate("/")
        console.log( err.message)
      }
  }

  useEffect(()=>{

    if(login){

        check()
    }

  },[location.pathname])


  return (

    <div>

        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/login' element={<ProtectedRoute></ProtectedRoute>}></Route>
          <Route path='/signup' element={<Protectedroutesignup></Protectedroutesignup>}></Route>
          <Route path='/createnewlisting' element={<CreateListing></CreateListing>}></Route>
          <Route path='/alldetails/:id' element={<ProtectedRouteDetails></ProtectedRouteDetails>}></Route>
          <Route path='/alldetails/:id/edit' element={<Edit></Edit>}></Route>
        </Routes>
    </div>
  );
}

export default App;
