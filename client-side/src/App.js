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

import NescafeHomePage from "./nescafePages/HomePage";
import TmpHomePage from "./tmpPages/HomePage";
import SilverHomePage from "./silverPages/HomePage";
import ApnoHomePage from "./apnoPages/HomePage";

import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

import TmpUsers from "./tmpPages/Admin/Users";
import TmpAdminDashboard from "./tmpPages/Admin/AdminDashboard";
import TmpCreateCategory from "./tmpPages/Admin/CreateCategory";
import TmpCreateProduct from "./tmpPages/Admin/CreateProduct";
import TmpProducts from "./tmpPages/Admin/Products";
import TmpUpdateProduct from "./tmpPages/Admin/UpdateProduct";
import TmpSearch from "./tmpPages/Search";
import TmpProductDetails from "./tmpPages/ProductDetails";
import TmpCategories from "./tmpPages/Categories";
import TmpCategoryProduct from "./tmpPages/CategoryProduct";
import TmpCartPage from "./tmpPages/CartPage";
import TmpAdminOrders from "./tmpPages/Admin/AdminOrders";

import SilverUsers from "./silverPages/Admin/Users";
import SilverAdminDashboard from "./silverPages/Admin/AdminDashboard";
import SilverCreateCategory from "./silverPages/Admin/CreateCategory";
import SilverCreateProduct from "./silverPages/Admin/CreateProduct";
import SilverProducts from "./silverPages/Admin/Products";
import SilverUpdateProduct from "./silverPages/Admin/UpdateProduct";
import SilverSearch from "./silverPages/Search";
import SilverProductDetails from "./silverPages/ProductDetails";
import SilverCategories from "./silverPages/Categories";
import SilverCategoryProduct from "./silverPages/CategoryProduct";
import SilverCartPage from "./silverPages/CartPage";
import SilverAdminOrders from "./silverPages/Admin/AdminOrders";

import ApnoUsers from "./apnoPages/Admin/Users";
import ApnoAdminDashboard from "./apnoPages/Admin/AdminDashboard";
import ApnoCreateCategory from "./apnoPages/Admin/CreateCategory";
import ApnoCreateProduct from "./apnoPages/Admin/CreateProduct";
import ApnoProducts from "./apnoPages/Admin/Products";
import ApnoUpdateProduct from "./apnoPages/Admin/UpdateProduct";
import ApnoSearch from "./apnoPages/Search";
import ApnoProductDetails from "./apnoPages/ProductDetails";
import ApnoCategories from "./apnoPages/Categories";
import ApnoCategoryProduct from "./apnoPages/CategoryProduct";
import ApnoCartPage from "./apnoPages/CartPage";
import ApnoAdminOrders from "./apnoPages/Admin/AdminOrders";

import NescafeUsers from "./nescafePages/Admin/Users";
import NescafeAdminDashboard from "./nescafePages/Admin/AdminDashboard";
import NescafeCreateCategory from "./nescafePages/Admin/CreateCategory";
import NescafeCreateProduct from "./nescafePages/Admin/CreateProduct";
import NescafeProducts from "./nescafePages/Admin/Products";
import NescafeUpdateProduct from "./nescafePages/Admin/UpdateProduct";
import NescafeSearch from "./nescafePages/Search";
import NescafeProductDetails from "./nescafePages/ProductDetails";
import NescafeCategories from "./nescafePages/Categories";
import NescafeCategoryProduct from "./nescafePages/CategoryProduct";
import NescafeCartPage from "./nescafePages/CartPage";
import NescafeAdminOrders from "./nescafePages/Admin/AdminOrders";


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

        <Route path="/tmp">
          <Route path="" element={<TmpHomePage user={user} />} />
          <Route path="product/:slug" element={<TmpProductDetails />} />
          <Route path="categories" element={<TmpCategories />} />
          <Route path="cart" element={<TmpCartPage />} />
          <Route path="category/:slug" element={<TmpCategoryProduct />} />
          <Route path="search" element={<TmpSearch />} />
        </Route>
        <Route path="/dashboard/tmp" element={<AdminRoute />}>
          <Route path="admin" element={<TmpAdminDashboard />} />
          <Route path="admin/create-category" element={<TmpCreateCategory />} />
          <Route path="admin/create-product" element={<TmpCreateProduct />} />
          <Route path="admin/product/:slug" element={<TmpUpdateProduct />} />
          <Route path="admin/products" element={<TmpProducts />} />
          <Route path="admin/users" element={<TmpUsers />} />
          <Route path="admin/orders" element={<TmpAdminOrders />} />
        </Route>

        <Route path="/apno-gaon"  >
          <Route path="" element={<ApnoHomePage user={user} />} />
          <Route path="product/:slug" element={<ApnoProductDetails />} />
          <Route path="categories" element={<ApnoCategories />} />
          <Route path="cart" element={<ApnoCartPage />} />
          <Route path="category/:slug" element={<ApnoCategoryProduct />} />
          <Route path="search" element={<ApnoSearch />} />
        </Route>
        <Route path="/dashboard/apno-gaon" element={<AdminRoute />}>
          <Route path="admin" element={<ApnoAdminDashboard />} />
          <Route path="admin/create-category" element={<ApnoCreateCategory />} />
          <Route path="admin/create-product" element={<ApnoCreateProduct />} />
          <Route path="admin/product/:slug" element={<ApnoUpdateProduct />} />
          <Route path="admin/products" element={<ApnoProducts />} />
          <Route path="admin/users" element={<ApnoUsers />} />
          <Route path="admin/orders" element={<ApnoAdminOrders />} />
        </Route>

        <Route path="/silver-spoon" >
          <Route path="" element={<SilverHomePage user={user} />}  />
          <Route path="product/:slug" element={<SilverProductDetails />} />
          <Route path="categories" element={<SilverCategories />} />
          <Route path="cart" element={<SilverCartPage />} />
          <Route path="category/:slug" element={<SilverCategoryProduct />} />
          <Route path="search" element={<SilverSearch />} />
        </Route>
        <Route path="/dashboard/silver-spoon" element={<AdminRoute />}>
          <Route path="admin" element={<SilverAdminDashboard />} />
          <Route path="admin/create-category" element={<SilverCreateCategory />} />
          <Route path="admin/create-product" element={<SilverCreateProduct />} />
          <Route path="admin/product/:slug" element={<SilverUpdateProduct />} />
          <Route path="admin/products" element={<SilverProducts />} />
          <Route path="admin/users" element={<SilverUsers />} />
          <Route path="admin/orders" element={<SilverAdminOrders />} />
        </Route>

        <Route path="/nescafe">
          <Route path="" element={<NescafeHomePage user={user} />} />
          <Route path="product/:slug" element={<NescafeProductDetails />} />
          <Route path="categories" element={<NescafeCategories />} />
          <Route path="cart" element={<NescafeCartPage />} />
          <Route path="category/:slug" element={<NescafeCategoryProduct />} />
          <Route path="search" element={<NescafeSearch />} />
        </Route>
        <Route path="/dashboard/nescafe" element={<AdminRoute />}>
          <Route path="admin" element={<NescafeAdminDashboard />} />
          <Route path="admin/create-category" element={<NescafeCreateCategory />} />
          <Route path="admin/create-product" element={<NescafeCreateProduct />} />
          <Route path="admin/product/:slug" element={<NescafeUpdateProduct />} />
          <Route path="admin/products" element={<NescafeProducts />} />
          <Route path="admin/users" element={<NescafeUsers />} />
          <Route path="admin/orders" element={<NescafeAdminOrders />} />
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
