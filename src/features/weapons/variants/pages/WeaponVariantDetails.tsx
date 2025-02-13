import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import WeaponVariantDetailsContent from "../components/WeaponVariantDetailsContent";
import UpdateWeaponVariantForm from "../components/UpdateWeaponVariantForm";
import queryKeys from "@/lib/queryKeys";

export default function WeaponVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/weapons/variants"
      url={`${import.meta.env.VITE_API_URL}/items/weapons/variants`}
      RenderContent={WeaponVariantDetailsContent}
      UpdateForm={UpdateWeaponVariantForm}
      getByIdQueryKey={queryKeys.weaponVariants}
      deleteQueryKey={queryKeys.weaponVariantById}
      recordLabel="Weapon Variant"
      deleteNotes=""
    />
  );
}
