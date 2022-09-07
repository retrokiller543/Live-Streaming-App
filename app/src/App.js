import { Routes, Route } from "react-router-dom";

import { Register, Video, UserProfile, Login } from "./pages/index";

// import Flvplayer from "./components/FlvPlayer";

import "./App.css";

const App = () => {
  return (
    <div>
      The comp is loading...
      <Routes>
        <Route path="/" element={<Video />} />
        <Route path="/users/user/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
