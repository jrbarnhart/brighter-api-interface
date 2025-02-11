import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import GatheringSkillRequirementDetailsContent from "../components/GatheringSkillRequirementDetailsContent";
import UpdateGatheringSkillRequirementForm from "../components/UpdateGatheringSkillRequirementForm";

export default function GatheringSkillRequirementDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/gathering/requirements"
      url={`${import.meta.env.VITE_API_URL}/skills/gathering/requirements`}
      RenderContent={GatheringSkillRequirementDetailsContent}
      UpdateForm={<UpdateGatheringSkillRequirementForm />}
      queryKeyName="gathering-skill-requirements"
      recordLabel="Gathering Skill Requirement"
      deleteNotes=""
    />
  );
}
