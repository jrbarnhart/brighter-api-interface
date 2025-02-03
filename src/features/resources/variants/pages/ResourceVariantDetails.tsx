import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ResourceVariantDetailsContent from "../components/ResourceVariantDetailsContent";
import UpdateResourceVariantForm from "../components/UpdateResourceVariantForm";

export default function ResourceVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/resources/variants"
      url={`${import.meta.env.VITE_API_URL}/items/resources/variants`}
      renderContentFn={ResourceVariantDetailsContent}
      updateForm={<UpdateResourceVariantForm />}
      queryKeyName="resource-variants"
      recordLabel="Resource Variant"
      deleteNotes=""
    />
  );
}
