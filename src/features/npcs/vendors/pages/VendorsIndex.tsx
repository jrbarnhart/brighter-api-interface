import useGetRecords from "@/queries/useGetAllRecords";
import VendorsIndexContent from "../components/VendorsIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";

export default function VendorsIndex() {
  const vendorsUseQueryResult = useGetRecords<{
    data: paths["/npcs/vendors"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({
    queryKeyName: "vendors",
    url: `${import.meta.env.VITE_API_URL}/npcs/vendors`,
  });

  return (
    <FeatureIndex<components["schemas"]["VendorEntity"]>
      featureLabel="Vendors"
      featureHeaders={[
        "Name",
        "Npc",
        "Resources",
        "Consumables",
        "Weapons",
        "Armors",
        "Misc Items",
      ]}
      gridColsRule="grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={vendorsUseQueryResult}
      renderContentFn={VendorsIndexContent}
    />
  );
}
