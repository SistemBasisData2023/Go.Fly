import React, { useRef, useState, useEffect } from "react";

import { Container, Row, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/images/logo1.png";
import "./header.css";

const Header = () => {
  const headerRef = useRef(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Retrieve user information from local storage
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userFromLocalStorage);
  }, []);


  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("isadmin");
    localStorage.removeItem("surname");
    setUser(null);
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  return (
    <header className="header" ref={headerRef}>
      <Row>
        <div
          className="nav_wrapper d-flex align-items-center
            justify-content-between"
        >
          {/* Logo Start*/}
          <Link to="/flight">
            <div className="Logo">
              <img src={logo} alt="" />
            </div>
          </Link>
          {/* Logo End */}

          <div className="nav_right d-flex align-items-center gap-4">
            {user !== null ? (
              <div className="nav_btn d-flex align-items-center gap-4">
                <div className="username">
                  <h5>{user.surname}</h5>
                </div>
                <Button className="btn primary_btn">
                    <Link onClick={logout}>Logout</Link>
                </Button>
              </div>
            ) : (
              <div className="nav_btn d-flex align-items-center gap-4">
                <Button className="btn secondary_btn">
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="btn primary_btn">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Row>
    </header>
  );
};

export default Header;
