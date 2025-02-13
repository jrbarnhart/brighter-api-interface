import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RecipeDetailsContent from "../components/RecipeDetailsContent";
import UpdateRecipeForm from "../components/UpdateRecipeForm";
import queryKeys from "@/lib/queryKeys";

export default function RecipeDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/crafting/recipes"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting/recipes`}
      RenderContent={RecipeDetailsContent}
      UpdateForm={UpdateRecipeForm}
      getByIdQueryKey={queryKeys.craftingRecipeById}
      deleteQueryKey={queryKeys.craftingRecipeById}
      recordLabel="Recipe"
      deleteNotes=""
    />
  );
}
