import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RoomDetailsContents from "../components/RoomDetailsContents";
import UpdateRoomForm from "../components/UpdateRoomForm";

export default function RoomDetails() {
  return (
    <FeatureDetails
      basePath="/rooms"
      renderContentFn={RoomDetailsContents}
      updateForm={<UpdateRoomForm />}
      recordName="rooms"
      recordLabel="Room"
      deleteNotes="Rooms with contents cannot be deleted. Delete the content records first."
    />
  );
}
