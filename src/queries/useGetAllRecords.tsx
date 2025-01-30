import { useQuery } from "@tanstack/react-query";

export default function useGetRecords<T>({
  recordName,
}: {
  recordName: string;
}) {
  return useQuery({
    queryKey: [`all-${recordName}`],
    queryFn: (): Promise<T> =>
      fetch(`${import.meta.env.VITE_API_URL}/${recordName}`, {
        headers: new Headers(),
      }).then((res) => res.json()),
  });
}
