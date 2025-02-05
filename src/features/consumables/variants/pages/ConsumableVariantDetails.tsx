import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ConsumableVariantDetailsContent from "../components/ConsumableVariantDetailsContent";
import UpdateConsumableVariantForm from "../components/UpdateConsumableVariantForm";

export default function ConsumableVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/consumables/variants"
      url={`${import.meta.env.VITE_API_URL}/items/consumables/variants`}
      renderContentFn={ConsumableVariantDetailsContent}
      updateForm={<UpdateConsumableVariantForm />}
      queryKeyName="consumable-variants"
      recordLabel="Consumable Variant"
      deleteNotes=""
    />
  );
}
