import useGetRecords from "@/queries/useGetAllRecords";
import QuestStepsIndexContent from "../components/QuestStepsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function QuestStepsIndex() {
  const questStepsUseQueryResult = useGetRecords<{
    data: paths["/quests/steps"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.questSteps,
    url: `${import.meta.env.VITE_API_URL}/quests/steps`,
  });

  return (
    <FeatureIndex<components["schemas"]["QuestStepEntity"]>
      featureLabel="QuestSteps"
      featureHeaders={["Step #", "Id", "Description", "Room", "Npc"]}
      gridColsRule="grid-cols-[1fr_1fr_2fr_1fr_1fr]"
      featureUseQueryResult={questStepsUseQueryResult}
      renderContentFn={QuestStepsIndexContent}
    />
  );
}
