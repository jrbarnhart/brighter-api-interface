import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import Regions from "@/features/regions/pages/Regions";
import RegionsForm from "@/features/regions/components/RegionsForm";
import Nav from "@/components/nav/Nav";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route index element={<Home />} />
          {/* Auth */}
          <Route path="login" element={<Login />} />
          {/* Regions */}
          <Route path="regions" element={<Regions />}>
            <Route path="create" element={<RegionsForm />} />
          </Route>
          {/* Rooms */}
          {/* Skills */}
          {/* Monsters */}
          {/* Resources */}
          {/* Items */}
          {/* Npcs */}
          {/* Quests */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
