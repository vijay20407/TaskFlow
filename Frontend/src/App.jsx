import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Otp from "./Pages/Otp";
import { useState } from "react";
import ResetPassword from "./Pages/ResetPassword";


export default function App(props){
   
    return(
        <Router>
            <Routes>
                <Route path="/home" element={<Home/>}  />
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signup/otp" element={<Otp/>}/>
                <Route path="/login/forgot-password" element={<Otp/>}/>
                <Route path="/login/reset-password" element={<ResetPassword/>}/>
            </Routes>
        </Router>
    )
}