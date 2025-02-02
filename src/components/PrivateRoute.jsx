import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  let token = localStorage.getItem(null || "token");
  return <>{token == null ? <Navigate to={"/login"} /> : children}</>;
}
