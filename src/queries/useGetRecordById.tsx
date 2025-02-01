import { useQuery } from "@tanstack/react-query";

export default function useGetRecordById<T>({
  id,
  url,
  recordName,
}: {
  id: number | string;
  url: string;
  recordName: string;
}) {
  return useQuery({
    queryKey: [`${recordName}-by-id`],
    queryFn: (): Promise<T> =>
      fetch(`${url}/${id.toString()}`, {
        headers: { "Content-type": "application/json" },
      }).then((res) => res.json()),
  });
}
