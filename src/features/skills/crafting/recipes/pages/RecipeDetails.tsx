import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RecipeDetailsContent from "../components/RecipeDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateCraftingRecipeForm } from "../components/RecipeForm";

export default function RecipeDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/crafting/recipes"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting/recipes`}
      RenderContent={RecipeDetailsContent}
      UpdateForm={UpdateCraftingRecipeForm}
      getByIdQueryKey={queryKeys.craftingRecipeById}
      deleteQueryKey={queryKeys.craftingRecipeById}
      recordLabel="Recipe"
      deleteNotes=""
    />
  );
}
