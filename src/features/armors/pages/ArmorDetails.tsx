import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ArmorDetailsContent from "../components/ArmorDetailsContent";
import UpdateArmorForm from "../components/UpdateArmorForm";

export default function ArmorDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/armors"
      url={`${import.meta.env.VITE_API_URL}/items/armors`}
      renderContentFn={ArmorDetailsContent}
      updateForm={<UpdateArmorForm />}
      queryKeyName="armors"
      recordLabel="Armor"
      deleteNotes=""
    />
  );
}
