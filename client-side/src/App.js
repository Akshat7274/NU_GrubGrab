import { Routes, Route, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";

import AdminRoute from "./components/Routes/AdminRoute";

import nescafeHomePage from "./nescafePages/HomePage";
import tmpHomePage from "./tmpPages/HomePage";
import silverHomePage from "./silverPages/HomePage";
import apnoHomePage from "./apnoPages/HomePage";

import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

import tmpUsers from "./tmpPages/Admin/Users";
import tmpAdminDashboard from "./tmpPages/Admin/AdminDashboard";
import tmpCreateCategory from "./tmpPages/Admin/CreateCategory";
import tmpCreateProduct from "./tmpPages/Admin/CreateProduct";
import tmpProducts from "./tmpPages/Admin/Products";
import tmpUpdateProduct from "./tmpPages/Admin/UpdateProduct";
import tmpSearch from "./tmpPages/Search";
import tmpProductDetails from "./tmpPages/ProductDetails";
import tmpCategories from "./tmpPages/Categories";
import tmpCategoryProduct from "./tmpPages/CategoryProduct";
import tmpCartPage from "./tmpPages/CartPage";
import tmpAdminOrders from "./tmpPages/Admin/AdminOrders";

import silverUsers from "./silverPages/Admin/Users";
import silverAdminDashboard from "./silverPages/Admin/AdminDashboard";
import silverCreateCategory from "./silverPages/Admin/CreateCategory";
import silverCreateProduct from "./silverPages/Admin/CreateProduct";
import silverProducts from "./silverPages/Admin/Products";
import silverUpdateProduct from "./silverPages/Admin/UpdateProduct";
import silverSearch from "./silverPages/Search";
import silverProductDetails from "./silverPages/ProductDetails";
import silverCategories from "./silverPages/Categories";
import silverCategoryProduct from "./silverPages/CategoryProduct";
import silverCartPage from "./silverPages/CartPage";
import silverAdminOrders from "./silverPages/Admin/AdminOrders";

import apnoUsers from "./apnoPages/Admin/Users";
import apnoAdminDashboard from "./apnoPages/Admin/AdminDashboard";
import apnoCreateCategory from "./apnoPages/Admin/CreateCategory";
import apnoCreateProduct from "./apnoPages/Admin/CreateProduct";
import apnoProducts from "./apnoPages/Admin/Products";
import apnoUpdateProduct from "./apnoPages/Admin/UpdateProduct";
import apnoSearch from "./apnoPages/Search";
import apnoProductDetails from "./apnoPages/ProductDetails";
import apnoCategories from "./apnoPages/Categories";
import apnoCategoryProduct from "./apnoPages/CategoryProduct";
import apnoCartPage from "./apnoPages/CartPage";
import apnoAdminOrders from "./apnoPages/Admin/AdminOrders";

import nescafeUsers from "./nescafePages/Admin/Users";
import nescafeAdminDashboard from "./nescafePages/Admin/AdminDashboard";
import nescafeCreateCategory from "./nescafePages/Admin/CreateCategory";
import nescafeCreateProduct from "./nescafePages/Admin/CreateProduct";
import nescafeProducts from "./nescafePages/Admin/Products";
import nescafeUpdateProduct from "./nescafePages/Admin/UpdateProduct";
import nescafeSearch from "./nescafePages/Search";
import nescafeProductDetails from "./nescafePages/ProductDetails";
import nescafeCategories from "./nescafePages/Categories";
import nescafeCategoryProduct from "./nescafePages/CategoryProduct";
import nescafeCartPage from "./nescafePages/CartPage";
import nescafeAdminOrders from "./nescafePages/Admin/AdminOrders";


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

        <Route path="/tmp" element={<tmpHomePage user={user} />} >
          <Route path="product/:slug" element={<tmpProductDetails />} />
          <Route path="categories" element={<tmpCategories />} />
          <Route path="cart" element={<tmpCartPage />} />
          <Route path="category/:slug" element={<tmpCategoryProduct />} />
          <Route path="search" element={<tmpSearch />} />
        </Route>
        <Route path="/dashboard/tmp" element={<AdminRoute />}>
          <Route path="admin" element={<tmpAdminDashboard />} />
          <Route path="admin/create-category" element={<tmpCreateCategory />} />
          <Route path="admin/create-product" element={<tmpCreateProduct />} />
          <Route path="admin/product/:slug" element={<tmpUpdateProduct />} />
          <Route path="admin/products" element={<tmpProducts />} />
          <Route path="admin/users" element={<tmpUsers />} />
          <Route path="admin/orders" element={<tmpAdminOrders />} />
        </Route>

        <Route path="/apno-gaon" element={<apnoHomePage user={user} />} >
          <Route path="product/:slug" element={<apnoProductDetails />} />
          <Route path="categories" element={<apnoCategories />} />
          <Route path="cart" element={<apnoCartPage />} />
          <Route path="category/:slug" element={<apnoCategoryProduct />} />
          <Route path="search" element={<apnoSearch />} />
        </Route>
        <Route path="/dashboard/apno-gaon" element={<AdminRoute />}>
          <Route path="admin" element={<apnoAdminDashboard />} />
          <Route path="admin/create-category" element={<apnoCreateCategory />} />
          <Route path="admin/create-product" element={<apnoCreateProduct />} />
          <Route path="admin/product/:slug" element={<apnoUpdateProduct />} />
          <Route path="admin/products" element={<apnoProducts />} />
          <Route path="admin/users" element={<apnoUsers />} />
          <Route path="admin/orders" element={<apnoAdminOrders />} />
        </Route>

        <Route path="/silver-spoon" element={<silverHomePage user={user} />} >
          <Route path="product/:slug" element={<silverProductDetails />} />
          <Route path="categories" element={<silverCategories />} />
          <Route path="cart" element={<silverCartPage />} />
          <Route path="category/:slug" element={<silverCategoryProduct />} />
          <Route path="search" element={<silverSearch />} />
        </Route>
        <Route path="/dashboard/silver-spoon" element={<AdminRoute />}>
          <Route path="admin" element={<silverAdminDashboard />} />
          <Route path="admin/create-category" element={<silverCreateCategory />} />
          <Route path="admin/create-product" element={<silverCreateProduct />} />
          <Route path="admin/product/:slug" element={<silverUpdateProduct />} />
          <Route path="admin/products" element={<silverProducts />} />
          <Route path="admin/users" element={<silverUsers />} />
          <Route path="admin/orders" element={<silverAdminOrders />} />
        </Route>

        <Route path="/nescafe" element={<nescafeHomePage user={user} />} >
          <Route path="product/:slug" element={<nescafeProductDetails />} />
          <Route path="categories" element={<nescafeCategories />} />
          <Route path="cart" element={<nescafeCartPage />} />
          <Route path="category/:slug" element={<nescafeCategoryProduct />} />
          <Route path="search" element={<nescafeSearch />} />
        </Route>
        <Route path="/dashboard/nescafe" element={<AdminRoute />}>
          <Route path="admin" element={<nescafeAdminDashboard />} />
          <Route path="admin/create-category" element={<nescafeCreateCategory />} />
          <Route path="admin/create-product" element={<nescafeCreateProduct />} />
          <Route path="admin/product/:slug" element={<nescafeUpdateProduct />} />
          <Route path="admin/products" element={<nescafeProducts />} />
          <Route path="admin/users" element={<nescafeUsers />} />
          <Route path="admin/orders" element={<nescafeAdminOrders />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
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
