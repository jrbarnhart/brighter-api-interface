import { paths } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetRegionById({ id }: { id: number | string }) {
  return useQuery({
    queryKey: ["region-by-id"],
    queryFn: (): Promise<{
      data: paths["/regions/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
    }> =>
      fetch(`${import.meta.env.VITE_API_URL}/regions/${id.toString()}`, {
        headers: { "Content-type": "application/json" },
      }).then((res) => res.json()),
  });
}
