import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";

export default function Nav() {
  return (
    <div className="grid grid-flow-col grid-cols-[auto_1fr] h-full">
      <nav className="row-span-full col-start-1 col-end-2 w-48 h-screen p-4 bg-secondary flex flex-col items-start">
        <p className="text-3xl text-background pt-1">Brighter API</p>
        <Button variant={"link"} className="text-xl pl-0">
          <Link to={"/"}>Dashboard</Link>
        </Button>

        <Button variant={"link"} className="text-xl pl-0">
          <Link to={"/regions"}>Regions</Link>
        </Button>

        <Button variant={"link"} className="text-xl pl-0">
          <Link to={"/rooms"}>Rooms</Link>
        </Button>
      </nav>
      <div className="h-full w-full col-start-2 col-end-3">
        <Outlet />
      </div>
    </div>
  );
}
