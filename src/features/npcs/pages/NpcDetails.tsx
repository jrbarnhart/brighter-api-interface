import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import NpcDetailsContent from "../components/NpcDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateNpcForm } from "../components/NpcForm";

export default function NpcDetails() {
  return (
    <FeatureDetails
      redirectPath="/npcs"
      url={`${import.meta.env.VITE_API_URL}/npcs`}
      RenderContent={NpcDetailsContent}
      UpdateForm={UpdateNpcForm}
      getByIdQueryKey={queryKeys.npcById}
      deleteQueryKey={queryKeys.npcById}
      recordLabel="Npc"
      deleteNotes=""
    />
  );
}
