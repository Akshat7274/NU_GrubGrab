import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author, userDetails }) => {
  // const [user, setUser] = useState(null);
  // if ({ userDetails }) {
  //   console.log(userDetails);
  //   setUser(userDetails.user);
  // }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {/* <button onClick={() => {alert(user.name)}}>click</button> */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "NU GrubGrab Category",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Techinfoyt",
};

export default Layout;
