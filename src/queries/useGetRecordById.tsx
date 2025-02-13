import { useQuery } from "@tanstack/react-query";

export default function useGetRecordById<T>({
  id,
  url,
  queryKey,
}: {
  id: number | string;
  url: string;
  queryKey: string;
}) {
  return useQuery({
    queryKey: [`${queryKey}-by-id`],
    queryFn: (): Promise<T> =>
      fetch(`${url}/${id.toString()}`, {
        headers: { "Content-type": "application/json" },
      }).then((res) => res.json()),
  });
}
