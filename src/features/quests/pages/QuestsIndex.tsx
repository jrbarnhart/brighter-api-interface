import useGetRecords from "@/queries/useGetAllRecords";
import QuestsIndexContent from "../components/QuestsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function QuestsIndex() {
  const questsUseQueryResult = useGetRecords<{
    data: paths["/quests"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.quests,
    url: `${import.meta.env.VITE_API_URL}/quests`,
  });

  return (
    <FeatureIndex<components["schemas"]["QuestEntity"]>
      featureLabel="Quests"
      featureHeaders={["Name", "Id", "Steps"]}
      gridColsRule="grid-cols-[2fr_1fr_1fr]"
      featureUseQueryResult={questsUseQueryResult}
      renderContentFn={QuestsIndexContent}
    />
  );
}
