import { Routes, Route } from "react-router-dom";

import { Register, Video, UserProfile, Login } from "./pages/index";

import "./App.css";

const App = () => {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Video />} />
        <Route path="/users/user/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
};

export default App;
