import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import useGetRecords from "@/queries/useGetAllRecords";

import { paths } from "@/types/api";
import { ComponentState } from "react";
import CombatSkillRequirementsIndexContent from "../components/CombatSkillRequirementsIndexContent";

export default function CombatSkillRequirementsIndex() {
  const combatSkillsUseQueryResult = useGetRecords<{
    data: paths["/skills/combat/requirements"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKeyName: "combat-skill-requirements",
    url: `${import.meta.env.VITE_API_URL}/skills/combat/requirements`,
  });

  return (
    <FeatureIndex<ComponentState["schemas"]["CombatSkillRequirementEntity"]>
      featureLabel="Combat Skill Requirements"
      featureHeaders={["Id", "Unlock Lvl", "Description", "Monster Variant"]}
      gridColsRule="grid-cols-[1fr_1fr_4fr_2fr]"
      featureUseQueryResult={combatSkillsUseQueryResult}
      renderContentFn={CombatSkillRequirementsIndexContent}
    />
  );
}
