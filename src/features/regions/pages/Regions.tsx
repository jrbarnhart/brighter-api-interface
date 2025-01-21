// import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";

export default function Regions() {
  // const query = useQuery({
  //   queryKey: ["regions"],
  //   queryFn: async () => {
  //     const response = await fetch(`${process.env.API_URL ?? ""}/regions`);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   },
  // });

  return (
    <div>
      <h1>Regions:</h1>
      <p>Count: 10</p>
      <p>Total Rooms: 100</p>
      <Outlet />
    </div>
  );
}
