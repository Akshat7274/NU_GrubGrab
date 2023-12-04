import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewChange = async (value, orderId) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/review/${orderId}`, {
        review: value,
      });
      // const updatedOrder = data;
      // const updatedOrders = [...orders];
      // const index = updatedOrders.findIndex((o) => o._id === orderId);
      // updatedOrders[index].review = updatedOrder.review;
      // setOrders(updatedOrders);
      getOrders()
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-4">
            <UserMenu />
          </div>
          <div
            className="col-md-6"
            style={{
              marginLeft: "10rem",
              padding: "60px",
              alignItems: "center",
              border: "0.2rem solid #235789",
              borderRadius: "2rem",
            }}
          >
            <h1 className="text-center" style={{ paddingBottom: "2rem" }}>
              ALL ORDERS
            </h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Review</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).format("DD-MM-YYYY")}</td>
                        <td>{moment(o?.createdAt).format("HH:mm")}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        <td>
                          {o.review ? (
                            <span>{o.review}</span>
                          ) : (
                            <select
                              value={o.review || ""}
                              onChange={(e) =>
                                handleReviewChange(e.target.value, o._id)
                              }
                            >
                              <option value="">Select Review</option>
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <option key={rating} value={rating}>
                                  {rating}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/nescafe/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            style={{
                              width: "auto",
                              height: "125px",
                              margin: "auto !important",
                            }}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
              <p style={{ marginLeft: '10px' }}>Instructions: {o.instruction.substring(0,30)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
