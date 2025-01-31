import Home from "@/pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import RegionsLayout from "@/features/regions/layouts/RegionsLayout";
import CreateRegionForm from "@/features/regions/components/CreateRegionForm";
import Nav from "@/components/nav/Nav";
import Login from "@/features/auth/pages/Login";
import RoomsLayout from "@/features/rooms/layouts/RoomsLayout";
import RoomsIndex from "@/features/rooms/pages/RoomsIndex";
import CreateRoomForm from "@/features/rooms/components/CreateRoomForm";
import RegionsIndex from "@/features/regions/pages/RegionsIndex";
import RegionDetails from "@/features/regions/pages/RegionDetails";
import RoomDetails from "@/features/rooms/pages/RoomDetails";
import SkillsLayout from "@/features/skills/layouts/SkillsLayout";
import CombatSkillLayout from "@/features/skills/combat/layouts/CombatSkillLayout";
import CreateCombatSkillForm from "@/features/skills/combat/components/CreateCombatSkillForm";
import CombatSkillsIndex from "@/features/skills/combat/pages/CombatSkillsIndex";
import SkillsIndex from "@/features/skills/pages/SkillsIndex";
import CombatSkillRequirementsLayout from "@/features/skills/combat/requirements/layouts/CombatSkillRequirementsLayout";
import CombatSkillRequirementsIndex from "@/features/skills/combat/requirements/pages/CombatSkillRequirementsIndex";
import CreateCombatSkillRequirementForm from "@/features/skills/combat/requirements/components/CreateCombatSkillRequirementForm";
import CombatSkillDetails from "@/features/skills/combat/pages/CombatSkillDetails";
import CombatSkillRequirementDetails from "@/features/skills/combat/requirements/pages/CombatSkillRequirementDetails";
import CraftingSkillRequirementsLayout from "@/features/skills/crafting/requirements/layouts/CombatSkillRequirementsLayout";
import CraftingSkillRequirementsIndex from "@/features/skills/crafting/requirements/pages/CraftingSkillRequirementsIndex";
import CraftingSkillRequirementDetails from "@/features/skills/crafting/requirements/pages/CraftingSkillRequirementDetails";
import CreateCraftingSkillRequirementForm from "@/features/skills/crafting/requirements/components/CreateCraftingSkillRequirementForm";
import CraftingSkillLayout from "@/features/skills/crafting/layouts/CraftingSkillLayout";
import CraftingSkillsIndex from "@/features/skills/crafting/pages/CraftingSkillsIndex";
import CraftingSkillDetails from "@/features/skills/crafting/pages/CraftingSkillDetails";
import CreateCraftingSkillForm from "@/features/skills/crafting/components/CreateCraftingSkillForm";
import RecipesLayout from "@/features/skills/crafting/recipes/layouts/RecipesLayout";
import RecipesIndex from "@/features/skills/crafting/recipes/pages/RecipesIndex";
import RecipeDetails from "@/features/skills/crafting/recipes/pages/RecipeDetails";
import CreateRecipeForm from "@/features/skills/crafting/recipes/components/CreateRecipeForm";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route index element={<Home />} />
          {/* Auth */}
          <Route path="login" element={<Login />} />
          {/* Regions */}
          <Route path="regions" element={<RegionsLayout />}>
            <Route index element={<RegionsIndex />} />
            <Route path=":id" element={<RegionDetails />} />
            <Route path="create" element={<CreateRegionForm />} />
          </Route>
          {/* Rooms */}
          <Route path="rooms" element={<RoomsLayout />}>
            <Route index element={<RoomsIndex />} />
            <Route path=":id" element={<RoomDetails />} />
            <Route path="create" element={<CreateRoomForm />} />
          </Route>
          {/* Skills */}
          <Route
            path="skills/combat/requirements"
            element={<CombatSkillRequirementsLayout />}
          >
            <Route index element={<CombatSkillRequirementsIndex />} />
            <Route path=":id" element={<CombatSkillRequirementDetails />} />
            <Route
              path="create"
              element={<CreateCombatSkillRequirementForm />}
            />
          </Route>
          <Route path="skills/combat" element={<CombatSkillLayout />}>
            <Route index element={<CombatSkillsIndex />} />
            <Route path=":id" element={<CombatSkillDetails />} />
            <Route path="create" element={<CreateCombatSkillForm />} />
          </Route>
          <Route
            path="skills/crafting/requirements"
            element={<CraftingSkillRequirementsLayout />}
          >
            <Route index element={<CraftingSkillRequirementsIndex />} />
            <Route path=":id" element={<CraftingSkillRequirementDetails />} />
            <Route
              path="create"
              element={<CreateCraftingSkillRequirementForm />}
            />
          </Route>
          <Route path="skills/crafting/recipes" element={<RecipesLayout />}>
            <Route index element={<RecipesIndex />} />
            <Route path=":id" element={<RecipeDetails />} />
            <Route path="create" element={<CreateRecipeForm />} />
          </Route>
          <Route path="skills/crafting" element={<CraftingSkillLayout />}>
            <Route index element={<CraftingSkillsIndex />} />
            <Route path=":id" element={<CraftingSkillDetails />} />
            <Route path="create" element={<CreateCraftingSkillForm />} />
          </Route>
          <Route path="skills" element={<SkillsLayout />}>
            <Route index element={<SkillsIndex />}></Route>
          </Route>
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
