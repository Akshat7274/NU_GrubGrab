import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
  
  const fetchUserDetails = async (token) => {
    try {
      const resp = await axios.post("/api/v1/auth/user-token",{token:token})
      if(resp.status === 400){
        localStorage.removeItem("auth")
      }
      const user = {
        _id: resp.data._id,
        name: resp.data.name,
        email: resp.data.email,
        phone: resp.data.phone,
        role: resp.data.role,
      }
      console.log(user)
      setAuth({
            ...auth, 
            user: user,
            token: token,
          });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      fetchUserDetails(parseData.token)
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
