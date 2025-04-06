import useGetRecords from "@/queries/useGetAllRecords";
import MiscItemsIndexContent from "../components/MiscItemsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function MiscItemsIndex() {
  const miscItemsUseQueryResult = useGetRecords<
    paths["/items/misc"]["get"]["responses"]["200"]["content"]["application/json"]
  >({
    queryKey: queryKeys.miscItems,
    url: `${import.meta.env.VITE_API_URL}/items/misc`,
  });

  return (
    <FeatureIndex<components["schemas"]["MiscItemEntity"]>
      featureLabel="MiscItems"
      featureHeaders={["Name", "Id", "In Recipes", "Vendors", "Drop Tables"]}
      gridColsRule="grid-cols-[2fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={miscItemsUseQueryResult}
      renderContentFn={MiscItemsIndexContent}
    />
  );
}
