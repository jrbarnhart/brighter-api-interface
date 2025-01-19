import { Outlet } from "react-router";

export default function Regions() {
  return (
    <div>
      <h1>Regions:</h1>
      <p>Count: 10</p>
      <p>Total Rooms: 100</p>
      <Outlet />
    </div>
  );
}
