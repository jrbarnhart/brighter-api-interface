import useGetRecords from "@/queries/useGetAllRecords";
import ArmorsIndexContent from "../components/ArmorsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";

export default function ArmorsIndex() {
  const armorsUseQueryResult = useGetRecords<{
    data: paths["/items/armors"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKeyName: "armors",
    url: `${import.meta.env.VITE_API_URL}/items/armors`,
  });

  return (
    <FeatureIndex<components["schemas"]["ArmorEntity"]>
      featureLabel="Armors"
      featureHeaders={["Name", "Id", "Faction", "Variants"]}
      gridColsRule="grid-cols-[2fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={armorsUseQueryResult}
      renderContentFn={ArmorsIndexContent}
    />
  );
}
