import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - NU GrubGrab"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 div-container">
            <div className="div-container-v2">
              <h3 style={{lineHeight:"3rem"}}> Name : {auth?.user?.name}</h3>
              <h3 style={{lineHeight:"3rem"}}> Email : {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
