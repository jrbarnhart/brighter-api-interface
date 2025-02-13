import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import ConsumableDetailsContent from "../components/ConsumableDetailsContent";
import UpdateConsumableForm from "../components/UpdateConsumableForm";
import queryKeys from "@/lib/queryKeys";

export default function ConsumableDetails() {
  return (
    <FeatureDetails
      redirectPath="/items/consumables"
      url={`${import.meta.env.VITE_API_URL}/items/consumables`}
      RenderContent={ConsumableDetailsContent}
      UpdateForm={UpdateConsumableForm}
      getByIdQueryKey={queryKeys.consumableById}
      deleteQueryKey={queryKeys.consumableById}
      recordLabel="Consumable"
      deleteNotes=""
    />
  );
}
