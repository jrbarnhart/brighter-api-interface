import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ResourceVariantDetailsContent from "../components/ResourceVariantDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateResourceVariantForm } from "../components/ResourceVariantForm";

export default function ResourceVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/resources/variants"
      url={`${import.meta.env.VITE_API_URL}/items/resources/variants`}
      RenderContent={ResourceVariantDetailsContent}
      UpdateForm={UpdateResourceVariantForm}
      getByIdQueryKey={queryKeys.resourceVariantById}
      deleteQueryKey={queryKeys.resourceVariantById}
      recordLabel="Resource Variant"
      deleteNotes=""
    />
  );
}
