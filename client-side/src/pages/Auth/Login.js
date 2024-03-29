import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import LoginB from "../../components/Button/SimpleBTN";
import {gapi} from "gapi-script"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:process.env.GOOGLE_CLIENT_ID,
        scope:""
      })
    };

    gapi.load('client:auth2',start)
  });
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify({token:res.data.token, isGoogle:res.data.isGoogle}));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Login - NU GrubGrab">
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit} className="form-container-v2">
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <p
              type="button"
              className="forgot"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password?
            </p>
          </div>

          <button type="submit" className="register-button">
            LOGIN
          </button>
          <LoginB isIn="IN"/>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
