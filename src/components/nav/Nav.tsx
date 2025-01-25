import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";

export default function Nav() {
  return (
    <div className="relative">
      <nav className="w-40 h-screen p-4 bg-secondary fixed top-0 left-0 flex flex-col items-start">
        <Button variant={"link"}>
          <Link to={"/"}>Dashboard</Link>
        </Button>

        <Button variant={"link"}>
          <Link to={"/regions"}>Regions</Link>
        </Button>

        <Button variant={"link"}>
          <Link to={"/rooms"}>Rooms</Link>
        </Button>
      </nav>
      <div className="p-4 pl-44">
        <Outlet />
      </div>
    </div>
  );
}
