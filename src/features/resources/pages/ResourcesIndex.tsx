import useGetRecords from "@/queries/useGetAllRecords";
import ResourcesIndexContent from "../components/ResourcesIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function ResourcesIndex() {
  const resourcesUseQueryResult = useGetRecords<{
    data: paths["/items/resources"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.resources,
    url: `${import.meta.env.VITE_API_URL}/items/resources`,
  });

  return (
    <FeatureIndex<components["schemas"]["ResourceEntity"]>
      featureLabel="Resources"
      featureHeaders={["Name", "Id", "Passive", "In Rooms", "Variants"]}
      gridColsRule="grid-cols-[2fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={resourcesUseQueryResult}
      renderContentFn={ResourcesIndexContent}
    />
  );
}
