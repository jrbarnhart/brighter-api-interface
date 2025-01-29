import { useQuery } from "@tanstack/react-query";

export default function useGetRecordById<T>({
  id,
  basePath,
}: {
  id: number | string;
  basePath: string;
}) {
  return useQuery({
    queryKey: ["region-by-id"],
    queryFn: (): Promise<T> =>
      fetch(`${import.meta.env.VITE_API_URL}${basePath}/${id.toString()}`, {
        headers: { "Content-type": "application/json" },
      }).then((res) => res.json()),
  });
}
