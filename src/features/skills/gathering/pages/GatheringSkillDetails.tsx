import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import GatheringSkillDetailsContent from "../components/GatheringSkillDetailsContent";
import UpdateGatheringSkillForm from "../components/UpdateGatheringSkillForm";
import queryKeys from "@/lib/queryKeys";

export default function GatheringSkillDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/gathering"
      url={`${import.meta.env.VITE_API_URL}/skills/gathering`}
      RenderContent={GatheringSkillDetailsContent}
      UpdateForm={UpdateGatheringSkillForm}
      getByIdQueryKey={queryKeys.gatheringSkillById}
      deleteQueryKey={queryKeys.gatheringSkillById}
      recordLabel="Gathering Skill"
      deleteNotes="Gathering skills with monsters or requirements cannot be deleted. Delete monsters and requirements first."
    />
  );
}
