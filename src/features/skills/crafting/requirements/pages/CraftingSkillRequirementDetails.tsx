import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import CraftingSkillRequirementDetailsContent from "../components/CraftingSkillRequirementDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateCraftingSkillRequirementForm } from "../components/CraftingSkillRequirementForm";

export default function CraftingSkillRequirementDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/crafting/requirements"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting/requirements`}
      RenderContent={CraftingSkillRequirementDetailsContent}
      UpdateForm={UpdateCraftingSkillRequirementForm}
      getByIdQueryKey={queryKeys.craftingSkillRequirementById}
      deleteQueryKey={queryKeys.craftingSkillRequirementById}
      recordLabel="Crafting Skill Requirement"
      deleteNotes=""
    />
  );
}
