import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.username === "" || state.password === "") {
      setError("Username and Password are required fields");
    } else if (state.password.length < 3) {
      setError("Password must be at least 3 characters");
    } else {
      axios
        .post("http://localhost:9000/api/auth/login", state)
        .then((res) => {
          console.log(res);
          setCurrentUser(res.data.username);
        })
        .catch((err) => {
          console.log(err);
        });
      setState({ username: "", password: "" });
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={state.username}
          placeholder="Username"
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={state.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {error ? (
        <p style={{ color: "red", fontSize: "16px", marginTop: "20px" }}>
          {error}
        </p>
      ) : (
        <span></span>
      )}
      {currentUser && <p>Welcome {currentUser}</p>}
    </div>
  );
};

export default Login;
