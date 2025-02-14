import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import GatheringSkillRequirementDetailsContent from "../components/GatheringSkillRequirementDetailsContent";

import queryKeys from "@/lib/queryKeys";
import { UpdateGatheringSkillRequirementForm } from "../components/GatheringSkillRequirementForm";

export default function GatheringSkillRequirementDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/gathering/requirements"
      url={`${import.meta.env.VITE_API_URL}/skills/gathering/requirements`}
      RenderContent={GatheringSkillRequirementDetailsContent}
      UpdateForm={UpdateGatheringSkillRequirementForm}
      getByIdQueryKey={queryKeys.gatheringSkillRequirementById}
      deleteQueryKey={queryKeys.gatheringSkillRequirementById}
      recordLabel="Gathering Skill Requirement"
      deleteNotes=""
    />
  );
}
