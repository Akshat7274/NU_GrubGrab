import React from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center" style={{marginTop:"80px", paddingTop:"3rem"}}>
          <h1>Search Results</h1>
          <h4>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Result`}
          </h4>
          <div className="d-flex flex-wrap mt-4" >
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem", backgroundColor:"#fdfffc"}}>
                <img
                  src={`/api/v1/silver-spoon/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ₹ {p.price}</p>
                  <button class="btn btn-outline-dark ms-1" onClick={() => navigate(`silver-spoon/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-outline-dark ms-1" onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "silver-spoon-cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}>ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
