import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import WeaponVariantDetailsContent from "../components/WeaponVariantDetailsContent";
import UpdateWeaponVariantForm from "../components/UpdateWeaponVariantForm";

export default function WeaponVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/weapons/variants"
      url={`${import.meta.env.VITE_API_URL}/items/weapons/variants`}
      renderContentFn={WeaponVariantDetailsContent}
      updateForm={<UpdateWeaponVariantForm />}
      queryKeyName="weapon-variants"
      recordLabel="Weapon Variant"
      deleteNotes=""
    />
  );
}
