import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate, useLocation } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
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
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [submittedInstructions, setSubmittedInstructions] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("silver-spoon-cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/silver-spoon/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
    let existingCartItem = localStorage.getItem(foodPointName + "-cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "/api/v1/silver-spoon/product/braintree/payment",
        {
          nonce,
          instructions,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("silver-spoon-cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-1">
              {!auth?.token ? "Hello Guest!!" : `Hello  ${auth?.user?.name} !!`}
              <p className="text-center">
                {cart?.length
                  ? `You have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty!"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/silver-spoon/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{
                        width: "auto",
                        height: "125px",
                        margin: "auto !important",
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-outline-dark"
                      style={{ border: "2px solid" }}
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {!submittedInstructions ? (
                <>
                  <h6>Add additional instructions if any</h6>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter additional instructions here..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => {setSubmittedInstructions(true);}}
                  >
                    Submit Instructions
                  </button>
                </>
              ) : (
                <>
                  <h6>Instructions:</h6>
                  <p>{instructions}</p>
                </>
              )}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <h2>🛒</h2>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        // paypal: {
                        //   flow: "vault",
                        // },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.token}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
