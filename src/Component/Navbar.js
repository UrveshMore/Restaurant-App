import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

import { useCart } from "./ContextReducer";
import Cart from "./Cart";
import Modal from "../Modal";

export default function Navbar(props) {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  localStorage.setItem("temp", "first");
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  const items = useCart();
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
        style={{
          boxShadow: "0px 10px 20px black",
          filter: "blur(20)",
          position: "fixed",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 mx-3 active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>{" "}
                {/* index.css - nav-link color white */}
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 mx-3 active"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>{" "}
                  {/* index.css - nav-link color white */}
                </li>
              ) : (
                ""
              )}
            </ul>
            <div>
              <div
                className="btn bg-white text-success mx-2 "
                onClick={() => setCartView(true)}
              >
                My Cart {""}
                <Badge pill bg="danger">
                  {data.length}
                </Badge>
              </div>

              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart></Cart>
                </Modal>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
