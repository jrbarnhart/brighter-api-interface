import { components, paths } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import useGetRecords from "../../../queries/useGetAllRecords";
import RegionsIndexContent from "../components/RegionsIndexContent";
import queryKeys from "@/lib/queryKeys";
export default function RegionsIndex() {
  const regionsUseQueryResult = useGetRecords<{
    data: paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.regions,
    url: `${import.meta.env.VITE_API_URL}/regions`,
  });
  return (
    <FeatureIndex<components["schemas"]["RegionEntity"]>
      featureLabel="Regions"
      featureHeaders={["Name", "Id", "Skills", "Rooms"]}
      gridColsRule="grid-cols-[2fr_1fr_2fr_1fr]"
      featureUseQueryResult={regionsUseQueryResult}
      renderContentFn={RegionsIndexContent}
    />
  );
}
