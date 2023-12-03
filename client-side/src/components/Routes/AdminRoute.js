import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const currentURL = location.pathname;

  const segments = currentURL.split("/");
  console.log(segments)

  let foodPointName = "";
  for (let i = 0; i < segments.length; i++) {
    if (segments[i] == "nescafe" || segments[i] == "tmp" || segments[i]=="silver-spoon" || segments[i] == "apno-gaon") {
      foodPointName = segments[i];
      break;
    }
  }

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.post("/api/v1/auth/admin-auth",{email:auth.user.email, outlet:foodPointName});
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      } 
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
