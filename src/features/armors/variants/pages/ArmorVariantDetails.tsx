import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ArmorVariantDetailsContent from "../components/ArmorVariantDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateArmorVariantForm } from "../components/ArmorVariantForm";

export default function ArmorVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/armors/variants"
      url={`${import.meta.env.VITE_API_URL}/items/armors/variants`}
      RenderContent={ArmorVariantDetailsContent}
      UpdateForm={UpdateArmorVariantForm}
      getByIdQueryKey={queryKeys.armorVariantById}
      deleteQueryKey={queryKeys.armorVariantById}
      recordLabel="Armor Variant"
      deleteNotes=""
    />
  );
}
