import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
          
          <div classname="row " style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
          <h1>CONTACT US -</h1>
            <div classname="col-md-6" style={{border:"4px solid", padding:"10px",borderRadius:"10px",margin:"auto 2px", maxWidth:"30rem"}}>
              <h2 className="text-center mt-2">
                For any query and info about product displayed feel free to contact our team.
              </h2>
              <h2 className="text-center mt-3">
                <BiMailSend /> : nugrubgrab@gmail.com
              </h2>
              <h2 className="text-center mt-3">
                <BiPhoneCall /> : +91 12345 67890
              </h2>
            </div>
            <div classname="col-md-6" style={{border:"4px solid", padding:"10px",borderRadius:"10px",margin:"auto 2px", maxWidth:"30rem"}}>
              <h2 className="text-center mt-2">
                For any food related query and info feel free to contact.
              </h2>
              <h2 className="text-center mt-3">
                <BiMailSend /> : xmemail@gmail.com
              </h2>
              <h2 className="text-center mt-3">
                <BiPhoneCall /> : +91 12345 67890
              </h2>
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default Contact;
