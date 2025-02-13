import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ArmorDetailsContent from "../components/ArmorDetailsContent";
import UpdateArmorForm from "../components/UpdateArmorForm";
import queryKeys from "@/lib/queryKeys";

export default function ArmorDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/armors"
      url={`${import.meta.env.VITE_API_URL}/items/armors`}
      RenderContent={ArmorDetailsContent}
      UpdateForm={UpdateArmorForm}
      getByIdQueryKey={queryKeys.armors}
      deleteQueryKey={queryKeys.armorById}
      recordLabel="Armor"
      deleteNotes=""
    />
  );
}
