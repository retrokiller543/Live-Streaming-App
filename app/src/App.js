import { Routes, Route } from "react-router-dom";

import { Register, Video, UserProfile, Login, Home } from "./pages/index";

import "./App.css";

const App = () => {
  return (
    <main className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users/:user/profile" element={<UserProfile />} />
        <Route path="/users/:user/video" element={<Video />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
};

export default App;
