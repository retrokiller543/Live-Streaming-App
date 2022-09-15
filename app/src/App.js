import { Routes, Route } from "react-router-dom";
import { axios } from "./api/index";

import { Register, Video, UserProfile, Login } from "./pages/index";

import "./App.css";

const API_URL = "/api/user/retUsers";

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
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  let users = Array();
  users = getUsers();
  console.log(users);
  return (
    <main className="App">
      <Routes>
        {users.map((user) => {
          return (
            <div>
              <Route
                key={user.uuid}
                path={`/users/${user.username}/profile`}
                element={<UserProfile />}
              />
              <Route
                key={user.uuid}
                path={`/users/${user.username}/live`}
                element={<Video />}
              />
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
