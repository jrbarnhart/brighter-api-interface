import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import QuestStepDetailsContent from "../components/QuestStepDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateQuestStepForm } from "../components/QuestStepForm";

export default function QuestStepDetails() {
  return (
    <FeatureDetails
      redirectPath="/quests/steps"
      url={`${import.meta.env.VITE_API_URL}/quests/steps`}
      RenderContent={QuestStepDetailsContent}
      UpdateForm={UpdateQuestStepForm}
      getByIdQueryKey={queryKeys.questStepById}
      deleteQueryKey={queryKeys.questStepById}
      recordLabel="Quest Step"
      deleteNotes=""
    />
  );
}
