import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ConsumableVariantDetailsContent from "../components/ConsumableVariantDetailsContent";
import UpdateConsumableVariantForm from "../components/UpdateConsumableVariantForm";
import queryKeys from "@/lib/queryKeys";

export default function ConsumableVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/consumables/variants"
      url={`${import.meta.env.VITE_API_URL}/items/consumables/variants`}
      RenderContent={ConsumableVariantDetailsContent}
      UpdateForm={UpdateConsumableVariantForm}
      getByIdQueryKey={queryKeys.consumableVariantById}
      deleteQueryKey={queryKeys.consumableVariantById}
      recordLabel="Consumable Variant"
      deleteNotes=""
    />
  );
}
