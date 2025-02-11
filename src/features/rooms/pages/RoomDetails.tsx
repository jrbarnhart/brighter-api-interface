import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RoomDetailsContent from "../components/RoomDetailsContent";
import { UpdateRoomForm } from "../components/RoomForms";
import { components } from "../../../types/api";

export default function RoomDetails() {
  return (
    <FeatureDetails<components["schemas"]["RoomEntity"]>
      redirectPath="/rooms"
      url={`${import.meta.env.VITE_API_URL}/rooms`}
      RenderContent={RoomDetailsContent}
      UpdateForm={UpdateRoomForm}
      queryKeyName="rooms"
      recordLabel="Room"
      deleteNotes="Rooms with contents cannot be deleted. Delete the content records first."
    />
  );
}
