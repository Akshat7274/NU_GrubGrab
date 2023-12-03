import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <h5 className="text-center">All Right Reserved &copy; NU GrubGrab</h5>
      <h6 classname="text-center">For any queries contact: nugrubgrab@gmail.com</h6>
      <p className="text-center mt-6">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
