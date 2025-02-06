import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import QuestDetailsContent from "../components/QuestDetailsContent";
import UpdateQuestForm from "../components/UpdateQuestForm";

export default function QuestDetails() {
  return (
    <FeatureDetails
      redirectPath="/quests"
      url={`${import.meta.env.VITE_API_URL}/quests`}
      renderContentFn={QuestDetailsContent}
      updateForm={<UpdateQuestForm />}
      queryKeyName="quests"
      recordLabel="Quest"
      deleteNotes=""
    />
  );
}
