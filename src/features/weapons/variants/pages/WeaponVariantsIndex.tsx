import useGetRecords from "@/queries/useGetAllRecords";
import WeaponVariantsIndexContent from "../components/WeaponVariantsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";

export default function WeaponVariantsIndex() {
  const weaponVariantsUseQueryResult = useGetRecords<{
    data: paths["/items/weapons/variants"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKeyName: "weapon-variants",
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
