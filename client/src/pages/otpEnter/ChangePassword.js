import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import CP from "./changePassword.module.css";
import axios from "axios";
import {message} from "antd";
import { toast } from "react-hot-toast";

function ChangePassword(props) {
    const [otp,setOtp] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");
    const navigate = useNavigate()

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
                    message.success("Success: " + record.message)
                    window.location.href = `/login`
                } else {
                    message.error("Error: " + record.message)
                }
            } catch (error) {
                message.error("Something went Wrong!")
            }
        } else if (otp === ""){
            toast.success("OTP has to be entered for validation")
        } else if (password === ""){
            message.error("Please provide your new password")
        } else if (confirm === ""){
            message.error("Please confirm your password")
        } else if (password !== confirm){
            message.error("The two passwords do not match")
        }
    }

    return (
    
        <div className={CP.loginContainer} >
            <div className={CP.loginContainerv2}>
                <h1>RESET PASSWORD</h1>
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