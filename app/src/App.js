import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { axios } from "./api/index";

import { Register, UserProfile, Login } from "./pages/index";

import "./App.css";

const API_URL = "/api/user/retUsers";

const App = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        });
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  });

  return (
    <main className="App">
      <Routes>
        {users.map((user) => {
          return (
            <Route
              key={user.uuid}
              path={`/users/${user.username}/profile`}
              element={<UserProfile />}
            />
          );
        })}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
};

export default App;
