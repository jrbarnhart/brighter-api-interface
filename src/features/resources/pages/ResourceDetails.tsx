import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ResourceDetailsContent from "../components/ResourceDetailsContent";
import UpdateResourceForm from "../components/UpdateResourceForm";

export default function ResourceDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/resources"
      url={`${import.meta.env.VITE_API_URL}/items/resources`}
      RenderContent={ResourceDetailsContent}
      UpdateForm={<UpdateResourceForm />}
      queryKeyName="resources"
      recordLabel="Resource"
      deleteNotes=""
    />
  );
}
