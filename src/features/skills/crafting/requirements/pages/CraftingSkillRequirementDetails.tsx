import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import CraftingSkillRequirementDetailsContent from "../components/CraftingSkillRequirementDetailsContent";
import UpdateCraftingSkillRequirementForm from "../components/UpdateCraftingSkillRequirementForm";

export default function CraftingSkillRequirementDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/crafting/requirements"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting/requirements`}
      RenderContent={CraftingSkillRequirementDetailsContent}
      UpdateForm={<UpdateCraftingSkillRequirementForm />}
      queryKeyName="crafting-skill-requirements"
      recordLabel="Crafting Skill Requirement"
      deleteNotes=""
    />
  );
}
