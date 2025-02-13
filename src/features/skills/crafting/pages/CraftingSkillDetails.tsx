import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import CraftingSkillDetailsContent from "../components/CraftingSkillDetailsContent";
import UpdateCraftingSkillForm from "../components/UpdateCraftingSkillForm";
import queryKeys from "@/lib/queryKeys";

export default function CraftingSkillDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/crafting"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting`}
      RenderContent={CraftingSkillDetailsContent}
      UpdateForm={UpdateCraftingSkillForm}
      getByIdQueryKey={queryKeys.craftingSkillById}
      deleteQueryKey={queryKeys.craftingSkillById}
      recordLabel="Crafting Skill"
      deleteNotes="Crafting skills with monsters or requirements cannot be deleted. Delete monsters and requirements first."
    />
  );
}
