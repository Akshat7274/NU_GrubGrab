import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - NU GrubGrab"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.png"
            alt="contactus"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2" style={{textAlign:"center", fontStyle:"italic"}}>
            “Ate, eating, going to eat” that’s what you must care about!<br></br><br></br>We are team NU GrubGrab established in 2023, <br></br>
            The one you can count on.<br></br> <br></br>
            We aim to provide the most seamless process for ordering food inside your very own university campus. Our website will make sure you don't have to get in queues and wait to have your amazing meal rather you can order online and get it when it's prepared.
            <br></br><br></br>We care for your precious time.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
