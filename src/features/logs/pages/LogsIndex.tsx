import queryKeys from "@/lib/queryKeys";
import { axiosClient } from "@/queries/axiosClient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LogsTable from "../components/LogsTable";

export default function LogsIndex() {
  // Logs are protected and need auth
  const token = localStorage.getItem("access_token");
  const authHeaderValue = `Bearer ${token ?? ""}`;

  // Fetch log data
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
    retry: (failureCount, error) => {
      const unauthorized = error.message.includes("401");
      if (unauthorized) return false;
      return failureCount < 3;
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

  const { combinedLogs, combinedErrors } = data;

  return (
    <LogsTable combinedErrors={combinedErrors} combinedLogs={combinedLogs} />
  );
}
