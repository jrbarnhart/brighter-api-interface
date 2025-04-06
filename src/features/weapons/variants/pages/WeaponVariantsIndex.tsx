import useGetRecords from "@/queries/useGetAllRecords";
import WeaponVariantsIndexContent from "../components/WeaponVariantsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function WeaponVariantsIndex() {
  const weaponVariantsUseQueryResult = useGetRecords<
    paths["/items/weapons/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >({
    queryKey: queryKeys.weaponVariants,
    url: `${import.meta.env.VITE_API_URL}/items/weapons/variants`,
  });

  return (
    <FeatureIndex<components["schemas"]["WeaponVariantEntity"]>
      featureLabel="WeaponVariants"
      featureHeaders={["Name", "Recipe", "Id", "Vendors", "Drop Tables"]}
      gridColsRule="grid-cols-[2fr_2fr_1fr_1fr_1fr]"
      featureUseQueryResult={weaponVariantsUseQueryResult}
      renderContentFn={WeaponVariantsIndexContent}
    />
  );
}
