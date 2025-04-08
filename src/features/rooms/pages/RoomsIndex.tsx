import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import useGetRecords from "@/queries/useGetAllRecords";
import { paths, components } from "@/types/api";
import RoomsIndexContent from "../components/RoomsIndexContent";
import queryKeys from "@/lib/queryKeys";
export default function RoomsIndex() {
  const roomsUseQueryResult = useGetRecords<
    paths["/rooms"]["get"]["responses"]["200"]["content"]["application/json"]
  >({
    queryKey: queryKeys.rooms,
    url: `${import.meta.env.VITE_API_URL}/rooms`,
  });
  return (
    <FeatureIndex<components["schemas"]["RoomEntity"]>
      featureLabel="Rooms"
      featureHeaders={[
        "Name",
        "Id",
        "Portal",
        "Obelisk",
        "Rift",
        "Banks",
        "Crafting",
        "Monsters",
        "NPCs",
        "Resources",
        "Quests",
      ]}
      gridColsRule="grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
      featureUseQueryResult={roomsUseQueryResult}
      renderContentFn={RoomsIndexContent}
    />
  );
}
