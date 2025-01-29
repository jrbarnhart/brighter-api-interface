import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export default function useGetRecordById<T>({
  id,
  basePath,
}: {
  id: number | string;
  basePath: string;
}) {
  return useQuery({
    queryKey: ["region-by-id"],
    queryFn: (): Promise<{
      data: T;
    }> =>
      fetch(`${import.meta.env.VITE_API_URL}${basePath}/${id.toString()}`, {
        headers: { "Content-type": "application/json" },
      }).then((res) => res.json()),
  });
}
