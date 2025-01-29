import { useQuery } from "@tanstack/react-query";

export default function useGetRecords<T>() {
  return useQuery({
    queryKey: ["all-regions"],
    queryFn: (): Promise<T> =>
      fetch(`${import.meta.env.VITE_API_URL}/regions`, {
        headers: new Headers(),
      }).then((res) => res.json()),
  });
}
