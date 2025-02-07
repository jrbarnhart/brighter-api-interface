import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import NpcDetailsContent from "../components/NpcDetailsContent";
import UpdateNpcForm from "../components/UpdateNpcForm";

export default function NpcDetails() {
  return (
    <FeatureDetails
      redirectPath="/npcs"
      url={`${import.meta.env.VITE_API_URL}/npcs`}
      renderContentFn={NpcDetailsContent}
      updateForm={<UpdateNpcForm />}
      queryKeyName="npcs"
      recordLabel="Npc"
      deleteNotes=""
    />
  );
}
