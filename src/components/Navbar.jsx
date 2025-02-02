import React from "react";
import { Navigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  return (
    <div className="navbar">
      <h1>🍿BingeBox</h1>
      <div id="navLinkCont">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/movies"}>Movies</NavLink>
        {token == null ? (
          <button onClick={() => <NavLink to={"/login"}></NavLink>}>
            Login
          </button>
        ) : (
          <button
            className="logoutBtn"
            onClick={() => {
              localStorage.removeItem("token");
              <Navigate to={"/login"} />;
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
