import { useQuery } from "@tanstack/react-query";

export default function useGetRecordById<T>({
  id,
  url,
  queryKeyName,
}: {
  id: number | string;
  url: string;
  queryKeyName: string;
}) {
  return useQuery({
    queryKey: [`${queryKeyName}-by-id`],
    queryFn: (): Promise<T> =>
      fetch(`${url}/${id.toString()}`, {
        headers: { "Content-type": "application/json" },
      }).then((res) => res.json()),
  });
}
