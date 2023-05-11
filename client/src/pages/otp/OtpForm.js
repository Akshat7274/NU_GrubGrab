import React, {useRef, useState} from "react";
import { Link } from "react-router-dom";
import xyz from "./xyz.module.css"
import axios from "axios";
import ChangePassword from "../otpEnter/ChangePassword";
import {message} from "antd";
import Layout from "../../components/Layout/Layout";

function OtpForm() {
    const emailRef = useRef();
    //const [email,setEmail] = useState("");
    const [otpForm,showForm] = useState(true);
    const sendOtp = async (e) => {
        e.preventDefault();
        try {
            let url = "/api/v1/auth/forgot-password";
            let options = {
                method : 'POST',
                url : url,
                data : {email : emailRef.current.value}
            }
            let response = await axios(options)
            let record = response.data.responseType;
            if (record.statusText === "Success"){
                message.success("Success: " + record.message)
                showForm(false);
            } else {
                message.error("Error: " + record.message)
            }
        } catch (error) {
            message.error("Something went Wrong!")
        }
    }
    return(
        <Layout title={"Forgot Password"}>
            <div className={xyz.loginContainer} style={{marginTop:"70px", marginBottom:"-60px"}}>
                <div className="row login">
                    <div className="col-md-2">
                    </div>
                    {otpForm ? (<div className={xyz.loginContainerv2}>
                        <h3 style={{textAlign:"center"}}>FORGOT PASSWROD</h3><br />
                        <form autoComplete="off" id="otpForm" >
                        <div className={xyz.inputContainer}>
                            <label className="form-label">EMAIL</label>
                            <input type="email" className="form-control" placeholder="Enter the email" name="email" ref={emailRef} autoComplete="off" />
                        </div>
                        <div >
                            <button type="submit" className={xyz.loginBTN} onClick={sendOtp}>Send OTP</button>&nbsp;
                            <Link to="/account/login"><button type="button" className={xyz.backBTN} >Back</button></Link>
                        </div>
                        </form>
                    </div>) : 
                        (<ChangePassword>{emailRef.current.value}</ChangePassword>)}
                </div>
            </div>
        </Layout>
    )
}

export default OtpForm;