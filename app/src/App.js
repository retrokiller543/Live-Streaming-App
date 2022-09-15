import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { axios } from "./api/index";

import { Register, Live, UserProfile, Login, Home } from "./pages/index";

import { useStateContext } from "./contexts/ContextProvider";

import "./App.css";

const API_URL = "/api/user/retUsers";

const App = () => {
  const { setUsers } = useStateContext();
  useEffect(() => {
    const fetchUsers = async () => {
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
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users/:user/profile" element={<UserProfile />} />
        <Route path="/users/:user/Live" element={<Live />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
};

export default App;
