import { Routes, Route } from "react-router-dom";

import { Login, UserProfile, Video } from "./pages/index";

import { Register } from "./pages/Register";

// import Flvplayer from "./components/FlvPlayer";

import "./App.css";

const App = () => {
  <main>
    <Register />
    <Routes>
      <Route path="/" element={<Video />} />
      <Route path="/users/user/profile" element={<UserProfile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </main>;
};

export default App;
