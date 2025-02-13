import useGetRecords from "@/queries/useGetAllRecords";
import CombatSkillsIndexContent from "../components/CombatSkillsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";

export default function CombatSkillsIndex() {
  const combatSkillsUseQueryResult = useGetRecords<{
    data: paths["/skills/combat"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKeyName: "all-combat-skills",
    url: `${import.meta.env.VITE_API_URL}/skills/combat`,
  });

  return (
    <FeatureIndex<components["schemas"]["CombatSkillEntity"]>
      featureLabel="Combat Skills"
      featureHeaders={["Name", "Region", "Id", "Monsters", "Reqirements"]}
      gridColsRule="grid-cols-[1fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={combatSkillsUseQueryResult}
      renderContentFn={CombatSkillsIndexContent}
    />
  );
}
