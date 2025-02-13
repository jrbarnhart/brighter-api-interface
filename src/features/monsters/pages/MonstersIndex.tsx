import useGetRecords from "@/queries/useGetAllRecords";
import MonstersIndexContent from "../components/MonstersIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function MonstersIndex() {
  const monstersUseQueryResult = useGetRecords<{
    data: paths["/monsters"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.monsters,
    url: `${import.meta.env.VITE_API_URL}/monsters`,
  });

  return (
    <FeatureIndex<components["schemas"]["MonsterEntity"]>
      featureLabel="Monsters"
      featureHeaders={[
        "Name",
        "Id",
        "Passive",
        "Attacks",
        "Immune",
        "Vulnerable",
        "In Rooms",
        "Variants",
      ]}
      gridColsRule="grid-cols-[2fr_1fr_1fr_2fr_2fr_2fr_1fr_1fr]"
      featureUseQueryResult={monstersUseQueryResult}
      renderContentFn={MonstersIndexContent}
    />
  );
}
