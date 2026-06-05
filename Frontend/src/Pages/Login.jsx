import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/login.css"
import { Link } from "react-router-dom";
import axios from "axios";
export default function Login(){
    const navigate = useNavigate()
    const [error,setError] = useState("");
    const loginHandler = async(event)=>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")
        try{
            const response = await axios.post('http://localhost:8080/api/login',{},{
                auth:{
                    username: email, // Put the email state here
                    password: password,
                }
            })
            console.log(response.data)
        if(error==""){
            navigate("/home",{state:{
                username : response.data
            }})
        }
            

        }catch(e){
            console.log("Status:", e.response?.status);
    console.log("Data:", e.response?.data);
    console.log("Headers:", e.response?.headers);
        }
    }
    const forgotPassword = async()=>{
        navigate("/login/forgot-password",{state:{
            from:"/login",
        }})
    }
    return(
        <>
            <div className="loginLogin-wrapper">
                <div className="loginLogin-container">
                <h2>Login</h2>
                <form onSubmit={loginHandler}>
                    <div className="inputLogin-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="Enter your email" required name="email"></input>
                    </div>

                    <div className="inputLogin-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required name="password"></input>
                    </div>
                    <div className="forgot-password-container">
                        <Link to="/login/forgot-password" state={{from:"/login"}} className="forgot-password-link">
                            Forgot Password
                        </Link>
                    </div>
                    <button type="submit" className="loginLogin-button">Login</button>
                     <p style={{'color':'red',fontSize:12}}>{error}</p>
                </form>
               
                </div>

            </div>


        </>
    )
}