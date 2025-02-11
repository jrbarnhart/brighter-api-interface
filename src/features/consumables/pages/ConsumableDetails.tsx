import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ConsumableDetailsContent from "../components/ConsumableDetailsContent";
import UpdateConsumableForm from "../components/UpdateConsumableForm";

export default function ConsumableDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/consumables"
      url={`${import.meta.env.VITE_API_URL}/items/consumables`}
      RenderContent={ConsumableDetailsContent}
      UpdateForm={<UpdateConsumableForm />}
      queryKeyName="consumables"
      recordLabel="Consumable"
      deleteNotes=""
    />
  );
}
