import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <div>
      <h1>BingeBox</h1>
      <div id="navLinkCont">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/movies"}>Movies</NavLink>
        {token == null ? (
          <NavLink to={"/login"}>Login</NavLink>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
