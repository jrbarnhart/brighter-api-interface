import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import useGetRecords from "@/queries/useGetAllRecords";

import { paths } from "@/types/api";
import { ComponentState } from "react";
import CraftingSkillRequirementsIndexContent from "../components/CraftingSkillRequirementsIndexContent";
import queryKeys from "@/lib/queryKeys";
export default function CraftingSkillRequirementsIndex() {
  const craftingSkillsUseQueryResult = useGetRecords<{
    data: paths["/skills/crafting/requirements"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.craftingSkillRequirements,
    url: `${import.meta.env.VITE_API_URL}/skills/crafting/requirements`,
  });

  return (
    <FeatureIndex<ComponentState["schemas"]["CraftingSkillRequirementEntity"]>
      featureLabel="Crafting Skill Requirements"
      featureHeaders={["Id", "Unlock Lvl", "Description", "Recipe"]}
      gridColsRule="grid-cols-[1fr_1fr_4fr_2fr]"
      featureUseQueryResult={craftingSkillsUseQueryResult}
      renderContentFn={CraftingSkillRequirementsIndexContent}
    />
  );
}
