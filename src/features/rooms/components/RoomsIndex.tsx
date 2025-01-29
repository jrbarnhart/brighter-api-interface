import FeatureIndex from "@/components/featureIndex/FeatureIndex";
import useGetRecords from "@/queries/useGetAllRecords";
import { paths, components } from "@/types/api";
import RoomDetailsContents from "./RoomDetailsContents";

export default function RoomsIndex() {
  const roomsUseQueryResult = useGetRecords<{
    data: paths["/rooms"]["get"]["responses"]["200"]["content"]["application/json"];
  }>();
  return (
    <FeatureIndex<components["schemas"]["RoomEntity"]>
      featureLabel="Rooms"
      featureName="rooms"
      featureHeaders={["Name", "Id"]}
      gridColsRule="grid-cols-[1fr_1fr]"
      featureUseQueryResult={roomsUseQueryResult}
      renderContentFn={RoomDetailsContents}
    />
  );
}
