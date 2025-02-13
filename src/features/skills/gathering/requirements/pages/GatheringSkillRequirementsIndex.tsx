import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import useGetRecords from "@/queries/useGetAllRecords";
import { paths } from "@/types/api";
import { ComponentState } from "react";
import GatheringSkillRequirementsIndexContent from "../components/GatheringSkillRequirementsIndexContent";
import queryKeys from "@/lib/queryKeys";
export default function GatheringSkillRequirementsIndex() {
  const gatheringSkillsUseQueryResult = useGetRecords<{
    data: paths["/skills/gathering/requirements"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.gatheringSkillRequirements,
    url: `${import.meta.env.VITE_API_URL}/skills/gathering/requirements`,
  });

  return (
    <FeatureIndex<ComponentState["schemas"]["GatheringSkillRequirementEntity"]>
      featureLabel="Gathering Skill Requirements"
      featureHeaders={["Id", "Unlock Lvl", "Description", "Resource Variant"]}
      gridColsRule="grid-cols-[1fr_1fr_4fr_2fr]"
      featureUseQueryResult={gatheringSkillsUseQueryResult}
      renderContentFn={GatheringSkillRequirementsIndexContent}
    />
  );
}
