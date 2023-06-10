import React from "react";
import { FaTwitter, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="logo-wrapper">
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <div className="menu-wrapper">
            Menu
            <a>Home</a>
            <a>Term and Condition</a>
          </div>
          <div className="menu-wrapper">
            Contact
            <span>Email: gofly@gmail.com</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="sosmed-wrapper">
        <div>
          <FaTwitter />
          <FaInstagram />
          <FaFacebookSquare />
        </div>
        <p>© 2023 GoFly incorporated</p>
      </div>
    </footer>
  );
};

export default Footer;
