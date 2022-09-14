import { Routes, Route } from "react-router-dom";
import { axios } from "../api/index";

import { Register, Video, UserProfile, Login } from "./pages/index";

import "./App.css";

const API_URL = "/api/users/retUsers";

const App = () => {
  const getUsers = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      });
      return JSON.parse(res.users);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="App">
      <Routes>
        {getUsers().map((user, index) => {
          return (
            <div>
              <Route
                key={index}
                path={`/users/${user}/profile`}
                element={<UserProfile />}
              />
              <Route path={`/users/${user}/live`} element={<Video />} />
            </div>
          );
        })}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
};

export default App;
