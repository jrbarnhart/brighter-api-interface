import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ArmorDetailsContent from "../components/ArmorDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateArmorForm } from "../components/ArmorForm";

export default function ArmorDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/armors"
      url={`${import.meta.env.VITE_API_URL}/items/armors`}
      RenderContent={ArmorDetailsContent}
      UpdateForm={UpdateArmorForm}
      getByIdQueryKey={queryKeys.armorById}
      deleteQueryKey={queryKeys.armorById}
      recordLabel="Armor"
      deleteNotes=""
    />
  );
}
