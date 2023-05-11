import React from "react";
import Layout from "../../components/Layout/Layout";

const ComingsoonA = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
          <img
            src={require(`./ApnoGaon.png`)}
            alt="ApnoGaon"
            style={{ width: "100%"}}
          />
          <div classname="row">
            <h2 className="col-md-12 text-center">COMING SOON ..</h2>
            <div className="col-md-12 text-center">
              <button className="btn btn-success mt-3">Go Back</button>
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default ComingsoonA;
