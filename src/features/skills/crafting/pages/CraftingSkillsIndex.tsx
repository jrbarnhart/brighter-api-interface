import useGetRecords from "@/queries/useGetAllRecords";
import CraftingSkillsIndexContent from "../components/CraftingSkillsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";

export default function CraftingSkillsIndex() {
  const craftingSkillsUseQueryResult = useGetRecords<{
    data: paths["/skills/crafting"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKeyName: "crafting-skills",
    url: `${import.meta.env.VITE_API_URL}/skills/crafting`,
  });

  return (
    <FeatureIndex<components["schemas"]["CraftingSkillEntity"]>
      featureLabel="Crafting Skills"
      featureHeaders={[
        "Name",
        "Region",
        "Id",
        "Crafting Rooms",
        "Reqirements",
        "Consumables",
      ]}
      gridColsRule="grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={craftingSkillsUseQueryResult}
      renderContentFn={CraftingSkillsIndexContent}
    />
  );
}
