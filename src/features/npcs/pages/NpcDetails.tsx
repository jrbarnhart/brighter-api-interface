import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import NpcDetailsContent from "../components/NpcDetailsContent";
import UpdateNpcForm from "../components/UpdateNpcForm";
import queryKeys from "@/lib/queryKeys";

export default function NpcDetails() {
  return (
    <FeatureDetails
      redirectPath="/npcs"
      url={`${import.meta.env.VITE_API_URL}/npcs`}
      RenderContent={NpcDetailsContent}
      UpdateForm={UpdateNpcForm}
      getByIdQueryKey={queryKeys.npcs}
      deleteQueryKey={queryKeys.npcById}
      recordLabel="Npc"
      deleteNotes=""
    />
  );
}
