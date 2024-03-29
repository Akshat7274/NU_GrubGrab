import { Routes, Route, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import OtpForm from "./pages/otp/OtpForm";
import {message} from "antd"
import LandingPage from "./pages/LadningPage/LandingPage";
import ComingsoonA from "./pages/LadningPage/ComingSoonA";
import ComingsoonS from "./pages/LadningPage/ComingSoonS";
import ComingsoonT from "./pages/LadningPage/ComingSoonT";

function App() {
  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `/api/v1/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
      getUser()
	}, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} />
        <Route path="/coming-soon-apno" element={<ComingsoonA />} />
        <Route path="/coming-soon-tmp" element={<ComingsoonT />} />
        <Route path="/coming-soon-silver" element={<ComingsoonS />} />
        <Route path="/nescafe" element={<HomePage user={user} />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<OtpForm />} />
        <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export function ProtectedRoute(props) {
  const auth = JSON.parse(localStorage.getItem('auth'))
  if(auth){
    message.error("Already Logged In")
    window.location.href = "/"
  }else{
    return props.children;
  }
}

export default App;
