import useGetRecords from "@/queries/useGetAllRecords";
import ArmorVariantsIndexContent from "../components/ArmorVariantsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";

export default function ArmorVariantsIndex() {
  const armorVariantsUseQueryResult = useGetRecords<{
    data: paths["/items/armors/variants"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.armorVariants,
    url: `${import.meta.env.VITE_API_URL}/items/armors/variants`,
  });

  return (
    <FeatureIndex<components["schemas"]["ArmorVariantEntity"]>
      featureLabel="ArmorVariants"
      featureHeaders={["Name", "Recipe", "Id", "Vendors", "Drop Tables"]}
      gridColsRule="grid-cols-[2fr_2fr_1fr_1fr_1fr]"
      featureUseQueryResult={armorVariantsUseQueryResult}
      renderContentFn={ArmorVariantsIndexContent}
    />
  );
}
