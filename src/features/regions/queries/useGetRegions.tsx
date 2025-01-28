import { paths } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetRegions() {
  return useQuery({
    queryKey: ["all-regions"],
    queryFn: (): Promise<{
      data: paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"];
    }> =>
      fetch(`${import.meta.env.VITE_API_URL}/regions`, {
        headers: new Headers(),
      }).then((res) => res.json()),
  });
}
