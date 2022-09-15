import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { axios } from "./api/index";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Register, Live, UserProfile, Login, Home } from "./pages/index";
import { Sidebar, Navbar, Users } from "./components/index";

import { useStateContext } from "./contexts/ContextProvider";

import "./App.css";

const API_URL = "/api/user/retUsers";

const App = () => {
  const { setUsers, activeMenu } = useStateContext();
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
    <div className="flex dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <TooltipComponent content="Settings" position="top">
          <button
            type="button"
            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light- text-white"
            style={{ background: "blue", borderRadius: "50%" }}
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={`dark:bg-main bg-main-bg min-h-screen w-full

            ${activeMenu ? "md:ml-72" : "flex-2"}`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>

        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            {/* Replace later */}
            <Route path="/users/videos" element={<Live />} />
            <Route path="/users/:user/profile" element={<UserProfile />} />
            <Route path="/users/:user/Live" element={<Live />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
