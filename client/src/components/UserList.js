import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h2>Users List Component: </h2>
      {users.map((user, index) => (
        <p key={index}>
          {user.username}, {user.password}
        </p>
      ))}
    </div>
  );
};

export default UserList;
