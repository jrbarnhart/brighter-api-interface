import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import MiscItemDetailsContent from "../components/MiscItemDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateMiscItemForm } from "../components/MiscItemForm";

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
