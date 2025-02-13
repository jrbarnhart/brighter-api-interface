import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ArmorVariantDetailsContent from "../components/ArmorVariantDetailsContent";
import UpdateArmorVariantForm from "../components/UpdateArmorVariantForm";
import queryKeys from "@/lib/queryKeys";

export default function ArmorVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/armors/variants"
      url={`${import.meta.env.VITE_API_URL}/items/armors/variants`}
      RenderContent={ArmorVariantDetailsContent}
      UpdateForm={UpdateArmorVariantForm}
      getByIdQueryKey={queryKeys.armorVariants}
      deleteQueryKey={queryKeys.armorVariantById}
      recordLabel="Armor Variant"
      deleteNotes=""
    />
  );
}
