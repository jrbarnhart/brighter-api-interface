import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ConsumableVariantDetailsContent from "../components/ConsumableVariantDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateConsumableVariantForm } from "../components/ConsumableVariantForm";

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
