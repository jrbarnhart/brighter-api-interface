import useGetRecords from "@/queries/useGetAllRecords";
import GatheringSkillsIndexContent from "../components/GatheringSkillsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";

export default function GatheringSkillsIndex() {
  const gatheringSkillsUseQueryResult = useGetRecords<{
    data: paths["/skills/gathering"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKeyName: "gathering-skills",
    url: `${import.meta.env.VITE_API_URL}/skills/gathering`,
  });

  return (
    <FeatureIndex<components["schemas"]["GatheringSkillEntity"]>
      featureLabel="Gathering Skills"
      featureHeaders={["Name", "Region", "Id", "Resources", "Reqirements"]}
      gridColsRule="grid-cols-[1fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={gatheringSkillsUseQueryResult}
      renderContentFn={GatheringSkillsIndexContent}
    />
  );
}
