import useGetRecords from "@/queries/useGetAllRecords";
import DropTablesIndexContent from "../components/DropTablesIndexContent";
import { paths, components } from "@/types/api";
import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import queryKeys from "@/lib/queryKeys";
export default function DropTablesIndex() {
  const dropTableUseQueryResult = useGetRecords<
    paths["/monsters/drop-tables"]["get"]["responses"]["200"]["content"]["application/json"]
  >({
    queryKey: queryKeys.dropTables,
    url: `${import.meta.env.VITE_API_URL}/monsters/drop-tables`,
  });

  return (
    <FeatureIndex<components["schemas"]["DropTableEntity"]>
      featureLabel="Drop Tables"
      featureHeaders={[
        "Id",
        "Monster Variant",
        "Resources",
        "Consumables",
        "Misc Items",
        "Weapons",
        "Armors",
        "Currency",
      ]}
      gridColsRule="grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_2fr]"
      featureUseQueryResult={dropTableUseQueryResult}
      renderContentFn={DropTablesIndexContent}
    />
  );
}
