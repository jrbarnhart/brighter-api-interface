import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import MiscItemDetailsContent from "../components/MiscItemDetailsContent";
import UpdateMiscItemForm from "../components/UpdateMiscItemForm";

export default function MiscItemDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/misc"
      url={`${import.meta.env.VITE_API_URL}/items/misc`}
      renderContentFn={MiscItemDetailsContent}
      updateForm={<UpdateMiscItemForm />}
      queryKeyName="misc-items"
      recordLabel="Misc Item"
      deleteNotes=""
    />
  );
}
