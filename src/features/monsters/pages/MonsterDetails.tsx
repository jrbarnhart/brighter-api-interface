import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import MonsterDetailsContent from "../components/MonsterDetailsContent";
import UpdateMonsterForm from "../components/UpdateMonsterForm";

export default function MonsterDetails() {
  return (
    <FeatureDetails
      redirectPath="/monsters"
      url={`${import.meta.env.VITE_API_URL}/monsters`}
      RenderContent={MonsterDetailsContent}
      UpdateForm={<UpdateMonsterForm />}
      queryKeyName="monsters"
      recordLabel="Monster"
      deleteNotes=""
    />
  );
}
