import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import Regions from "@/features/regions/pages/Regions";
import CreateRegionForm from "@/features/regions/components/CreateRegionForm";
import Nav from "@/components/nav/Nav";
import RegionsIndex from "@/features/regions/components/RegionsIndex";
import Region from "@/features/regions/components/Region";

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
            <Route index element={<RegionsIndex />} />
            <Route path=":id" element={<Region />} />
            <Route path="create" element={<CreateRegionForm />} />
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
