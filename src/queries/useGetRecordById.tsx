import { useQuery } from "@tanstack/react-query";

export default function useGetRecordById<T>({
  id,
  basePath,
  recordName,
}: {
  id: number | string;
  basePath: string;
  recordName: string;
}) {
  return useQuery({
    queryKey: [`${recordName}-by-id`],
    queryFn: (): Promise<T> =>
      fetch(`${import.meta.env.VITE_API_URL}${basePath}/${id.toString()}`, {
        headers: { "Content-type": "application/json" },
      }).then((res) => res.json()),
  });
}
