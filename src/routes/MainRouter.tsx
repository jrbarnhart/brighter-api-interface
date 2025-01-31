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
import GatheringSkillRequirementsLayout from "@/features/skills/gathering/requirements/layouts/GatheringSkillRequirementsLayout";
import GatheringSkillRequirementsIndex from "@/features/skills/gathering/requirements/pages/GatheringSkillRequirementsIndex";
import GatheringSkillRequirementDetails from "@/features/skills/gathering/requirements/pages/GatheringSkillRequirementDetails";
import CreateGatheringSkillRequirementForm from "@/features/skills/gathering/requirements/components/CreateGatheringSkillRequirementForm";
import GatheringSkillLayout from "@/features/skills/gathering/layouts/GatheringSkillLayout";
import GatheringSkillsIndex from "@/features/skills/gathering/pages/GatheringSkillsIndex";
import GatheringSkillDetails from "@/features/skills/gathering/pages/GatheringSkillDetails";
import CreateGatheringSkillForm from "@/features/skills/gathering/components/CreateGatheringSkillForm";
import ResourceVariantsLayout from "@/features/resources/variants/layouts/ResourceVariantsLayout";
import ResourceVariantsIndex from "@/features/resources/variants/pages/ResourceVariantsIndex";
import ResourceVariantDetails from "@/features/resources/variants/pages/ResourceVariantDetails";
import CreateResourceVariantForm from "@/features/resources/variants/components/CreateResourceVariantForm";
import ResourcesLayout from "@/features/resources/layouts/ResourcesLayout";
import ResourcesIndex from "@/features/resources/pages/ResourcesIndex";
import ResourceDetails from "@/features/resources/pages/ResourceDetails";
import CreateResourceForm from "@/features/resources/components/CreateResourceForm";
import ItemsLayout from "@/features/items/layouts/ItemsLayout";
import ItemsIndex from "@/features/items/pages/ItemsIndex";
import ConsumableVariantsLayout from "@/features/consumables/variants/layouts/ConsumableVariantsLayout";
import ConsumableVariantsIndex from "@/features/consumables/variants/pages/ConsumableVariantsIndex";
import ConsumableVariantDetails from "@/features/consumables/variants/pages/ConsumableVariantDetails";
import CreateConsumableVariantForm from "@/features/consumables/variants/components/CreateConsumableVariantForm";
import ConsumablesLayout from "@/features/consumables/layouts/ConsumablesLayout";
import ConsumablesIndex from "@/features/consumables/pages/ConsumablesIndex";
import ConsumableDetails from "@/features/consumables/pages/ConsumableDetails";
import CreateConsumableForm from "@/features/consumables/components/CreateConsumableForm";
import WeaponVariantsLayout from "@/features/weapons/variants/layouts/WeaponVariantsLayout";
import WeaponVariantsIndex from "@/features/weapons/variants/pages/WeaponVariantsIndex";
import WeaponVariantDetails from "@/features/weapons/variants/pages/WeaponVariantDetails";
import CreateWeaponVariantForm from "@/features/weapons/variants/components/CreateWeaponVariantForm";
import WeaponsLayout from "@/features/weapons/layouts/WeaponsLayout";
import WeaponsIndex from "@/features/weapons/pages/WeaponsIndex";
import WeaponDetails from "@/features/weapons/pages/WeaponDetails";
import CreateWeaponForm from "@/features/weapons/components/CreateWeaponForm";
import ArmorVariantsLayout from "@/features/armors/variants/layouts/ArmorVariantsLayout";
import ArmorVariantsIndex from "@/features/armors/variants/pages/ArmorVariantsIndex";
import ArmorVariantDetails from "@/features/armors/variants/pages/ArmorVariantDetails";
import CreateArmorVariantForm from "@/features/armors/variants/components/CreateArmorVariantForm";
import ArmorsLayout from "@/features/armors/layouts/ArmorsLayout";
import ArmorsIndex from "@/features/armors/pages/ArmorsIndex";
import ArmorDetails from "@/features/armors/pages/ArmorDetails";
import CreateArmorForm from "@/features/armors/components/CreateArmorForm";

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
            path="skills/gathering/requirements"
            element={<GatheringSkillRequirementsLayout />}
          >
            <Route index element={<GatheringSkillRequirementsIndex />} />
            <Route path=":id" element={<GatheringSkillRequirementDetails />} />
            <Route
              path="create"
              element={<CreateGatheringSkillRequirementForm />}
            />
          </Route>
          <Route path="skills/gathering" element={<GatheringSkillLayout />}>
            <Route index element={<GatheringSkillsIndex />} />
            <Route path=":id" element={<GatheringSkillDetails />} />
            <Route path="create" element={<CreateGatheringSkillForm />} />
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
          {/* Items */}
          <Route path="items" element={<ItemsLayout />}>
            <Route index element={<ItemsIndex />} />
          </Route>
          {/* Resources */}
          <Route
            path="items/resources/variants"
            element={<ResourceVariantsLayout />}
          >
            <Route index element={<ResourceVariantsIndex />} />
            <Route path=":id" element={<ResourceVariantDetails />} />
            <Route path="create" element={<CreateResourceVariantForm />} />
          </Route>
          <Route path="items/resources" element={<ResourcesLayout />}>
            <Route index element={<ResourcesIndex />} />
            <Route path=":id" element={<ResourceDetails />} />
            <Route path="create" element={<CreateResourceForm />} />
          </Route>
          {/* Consumables */}
          <Route
            path="items/consumables/variants"
            element={<ConsumableVariantsLayout />}
          >
            <Route index element={<ConsumableVariantsIndex />} />
            <Route path=":id" element={<ConsumableVariantDetails />} />
            <Route path="create" element={<CreateConsumableVariantForm />} />
          </Route>
          <Route path="items/consumables" element={<ConsumablesLayout />}>
            <Route index element={<ConsumablesIndex />} />
            <Route path=":id" element={<ConsumableDetails />} />
            <Route path="create" element={<CreateConsumableForm />} />
          </Route>
          {/* Weapons */}
          <Route
            path="items/weapons/variants"
            element={<WeaponVariantsLayout />}
          >
            <Route index element={<WeaponVariantsIndex />} />
            <Route path=":id" element={<WeaponVariantDetails />} />
            <Route path="create" element={<CreateWeaponVariantForm />} />
          </Route>
          <Route path="items/weapons" element={<WeaponsLayout />}>
            <Route index element={<WeaponsIndex />} />
            <Route path=":id" element={<WeaponDetails />} />
            <Route path="create" element={<CreateWeaponForm />} />
          </Route>
          {/* Armors */}
          <Route path="items/armors/variants" element={<ArmorVariantsLayout />}>
            <Route index element={<ArmorVariantsIndex />} />
            <Route path=":id" element={<ArmorVariantDetails />} />
            <Route path="create" element={<CreateArmorVariantForm />} />
          </Route>
          <Route path="items/armors" element={<ArmorsLayout />}>
            <Route index element={<ArmorsIndex />} />
            <Route path=":id" element={<ArmorDetails />} />
            <Route path="create" element={<CreateArmorForm />} />
          </Route>
          {/* Monsters */}
          {/* Npcs */}
          {/* Quests */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
