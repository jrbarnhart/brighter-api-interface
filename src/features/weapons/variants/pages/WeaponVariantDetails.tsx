import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import WeaponVariantDetailsContent from "../components/WeaponVariantDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateWeaponVariantForm } from "../components/WeaponVariantForm";

export default function WeaponVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/weapons/variants"
      url={`${import.meta.env.VITE_API_URL}/items/weapons/variants`}
      RenderContent={WeaponVariantDetailsContent}
      UpdateForm={UpdateWeaponVariantForm}
      getByIdQueryKey={queryKeys.weaponVariantById}
      deleteQueryKey={queryKeys.weaponVariantById}
      recordLabel="Weapon Variant"
      deleteNotes=""
    />
  );
}
