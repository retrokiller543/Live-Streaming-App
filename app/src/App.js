import { Routes, Route } from "react-router-dom";
import { axios } from "../api/index";

import { Register, Video, UserProfile, Login } from "./pages/index";

import "./App.css";

const API_URL = "/api/users/";

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
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="App">
      <Routes>
        {Object.values(getUsers()).map((value, index) => {
          return (
            <div>
              <Route
                key={index}
                path={`/users/${value}/profile`}
                element={<UserProfile />}
              />
              <Route path={`/users/${value}/live`} element={<Video />} />
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
