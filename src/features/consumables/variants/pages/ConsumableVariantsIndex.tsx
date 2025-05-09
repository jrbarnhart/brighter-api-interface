import useGetRecords from "@/queries/useGetAllRecords";
import ConsumableVariantsIndexContent from "../components/ConsumableVariantsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function ConsumableVariantsIndex() {
  const consumableVariantsUseQueryResult = useGetRecords<
    paths["/items/consumables/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >({
    queryKey: queryKeys.consumableVariants,
    url: `${import.meta.env.VITE_API_URL}/items/consumables/variants`,
  });

  return (
    <FeatureIndex<components["schemas"]["ConsumableVariantEntity"]>
      featureLabel="ConsumableVariants"
      featureHeaders={["Name", "Recipe", "Id", "Vendors", "Drop Tables"]}
      gridColsRule="grid-cols-[2fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={consumableVariantsUseQueryResult}
      renderContentFn={ConsumableVariantsIndexContent}
    />
  );
}
