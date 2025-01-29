import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RoomDetailsContents from "./RoomDetailsContents";
import UpdateRoomForm from "./UpdateRoomForm";

export default function Room() {
  return (
    <FeatureDetails
      basePath="/rooms"
      renderContentFn={RoomDetailsContents}
      updateForm={<UpdateRoomForm />}
      recordName="Room"
      deleteNotes="Rooms with contents cannot be deleted. Delete the content records first."
    />
  );
}
