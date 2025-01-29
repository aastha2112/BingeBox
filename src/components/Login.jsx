import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);

    axios({
      url: `https://inexpensive-spicy-principle.glitch.me/login`,

      method: "POST",
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => (err.response.data.success ? null : setError(true)))
      .finally(() => {
        setUsername("");
        setPassword("");
        navigate("/movies");
      });
  }

  return (
    <div>
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Login Here...</h2>
        <label htmlFor="name"> Username:</label>

        <input
          type="text"
          id="name"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && <p>Try username: user </p>}
        <label htmlFor="pswd"> Password:</label>

        <input
          type="password"
          id="pswd"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>Try password : user123 </p>}

        <input type="submit" value={"Login"} />
      </form>
    </div>
  );
}
