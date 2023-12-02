import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import LoginB from "../../components/Button/SimpleBTN";
import { gapi } from "gapi-script";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // form function

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length == 10) {
      if (password == confirmPassword ) {
        try {
          const res = await axios.post("/api/v1/auth/register", {
            name,
            email,
            password,
            phone,
          });
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            navigate("/login");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      } else {
        toast.error("The 2 passwords don't match. Try Again");
      }
    }
    else {
      toast.error("Phone number has to be equal to 10 digits");
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  return (
    <Layout title="Register - NUGrubGrab">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit} className="form-container-v2">
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
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
              placeholder="Enter Your New Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Confirm Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <button type="submit" className="register-button">
            REGISTER
          </button>
          <LoginB isIn="UP" />
        </form>
      </div>
    </Layout>
  );
};

export default Register;
