import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import QuestDetailsContent from "../components/QuestDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateQuestForm } from "../components/QuestForm";

export default function QuestDetails() {
  return (
    <FeatureDetails
      redirectPath="/quests"
      url={`${import.meta.env.VITE_API_URL}/quests`}
      RenderContent={QuestDetailsContent}
      UpdateForm={UpdateQuestForm}
      getByIdQueryKey={queryKeys.questById}
      deleteQueryKey={queryKeys.questById}
      recordLabel="Quest"
      deleteNotes=""
    />
  );
}
