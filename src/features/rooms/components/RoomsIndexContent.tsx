import { Button } from "@/components/ui/button";
import { components } from "@/types/api";
import { Link } from "react-router";

export default function RoomsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["RoomEntity"][];
  gridColsRule: string;
}) {
  return data.map((room) => (
    <div
      className={`grid ${gridColsRule} gap-2 items-center p-2 even:bg-secondary/60`}
      key={room.id}
    >
      <div>
        <Button variant={"link"} className="pl-0" asChild>
          <Link
            to={`/rooms/${room.id.toString()}`}
            className="truncate underline"
          >
            {room.name.toString()}
          </Link>
        </Button>
      </div>
      <p>{room.id}</p>
      <p>{room.portal && "✅"}</p>
      <p>{room.obelisk && "✅"}</p>
      <p>{room.banks.length}</p>
      <p className="truncate">{room.craftingSkills.length}</p>
      <p className="truncate">{room.monsters.length}</p>
      <p className="truncate">{room.npcs.length}</p>
      <p className="truncate">{room.resources.length}</p>
      <p>{room.questSteps.length}</p>
    </div>
  ));
}
