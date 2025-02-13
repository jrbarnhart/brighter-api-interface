import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import MiscItemDetailsContent from "../components/MiscItemDetailsContent";
import UpdateMiscItemForm from "../components/UpdateMiscItemForm";
import queryKeys from "@/lib/queryKeys";

export default function MiscItemDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/misc"
      url={`${import.meta.env.VITE_API_URL}/items/misc`}
      RenderContent={MiscItemDetailsContent}
      UpdateForm={UpdateMiscItemForm}
      getByIdQueryKey={queryKeys.miscItemById}
      deleteQueryKey={queryKeys.miscItemById}
      recordLabel="Misc Item"
      deleteNotes=""
    />
  );
}
