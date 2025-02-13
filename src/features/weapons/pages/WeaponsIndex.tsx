import useGetRecords from "@/queries/useGetAllRecords";
import WeaponsIndexContent from "../components/WeaponsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function WeaponsIndex() {
  const weaponsUseQueryResult = useGetRecords<{
    data: paths["/items/weapons"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKey: queryKeys.weapons,
    url: `${import.meta.env.VITE_API_URL}/items/weapons`,
  });

  return (
    <FeatureIndex<components["schemas"]["WeaponEntity"]>
      featureLabel="Weapons"
      featureHeaders={[
        "Name",
        "Id",
        "Element",
        "2-Handed",
        "Ranged",
        "Variants",
      ]}
      gridColsRule="grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={weaponsUseQueryResult}
      renderContentFn={WeaponsIndexContent}
    />
  );
}
