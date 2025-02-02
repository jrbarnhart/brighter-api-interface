import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import CombatSkillRequirementDetailsContent from "../components/CombatSkillRequirementDetailsContent";
import UpdateCombatSkillRequirementForm from "../components/UpdateCombatSkillRequirementForm";

export default function CombatSkillRequirementDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/combat/requirements"
      url={`${import.meta.env.VITE_API_URL}/skills/combat/requirements`}
      renderContentFn={CombatSkillRequirementDetailsContent}
      updateForm={<UpdateCombatSkillRequirementForm />}
      queryKeyName="combat-skill-requirements"
      recordLabel="Combat Skill Requirement"
      deleteNotes=""
    />
  );
}
