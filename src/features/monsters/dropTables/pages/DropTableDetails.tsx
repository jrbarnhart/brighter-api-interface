import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import DropTableDetailsContent from "../components/DropTableDetailsContent";
import UpdateDropTableForm from "../components/UpdateDropTableForm";

export default function DropTableDetails() {
  return (
    <FeatureDetails
      redirectPath="/monsters/drop-tables"
      url={`${import.meta.env.VITE_API_URL}/monsters/drop-tables`}
      RenderContent={DropTableDetailsContent}
      UpdateForm={<UpdateDropTableForm />}
      queryKeyName="drop-tables"
      recordLabel="Drop Table"
      deleteNotes=""
    />
  );
}
