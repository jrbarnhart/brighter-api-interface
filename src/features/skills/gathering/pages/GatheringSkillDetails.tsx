import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import GatheringSkillDetailsContent from "../components/GatheringSkillDetailsContent";
import UpdateGatheringSkillForm from "../components/UpdateGatheringSkillForm";

export default function GatheringSkillDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/gathering"
      url={`${import.meta.env.VITE_API_URL}/skills/gathering`}
      renderContentFn={GatheringSkillDetailsContent}
      updateForm={<UpdateGatheringSkillForm />}
      queryKeyName="gathering-skills"
      recordLabel="Gathering Skill"
      deleteNotes="Gathering skills with monsters or requirements cannot be deleted. Delete monsters and requirements first."
    />
  );
}
