import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
          <img
            src="/images/contactus.png"
            alt="contactus"
            style={{ width: "100%"}}
          />
          <div classname="row " style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
            <div classname="col-md-6" style={{border:"4px solid", padding:"10px",borderRadius:"10px",margin:"auto 2px", maxWidth:"30rem"}}>
              <p className="text-center mt-2">
                For any query and info about product displayed feel free to contact our team.
              </p>
              <p className="text-center mt-3">
                <BiMailSend /> : nugrubgrab@gmail.com
              </p>
              <p className="text-center mt-3">
                <BiPhoneCall /> : +91 12345 67890
              </p>
            </div>
            <div classname="col-md-6" style={{border:"4px solid", padding:"10px",borderRadius:"10px",margin:"auto 2px", maxWidth:"30rem"}}>
              <p className="text-center mt-2">
                For any food related query and info feel free to contact nescafe.
              </p>
              <p className="text-center mt-3">
                <BiMailSend /> : xmemail@gmail.com
              </p>
              <p className="text-center mt-3">
                <BiPhoneCall /> : +91 12345 67890
              </p>
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default Contact;
