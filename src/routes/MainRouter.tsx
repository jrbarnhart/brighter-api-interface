import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Regions from "@/pages/regions/Regions";
import { BrowserRouter, Route, Routes } from "react-router";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        {/* Regions */}
        <Route path="/regions" element={<Regions />} />
        {/* Rooms */}
        {/* Skills */}
        {/* Monsters */}
        {/* Resources */}
        {/* Items */}
        {/* Npcs */}
        {/* Quests */}
      </Routes>
    </BrowserRouter>
  );
}
