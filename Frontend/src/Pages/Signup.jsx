import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../CSS/signup.css"
import { Link } from "react-router-dom";

export default function Signup(props){
    const [error,setError] = useState("")
    const navigate = useNavigate()
    const submitHandler = async(event)=>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")
        if(username!="" && email!="" && password!=""){
            try {
                const response = await axios.post("http://localhost:8080/api/signup",{
                    username,
                    email,
                    password,
                    
                })
                console.log("Form submitted with data:", {username,email,password})
                console.log(response.data);
                navigate("/signup/otp",{
                    state:{
                        vid:response.data,
                        from:"/signup",
                        email:email
                }})

                    
            } catch (error) {
                console.error("Error submitting form:", error)
            }
            
        
        }else{
            alert("Please fill in all fields before submitting the form.")
        }
    }
    
    return(
        
        <div className="signupsignup-wrapper">
            <div className="signupsignup-container">
            <h2>Sign Up</h2>
            <form onSubmit={submitHandler}>
                
                <div className="inputsignup-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter your username" required name="username"></input>
                </div>

                <div className="inputsignup-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required name="email"></input>
                </div>

                <div className="inputsignup-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required name="password"></input>
                </div>

                <div className="inputsignup-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Confirm your password" required></input>
                </div>

                <button type="submit" className="signupsignup-button">Sign Up</button><br /><br />
                Have an Account?
                <Link to="/login">Login</Link>
            </form>
            </div>
        </div>
    )
}