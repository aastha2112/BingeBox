import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Oops! Page Not Found.</h2>
      <p>Redirect to Home page?</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
