import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ResourceDetailsContent from "../components/ResourceDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateResourceForm } from "../components/ResourceForm";

export default function ResourceDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/resources"
      url={`${import.meta.env.VITE_API_URL}/items/resources`}
      RenderContent={ResourceDetailsContent}
      UpdateForm={UpdateResourceForm}
      getByIdQueryKey={queryKeys.resourceById}
      deleteQueryKey={queryKeys.resourceById}
      recordLabel="Resource"
      deleteNotes=""
    />
  );
}
