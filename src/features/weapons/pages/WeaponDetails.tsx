import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import WeaponDetailsContent from "../components/WeaponDetailsContent";
import UpdateWeaponForm from "../components/UpdateWeaponForm";

export default function WeaponDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/weapons"
      url={`${import.meta.env.VITE_API_URL}/items/weapons`}
      RenderContent={WeaponDetailsContent}
      UpdateForm={<UpdateWeaponForm />}
      queryKeyName="weapons"
      recordLabel="Weapon"
      deleteNotes=""
    />
  );
}
