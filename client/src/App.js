import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="app">
      <Router>
        <Link to="/users">Users</Link>
        <Link to="/">Login</Link>
        <Routes>
          <Route path="users" element={<UserList />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
