import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RoomDetailsContent from "../components/RoomDetailsContent";
import UpdateRoomForm from "../components/UpdateRoomForm";

export default function RoomDetails() {
  return (
    <FeatureDetails
      redirectPath="/rooms"
      url={`${import.meta.env.VITE_API_URL}/rooms`}
      renderContentFn={RoomDetailsContent}
      updateForm={<UpdateRoomForm />}
      recordName="rooms"
      recordLabel="Room"
      deleteNotes="Rooms with contents cannot be deleted. Delete the content records first."
    />
  );
}
