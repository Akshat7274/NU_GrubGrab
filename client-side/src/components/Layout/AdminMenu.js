import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const currentURL = location.pathname;

  const segments = currentURL.split("/");

  let foodPointName = "";
  for (let i = 0; i < segments.length; i++) {
    if (segments[i] == "nescafe" || segments[i] == "tmp" || segments[i]=="silver-spoon" || segments[i] == "apno-gaon") {
      foodPointName = segments[i];
      break;
    }
  }
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            // to="/dashboard/admin/create-category"
            to={`/dashboard/${
              auth?.user?.role === 2 ? foodPointName+"/admin/create-category" : auth?.user?.role === 1 ? auth?.user?.outlet+"/admin/create-category" :"user"
            }`}
            className="list-group-item contain custom-active"
            activeClassName="active"
          >
            Create Category
          </NavLink>
          <NavLink
            // to="/dashboard/admin/create-product"
            to={`/dashboard/${
              auth?.user?.role === 2 ? foodPointName+"/admin/create-product" : auth?.user?.role === 1 ? auth?.user?.outlet+"/admin/create-product" :"user"
            }`}
            className="list-group-item contain custom-active"
            activeClassName="active"
          >
            Create Product
          </NavLink>
          <NavLink
            // to="/dashboard/admin/products"
            to={`/dashboard/${
              auth?.user?.role === 2 ? foodPointName+"/admin/products" : auth?.user?.role === 1 ? auth?.user?.outlet+"/admin/products" :"user"
            }`}
            className="list-group-item contain custom-active"
            activeClassName="active"
          >
            Products
          </NavLink>
          <NavLink
            // to="/dashboard/admin/orders"
            to={`/dashboard/${
              auth?.user?.role === 2 ? foodPointName+"/admin/orders" : auth?.user?.role === 1 ? auth?.user?.outlet+"/admin/orders" :"user"
            }`}
            className="list-group-item contain custom-active"
            activeClassName="active"
          >
            Orders
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
