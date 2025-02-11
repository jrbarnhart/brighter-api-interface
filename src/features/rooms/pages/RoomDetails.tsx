import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RoomDetailsContent from "../components/RoomDetailsContent";
import { UpdateRoomForm } from "../components/RoomForms";

export default function RoomDetails() {
  return (
    <FeatureDetails
      redirectPath="/rooms"
      url={`${import.meta.env.VITE_API_URL}/rooms`}
      renderContentFn={RoomDetailsContent}
      updateForm={<UpdateRoomForm />}
      queryKeyName="rooms"
      recordLabel="Room"
      deleteNotes="Rooms with contents cannot be deleted. Delete the content records first."
    />
  );
}
