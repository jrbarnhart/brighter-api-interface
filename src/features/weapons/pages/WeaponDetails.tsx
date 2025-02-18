import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import WeaponDetailsContent from "../components/WeaponDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateWeaponForm } from "../components/WeaponForm";

export default function WeaponDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/weapons"
      url={`${import.meta.env.VITE_API_URL}/items/weapons`}
      RenderContent={WeaponDetailsContent}
      UpdateForm={UpdateWeaponForm}
      getByIdQueryKey={queryKeys.weaponById}
      deleteQueryKey={queryKeys.weaponById}
      recordLabel="Weapon"
      deleteNotes=""
    />
  );
}
