import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import QuestStepDetailsContent from "../components/QuestStepDetailsContent";
import UpdateQuestStepForm from "../components/UpdateQuestStepForm";

export default function QuestStepDetails() {
  return (
    <FeatureDetails
      redirectPath="/quests/steps"
      url={`${import.meta.env.VITE_API_URL}/quests/steps`}
      renderContentFn={QuestStepDetailsContent}
      updateForm={<UpdateQuestStepForm />}
      queryKeyName="quest-steps"
      recordLabel="Quest Step"
      deleteNotes=""
    />
  );
}
