import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import useGetRecords from "@/queries/useGetAllRecords";
import { paths, components } from "@/types/api";
import RoomsIndexContent from "./RoomsIndexContent";

export default function RoomsIndex() {
  const roomsUseQueryResult = useGetRecords<{
    data: paths["/rooms"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({ recordName: "rooms" });
  return (
    <FeatureIndex<components["schemas"]["RoomEntity"]>
      featureLabel="Rooms"
      featureName="rooms"
      featureHeaders={[
        "Name",
        "Region",
        "Id",
        "Portal",
        "Obelisk",
        "Banks",
        "Crafting",
        "Monsters",
        "NPCs",
        "Resources",
        "Quests",
      ]}
      gridColsRule="grid-cols-[3fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={roomsUseQueryResult}
      renderContentFn={RoomsIndexContent}
    />
  );
}
