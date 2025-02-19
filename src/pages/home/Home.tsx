import queryKeys from "@/lib/queryKeys";
import { camelToTitleCase } from "@/lib/utils";
import { axiosClient } from "@/queries/axiosClient";
import { paths } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type StatsFetchedData = {
  stats: Data<
    paths["/stats"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

export default function Home() {
  // Card for displaying record stats
  const RecordCard = ({
    count,
    unset,
    recordName,
  }: {
    count: number;
    unset: number;
    recordName: string;
  }) => {
    const title = camelToTitleCase(recordName);

    return (
      <div>
        <h3>{title}</h3>
        <p>Total: {count}</p>
        <p>Unset: {unset}</p>
      </div>
    );
  };

  const { isLoading, isSuccess, error, data } = useQuery({
    queryKey: [queryKeys.stats],
    queryFn: async (): Promise<StatsFetchedData> => {
      try {
        const statsResult = await axiosClient.get<
          Data<
            paths["/stats"]["get"]["responses"]["200"]["content"]["application/json"]
          >
        >("/stats");
        return { stats: statsResult.data };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        } else {
          console.error(error);
          throw new Error(
            "An unexpected error occurred while fetching data for form."
          );
        }
      }
    },
  });

  // Render skeleton/error here
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!isSuccess) {
    return (
      <div>
        <p>There was a problem fetching the data.</p>
      </div>
    );
  }

  // Render the form
  const { stats } = data;
  const { counts, unset } = stats.data;

  return (
    <div>
      {Object.entries(counts).map(([countKey, count], index) => {
        const unsetVal =
          (unset[countKey as keyof typeof unset] || undefined) ?? 0;
        return (
          <RecordCard
            count={count}
            unset={unsetVal}
            recordName={countKey}
            key={index}
          />
        );
      })}
    </div>
  );
}
