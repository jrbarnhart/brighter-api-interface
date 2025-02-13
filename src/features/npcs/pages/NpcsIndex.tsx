import useGetRecords from "@/queries/useGetAllRecords";
import NpcsIndexContent from "../components/NpcsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function NpcsIndex() {
  const npcsUseQueryResult = useGetRecords<{
    data: paths["/npcs"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.npcs,
    url: `${import.meta.env.VITE_API_URL}/npcs`,
  });

  return (
    <FeatureIndex<components["schemas"]["NpcEntity"]>
      featureLabel="Npcs"
      featureHeaders={["Name", "Id", "Vendor", "Quest Steps", "Rooms"]}
      gridColsRule="grid-cols-[2fr_1fr_2fr_2fr_2fr]"
      featureUseQueryResult={npcsUseQueryResult}
      renderContentFn={NpcsIndexContent}
    />
  );
}
