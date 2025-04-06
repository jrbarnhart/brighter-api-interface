import { useQuery } from "@tanstack/react-query";

export default function useGetRecords<T>({
  queryKey,
  url,
}: {
  queryKey: string;
  url: string;
}) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: (): Promise<T> => fetch(url).then((res) => res.json()),
  });
}
