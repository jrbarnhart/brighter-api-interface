import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RecipeDetailsContent from "../components/RecipeDetailsContent";
import UpdateRecipeForm from "../components/UpdateRecipeForm";

export default function RecipeDetails() {
  return (
    <FeatureDetails
      redirectPath="/skills/crafting/recipes"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting/recipes`}
      RenderContent={RecipeDetailsContent}
      UpdateForm={<UpdateRecipeForm />}
      queryKeyName="recipes"
      recordLabel="Recipe"
      deleteNotes=""
    />
  );
}
