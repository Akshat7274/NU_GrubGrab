import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/apno-gaon/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row dashboard">
       
        <div className="col-md-4">
          <AdminMenu />
        </div>
        <div className="col-md-9"  style={{margin:"auto",padding:"60px", alignItems:"center", border:"0.2rem solid", borderRadius:"2rem", borderColor:"rgba(194,74,0,1)"}}>
          <h1 style={{textAlign:"center", padding:"2rem"}}>ALL PRODUCT LIST</h1>
          <div className="d-flex flex-wrap" style={{justifyContent:"center"}}>
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link" style={{margin:"0.5rem"}}
              >
                <div className="card m-2" style={{ width: "18rem",  }}>
                  <img
                    src={`/api/v1/apno-gaon/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
