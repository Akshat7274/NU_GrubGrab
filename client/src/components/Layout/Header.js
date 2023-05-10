import React , {useState, useEffect} from "react";
import axios from "axios";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "../Layout/nav.css";

const Header = (userDetails) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
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
        },
        token: data.token,
      });
      localStorage.setItem("auth", JSON.stringify({token: data.token, isGoogle: data.isGoogle}));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		{getUser();}
	}, []);

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = async () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    const data_new = await axios.post("/api/v1/auth/black", {token:JSON.parse(localStorage.getItem("auth")).token})
    alert(data_new)
    localStorage.removeItem("auth");
    try {
      const data = await axios.post("/api/v1/auth/google/logout")
      toast.success("Google Logout handled")
    } catch (error) {
      console.log(error);
    }
    toast.success("Logout Successfully");
    navigate("/")

  };
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top custom nav-color nav-pad" >
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
          <img
                src="/images/logogg.png"
                className="image"
                alt="logo"
              />
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item nav-decor">
                <NavLink to="/" className="nav-link nav-decor" >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown nav-decor ">
                <Link
                  className="nav-link dropdown-toggle nav-decor"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu ">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
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
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item "
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className=" nav-decor">
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
              <li className="nav-item ">
                <NavLink to="/cart" className="nav-link ">
                  <Badge count={cart?.length} showZero offset={[45, -5]} className="cart-decor">
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
