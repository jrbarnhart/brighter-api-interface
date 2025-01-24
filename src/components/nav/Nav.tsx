import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";

export default function Nav() {
  return (
    <div className="grid grid-flow-col grid-cols-[min-content_1fr]">
      <nav className="w-fit h-screen p-5 bg-secondary">
        <Button variant={"link"}>
          <Link to={"/"}>Dashboard</Link>
        </Button>

        <div className="flex items-center">
          <Button variant={"link"}>
            <Link to={"/regions"}>Regions</Link>
          </Button>
        </div>

        <Button variant={"link"}>
          <Link to={"/rooms"}>Rooms</Link>
        </Button>
      </nav>
      <div className="w-full h-full p-5">
        <Outlet />
      </div>
    </div>
  );
}
