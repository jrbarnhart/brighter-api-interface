import queryKeys from "@/lib/queryKeys";
import { axiosClient } from "@/queries/axiosClient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LogsTable from "../components/LogsTable";
import LogsControls from "../components/LogsControls";
import { useState } from "react";

export default function LogsIndex() {
  const [hideStartup, setHideStartup] = useState(true);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Logs are protected and need auth
  const token = localStorage.getItem("access_token");
  const authHeaderValue = `Bearer ${token ?? ""}`;

  // Fetch log data
  const { isLoading, isSuccess, error, data } = useQuery<{
    combinedLogs: Log[];
    combinedErrors: ErrorLog[];
  }>({
    staleTime: 600000, // 10 min
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
          combinedLogs: response.data.combinedLogs,
          combinedErrors: response.data.combinedErrors,
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
  // Combine data and sort by timestamp
  let allData = [...combinedLogs, ...combinedErrors].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });

  if (hideStartup)
    allData = allData.filter((log) => {
      const filterContexts = [
        "NestFactory",
        "NestApplication",
        "InstanceLoader",
        "RouterExplorer",
        "RoutesResolver",
      ];

      if (
        typeof log.context !== "object" &&
        filterContexts.includes(log.context.toString())
      ) {
        return false;
      }
      return true;
    });

  return (
    <>
      <LogsControls
        hideStartup={hideStartup}
        setHideStartup={setHideStartup}
        setExpandedRows={setExpandedRows}
      />
      <LogsTable
        data={allData}
        expandedRows={expandedRows}
        setExpandedRows={setExpandedRows}
      />
    </>
  );
}
