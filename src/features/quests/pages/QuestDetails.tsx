import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import QuestDetailsContent from "../components/QuestDetailsContent";
import UpdateQuestForm from "../components/UpdateQuestForm";
import queryKeys from "@/lib/queryKeys";

export default function QuestDetails() {
  return (
    <FeatureDetails
      redirectPath="/quests"
      url={`${import.meta.env.VITE_API_URL}/quests`}
      RenderContent={QuestDetailsContent}
      UpdateForm={UpdateQuestForm}
      getByIdQueryKey={queryKeys.quests}
      deleteQueryKey={queryKeys.questById}
      recordLabel="Quest"
      deleteNotes=""
    />
  );
}
