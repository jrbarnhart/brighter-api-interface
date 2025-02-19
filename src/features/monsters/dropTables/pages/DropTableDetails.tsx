import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import DropTableDetailsContent from "../components/DropTableDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateDropTableForm } from "../components/DropTableForm";

export default function DropTableDetails() {
  return (
    <FeatureDetails
      redirectPath="/monsters/drop-tables"
      url={`${import.meta.env.VITE_API_URL}/monsters/drop-tables`}
      RenderContent={DropTableDetailsContent}
      UpdateForm={UpdateDropTableForm}
      getByIdQueryKey={queryKeys.dropTableById}
      deleteQueryKey={queryKeys.dropTableById}
      recordLabel="Drop Table"
      deleteNotes=""
    />
  );
}
