import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RoomDetailsContent from "../components/RoomDetailsContent";
import { UpdateRoomForm } from "../components/RoomForm";
import { components } from "../../../types/api";
import queryKeys from "@/lib/queryKeys";

export default function RoomDetails() {
  return (
    <FeatureDetails<components["schemas"]["RoomEntity"]>
      redirectPath="/rooms"
      url={`${import.meta.env.VITE_API_URL}/rooms`}
      RenderContent={RoomDetailsContent}
      UpdateForm={UpdateRoomForm}
      getByIdQueryKey={queryKeys.roomById}
      deleteQueryKey={queryKeys.roomById}
      recordLabel="Room"
      deleteNotes="Rooms with contents cannot be deleted. Delete the content records first."
    />
  );
}
