import { useQuery } from "@tanstack/react-query";

export default function useGetRecords<T>({
  queryKeyName,
  url,
}: {
  queryKeyName: string;
  url: string;
}) {
  return useQuery({
    queryKey: [`all-${queryKeyName}`],
    queryFn: (): Promise<T> => fetch(url).then((res) => res.json()),
  });
}
