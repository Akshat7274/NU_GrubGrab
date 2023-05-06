import React, {useState} from "react";
import CP from "./changePassword.module.css"
import axios from "axios";

function ChangePassword(props) {
    const [otp,setOtp] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(otp !== "" && password !== "" && password === confirm){
            try {
                let url = "/api/v1/auth/changePassword";
                let options = {
                    method : 'POST',
                    url : url,
                    data : {email : props.children, otpcode : otp, password: password}
                }
                let response = await axios(options)
                let record = response.data.response;
                if (record.statusText==="Success"){
                    alert("Success: " + record.message)
                } else {
                    alert("Error: " + record.message)
                }
            } catch (error) {
                alert("Something went Wrong!")
            }
        } else if (otp === ""){
            alert("OTP has to be entered for validation")
        } else if (password === ""){
            alert("Please provide your new password")
        } else if (confirm === ""){
            alert("Please confirm your password")
        } else if (password !== confirm){
            alert("The two passwords do not match")
        }
    }

    return (
        <div className={CP.loginContainer}>
            <div className={CP.loginContainerv2}>
                <h1>Reset Password</h1>

                <div className={CP.inputContainer}>
                    <label>OTP</label>
                    <input onChange={e=> setOtp(e.target.value)} placeholder="Enter the OTP" type="text"/>
                </div>

                <div className={CP.inputContainer}>
                    <label>NEW PASSWORD</label>
                    <input onChange={e=> setPassword(e.target.value)} placeholder="enter your new password" type="password"/>
                </div>

                <div className={CP.inputContainer}>
                    <label>CONFIRM NEW PASSWORD</label>
                    <input onChange={e=> setConfirm(e.target.value)} placeholder="confirm your password" type="password"/>
                </div>
                <button onClick={handleSubmit} className={CP.loginBTN}>Change Password</button>
            </div>
        </div>
    )
}

export default ChangePassword;