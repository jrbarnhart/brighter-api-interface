import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import CombatSkillRequirementDetailsContent from "../components/CombatSkillRequirementDetailsContent";
import UpdateCombatSkillRequirementForm from "../components/UpdateCombatSkillRequirementForm";
import queryKeys from "@/lib/queryKeys";

export default function CombatSkillRequirementDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/combat/requirements"
      url={`${import.meta.env.VITE_API_URL}/skills/combat/requirements`}
      RenderContent={CombatSkillRequirementDetailsContent}
      UpdateForm={UpdateCombatSkillRequirementForm}
      getByIdQueryKey={queryKeys.combatSkillById}
      deleteQueryKey={queryKeys.combatSkillById}
      recordLabel="Combat Skill Requirement"
      deleteNotes=""
    />
  );
}
