import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import MonsterVariantDetailsContent from "../components/MonsterVariantDetailsContent";
import UpdateMonsterVariantForm from "../components/UpdateMonsterVariantForm";

export default function MonsterVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/monsters/variants"
      url={`${import.meta.env.VITE_API_URL}/monsters/variants`}
      renderContentFn={MonsterVariantDetailsContent}
      updateForm={<UpdateMonsterVariantForm />}
      queryKeyName="monster-variants"
      recordLabel="Monster Variant"
      deleteNotes=""
    />
  );
}
