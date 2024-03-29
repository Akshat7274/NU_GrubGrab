import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "../Layout/nav.css";

const Header = (userDetails) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname;

  const segments = currentURL.split("/");

  let foodPointName = "";
  let fnd = 0;
  for (let i = 0; i < segments.length; i++) {
    if (segments[i] === "nescafe" || segments[i] === "tmp" || segments[i] === "silver-spoon" || segments[i] === "apno-gaon") {
      foodPointName = segments[i];
      fnd = 1;
      break;
    }
  }
  if (fnd===0){
    for (let i = 0; i < segments.length; i++) {
      if (segments[i] === "login" || segments[i] === "register" || segments[i] === "dashboard") {
        foodPointName = segments[i];
        break;
      }
    }
  }

  const getUser = async () => {
    try {
      const url = `/api/v1/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
      setAuth({
        ...auth,
        user: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          _id: data._id,
          role: data.role,
          outlet: data.admin,
        },
        token: data.token,
      });
      localStorage.setItem(
        "auth",
        JSON.stringify({ token: data.token, isGoogle: data.isGoogle })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    {
      getUser();
    }
  }, []);

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory(foodPointName);
  console.log(auth?.user);

  const blacklist = async () => {
    const jwt = JSON.parse(localStorage.getItem("auth")).token;
    const data_new = await axios.post("/api/v1/auth/black", { token: jwt });
  };

  const handleLogout = async () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    blacklist();
    localStorage.removeItem("auth");
    const data = await axios.post("/api/v1/auth/google/logout");
    toast.success("Logout Successfully");
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top custom nav-color nav-pad">
        <div className="container-fluid ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <img src="/images/logogg.png" className="image" alt="logo"/>
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
              {foodPointName === "nescafe" || foodPointName === "silver-spoon" || foodPointName === "apno-gaon" || foodPointName === "tmp" ? (
                <SearchInput />):(<></>)}
              {foodPointName === "nescafe" || foodPointName === "silver-spoon" || foodPointName === "apno-gaon" || foodPointName === "tmp" || foodPointName =="login" || foodPointName === "register" || foodPointName === "dashboard" ? (
                <li className="nav-item nav-decor">
                <NavLink to="/" className="nav-link nav-decor">
                  Home
                </NavLink>
              </li>
              ):(
                <></>
              )}
              {foodPointName === "nescafe" || foodPointName === "silver-spoon" || foodPointName === "apno-gaon" || foodPointName === "tmp" ? (
                <li className="nav-item dropdown nav-decor ">
                  <Link
                    className="nav-link dropdown-toggle nav-decor"
                    to={"/" + foodPointName + "/categories"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu ">
                    <li>
                      <Link
                        className="dropdown-item"
                        to={"/" + foodPointName + "/categories"}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/${foodPointName}/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                  <></>
              )}
              {!auth?.token ? (
                <>
                  <li className="nav-item nav-decor">
                    <NavLink to="/register" className="nav-link nav-decor">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item nav-decor">
                    <NavLink to="/login" className="nav-link nav-decor">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown nav-decor">
                    <NavLink
                      className="nav-link dropdown-toggle nav-decor"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu nav-decor">
                      {auth?.user?.role === 2 && foodPointName === "" ? (
                        <>
                          <li className=" nav-decor">
                            <NavLink
                              to={`/dashboard/nescafe/admin`}
                              className="dropdown-item "
                            >
                              Nescafe 
                            </NavLink>
                          </li>
                          <li className=" nav-decor">
                            <NavLink
                              to={`/dashboard/tmp/admin`}
                              className="dropdown-item "
                            >
                              TMP 
                            </NavLink>
                          </li>
                          <li className=" nav-decor">
                            <NavLink
                              to={`/dashboard/silver-spoon/admin`}
                              className="dropdown-item "
                            >
                              Silver Spoon 
                            </NavLink>
                          </li>
                          <li className=" nav-decor">
                            <NavLink
                              to={`/dashboard/apno-gaon/admin`}
                              className="dropdown-item "
                            >
                              Apno Gaon 
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <li className=" nav-decor">
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 2
                                ? foodPointName + "/admin"
                                : auth?.user?.role === 1
                                ? auth?.user?.outlet + "/admin"
                                : "user"
                            }`}
                            className="dropdown-item "
                          >
                            Dashboard
                          </NavLink>
                        </li>
                      )}
                      <li className="nav-decor">
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {foodPointName === "nescafe" || foodPointName === "silver-spoon" || foodPointName === "apno-gaon" || foodPointName === "tmp" ? (
                <li className="nav-item ">
                <NavLink
                  to={"/" + foodPointName + "/cart"}
                  className="nav-link "
                >
                  <Badge
                    count={cart?.length}
                    showZero
                    offset={[45, -5]}
                    className="cart-decor"
                  >
                    Cart
                  </Badge>
                </NavLink>
              </li>
              ):(
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
