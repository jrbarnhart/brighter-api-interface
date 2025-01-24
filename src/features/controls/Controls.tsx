import { Outlet } from "react-router";

export default function Controls() {
  return (
    <div className="grid grid-flow-col grid-cols-[min-content_1fr]">
      <nav className="w-fit h-screen p-5 bg-secondary">
        <p>Dashboard</p>
        <p>Regions</p>
        <p>Rooms</p>
      </nav>
      <div className="w-full h-full p-5">
        <Outlet />
      </div>
    </div>
  );
}
