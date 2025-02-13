import useGetRecords from "@/queries/useGetAllRecords";
import MonsterVariantsIndexContent from "../components/MonsterVariantsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function MonsterVariantsIndex() {
  const monsterVariantsUseQueryResult = useGetRecords<{
    data: paths["/monsters/variants"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.monsterVariants,
    url: `${import.meta.env.VITE_API_URL}/monsters/variants`,
  });

  return (
    <FeatureIndex<components["schemas"]["MonsterVariantEntity"]>
      featureLabel="MonsterVariants"
      featureHeaders={["Name", "Skill Req", "Id", "Drop Table"]}
      gridColsRule="grid-cols-[2fr_2fr_1fr_1fr]"
      featureUseQueryResult={monsterVariantsUseQueryResult}
      renderContentFn={MonsterVariantsIndexContent}
    />
  );
}
