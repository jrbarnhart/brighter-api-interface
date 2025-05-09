import useGetRecords from "@/queries/useGetAllRecords";
import ResourceVariantsIndexContent from "../components/ResourceVariantsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function ResourceVariantsIndex() {
  const resourceVariantsUseQueryResult = useGetRecords<
    paths["/items/resources/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >({
    queryKey: queryKeys.resourceVariants,
    url: `${import.meta.env.VITE_API_URL}/items/resources/variants`,
  });

  return (
    <FeatureIndex<components["schemas"]["ResourceVariantEntity"]>
      featureLabel="ResourceVariants"
      featureHeaders={[
        "Name",
        "Skill Req",
        "Id",
        "In Recipes",
        "Vendors",
        "Drop Tables",
      ]}
      gridColsRule="grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={resourceVariantsUseQueryResult}
      renderContentFn={ResourceVariantsIndexContent}
    />
  );
}
