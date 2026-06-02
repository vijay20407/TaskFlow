import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/resetPassword.css"



export default function ResetPassword(){
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const handleSubmit = async(e)=>{
        e.preventDefault();
         const formData = new FormData(e.currentTarget)
        const confirmPassword = formData.get("confirmPassword")
        const password = formData.get("password")
        if(password!==confirmPassword){
            console.log("No way ur dumb af");

        }else{
            const response = await axios.patch("http://localhost:8080/api/login/reset-password",{
                email,
                password,
            })
            navigate("/login")
            
        }
    }
    return(
        <div className="reset-wrapper">
            <div className="reset-container">
                <h1 className="reset-title">Reset Password</h1>

                <p className="reset-subtitle">
                Create a new password for your account.
                </p>

                <form onSubmit={handleSubmit}>
                <div className="reset-input-group">
                    <label htmlFor="password">
                    New Password
                    </label>

                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter new password"
                    required
                    />
                </div>

                <div className="reset-input-group">
                    <label htmlFor="confirmPassword">
                    Confirm Password
                    </label>

                    <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    required
                    />
                </div>

                <button
                    type="submit"
                    className="reset-button"
                >
                    Submit
                </button>
                </form>
            </div>
        </div>
    )
}