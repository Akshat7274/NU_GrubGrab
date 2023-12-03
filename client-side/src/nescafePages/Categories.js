import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
const Categories = () => {
  const location = useLocation();
  const currentURL = location.pathname;

  const segments = currentURL.split("/");

  let foodPointName = "";
  for (let i = 0; i < segments.length; i++) {
    if (segments[i] !== "") {
      foodPointName = segments[i];
      break;
    }
  }
  const categories = useCategory(foodPointName);
  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "60px" }}>
        <div className="row container" style={{padding:"5rem"}}>
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
