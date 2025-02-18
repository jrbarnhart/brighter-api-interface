import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import MonsterDetailsContent from "../components/MonsterDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateMonsterForm } from "../components/MonsterForm";

export default function MonsterDetails() {
  return (
    <FeatureDetails
      redirectPath="/monsters"
      url={`${import.meta.env.VITE_API_URL}/monsters`}
      RenderContent={MonsterDetailsContent}
      UpdateForm={UpdateMonsterForm}
      getByIdQueryKey={queryKeys.monsterById}
      deleteQueryKey={queryKeys.monsterById}
      recordLabel="Monster"
      deleteNotes=""
    />
  );
}
