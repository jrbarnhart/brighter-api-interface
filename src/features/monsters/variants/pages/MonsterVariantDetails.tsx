import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import MonsterVariantDetailsContent from "../components/MonsterVariantDetailsContent";
import UpdateMonsterVariantForm from "../components/UpdateMonsterVariantForm";
import queryKeys from "@/lib/queryKeys";

export default function MonsterVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/monsters/variants"
      url={`${import.meta.env.VITE_API_URL}/monsters/variants`}
      RenderContent={MonsterVariantDetailsContent}
      UpdateForm={UpdateMonsterVariantForm}
      getByIdQueryKey={queryKeys.monsterVariants}
      deleteQueryKey={queryKeys.monsterVariantById}
      recordLabel="Monster Variant"
      deleteNotes=""
    />
  );
}
