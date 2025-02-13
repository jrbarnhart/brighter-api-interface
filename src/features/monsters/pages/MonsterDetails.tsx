import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import MonsterDetailsContent from "../components/MonsterDetailsContent";
import UpdateMonsterForm from "../components/UpdateMonsterForm";
import queryKeys from "@/lib/queryKeys";

export default function MonsterDetails() {
  return (
    <FeatureDetails
      redirectPath="/monsters"
      url={`${import.meta.env.VITE_API_URL}/monsters`}
      RenderContent={MonsterDetailsContent}
      UpdateForm={UpdateMonsterForm}
      getByIdQueryKey={queryKeys.monsters}
      deleteQueryKey={queryKeys.monsterById}
      recordLabel="Monster"
      deleteNotes=""
    />
  );
}
