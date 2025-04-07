import useGetRecords from "@/queries/useGetAllRecords";
import RecipesIndexContent from "../components/RecipesIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function RecipesIndex() {
  const recipesUseQueryResult = useGetRecords<
    paths["/skills/crafting/recipes"]["get"]["responses"]["200"]["content"]["application/json"]
  >({
    queryKey: queryKeys.craftingRecipes,
    url: `${import.meta.env.VITE_API_URL}/skills/crafting/recipes`,
  });

  return (
    <FeatureIndex<components["schemas"]["CraftingRecipeEntity"]>
      featureLabel="Recipes"
      featureHeaders={[
        "Name",
        "Id",
        "Resources In",
        "Items In",
        "Consumable Out",
        "Armor Out",
        "Weapon Out",
        "Requirement",
      ]}
      gridColsRule="grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={recipesUseQueryResult}
      renderContentFn={RecipesIndexContent}
    />
  );
}
