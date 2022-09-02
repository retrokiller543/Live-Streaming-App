import { Routes, Route } from "react-router-dom";

import { Login, UserProfile, Video } from "./pages/index";

// import Flvplayer from "./components/FlvPlayer";

import "./App.css";

// const checkLoginStatus = () => {};

// const checkToken = (to, from, next) => {
//   console.log(to);
//   console.log(from);
//   console.log(next);
//   next();
// };

const App = () => {
  <Routes>
    <Route path="/" element={<Video />} />
    <Route path="/users/user/profile" element={<UserProfile />} />
    <Route path="/login" element={<Login />} />
  </Routes>;
};

export default App;
