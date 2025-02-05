import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ArmorVariantDetailsContent from "../components/ArmorVariantDetailsContent";
import UpdateArmorVariantForm from "../components/UpdateArmorVariantForm";

export default function ArmorVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/armors/variants"
      url={`${import.meta.env.VITE_API_URL}/items/armors/variants`}
      renderContentFn={ArmorVariantDetailsContent}
      updateForm={<UpdateArmorVariantForm />}
      queryKeyName="armor-variants"
      recordLabel="Armor Variant"
      deleteNotes=""
    />
  );
}
