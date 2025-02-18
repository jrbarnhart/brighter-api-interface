import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import MonsterVariantDetailsContent from "../components/MonsterVariantDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateMonsterVariantForm } from "../components/MonsterVariantForm";

export default function MonsterVariantDetails() {
  return (
    <FeatureDetails
      redirectPath="/monsters/variants"
      url={`${import.meta.env.VITE_API_URL}/monsters/variants`}
      RenderContent={MonsterVariantDetailsContent}
      UpdateForm={UpdateMonsterVariantForm}
      getByIdQueryKey={queryKeys.monsterVariantById}
      deleteQueryKey={queryKeys.monsterVariantById}
      recordLabel="Monster Variant"
      deleteNotes=""
    />
  );
}
