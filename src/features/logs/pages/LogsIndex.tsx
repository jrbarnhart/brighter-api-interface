import queryKeys from "@/lib/queryKeys";
import { axiosClient } from "@/queries/axiosClient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LogsTable from "../components/LogsTable";
import { groupLogsByDay } from "@/lib/dataUtils";

export default function LogsIndex() {
  // Fetch log data
  const token = localStorage.getItem("access_token");
  const authHeaderValue = `Bearer ${token ?? ""}`;

  const { isLoading, isSuccess, error, data } = useQuery<{
    combinedLogs: Log[];
    combinedErrors: ErrorLog[];
  }>({
    queryKey: [queryKeys.logs],
    queryFn: async () => {
      try {
        const response = await axiosClient.get<LogsResponse>(
          `${import.meta.env.VITE_API_URL}/logs`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeaderValue,
            },
          }
        );

        // Return just the data we need, removing the unnecessary nesting
        return {
          combinedLogs: response.data.data.combinedLogs,
          combinedErrors: response.data.data.combinedErrors,
        };
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

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if (!isSuccess) {
    return (
      <div>
        <p>There was a problem fetching the logs data.</p>
      </div>
    );
  }

  const { combinedLogs: logs, combinedErrors: errors } = data;

  // Group logs by day
  const groupedLogs = groupLogsByDay(logs);
  const groupedErrors = groupLogsByDay(errors);

  return <LogsTable groupedErrors={groupedErrors} groupedLogs={groupedLogs} />;
}
