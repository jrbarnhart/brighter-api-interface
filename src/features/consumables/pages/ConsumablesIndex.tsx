import useGetRecords from "@/queries/useGetAllRecords";
import ConsumablesIndexContent from "../components/ConsumablesIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";

export default function ConsumablesIndex() {
  const consumablesUseQueryResult = useGetRecords<{
    data: paths["/items/consumables"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKeyName: "consumables",
    url: `${import.meta.env.VITE_API_URL}/items/consumables`,
  });

  return (
    <FeatureIndex<components["schemas"]["ConsumableEntity"]>
      featureLabel="Consumables"
      featureHeaders={["Name", "Id", "Variants"]}
      gridColsRule="grid-cols-[2fr_1fr_1fr]"
      featureUseQueryResult={consumablesUseQueryResult}
      renderContentFn={ConsumablesIndexContent}
    />
  );
}
