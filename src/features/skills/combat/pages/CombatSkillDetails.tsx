import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import CombatSkillDetailsContent from "../components/CombatSkillDetailsContent";
import UpdateCombatSkillForm from "../components/UpdateCombatSkillForm";

export default function CombatSkillDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/combat"
      url={`${import.meta.env.VITE_API_URL}/skills/combat`}
      RenderContent={CombatSkillDetailsContent}
      UpdateForm={<UpdateCombatSkillForm />}
      queryKeyName="combat-skills"
      recordLabel="Combat Skill"
      deleteNotes="Combat skills with monsters or requirements cannot be deleted. Delete monsters and requirements first."
    />
  );
}
