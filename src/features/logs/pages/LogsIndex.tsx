import queryKeys from "@/lib/queryKeys";
import { axiosClient } from "@/queries/axiosClient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  type LogsByDay = {
    [day: string]: (Log | ErrorLog)[];
  };

  const groupLogsByDay = (logs: Log[] | ErrorLog[]): LogsByDay => {
    return logs.reduce((groups: LogsByDay, log: Log | ErrorLog) => {
      // Create a Date object from the timestamp
      const date = new Date(log.timestamp);

      // Format the date as you prefer, for example: "Monday, January 1, 2023"
      const day = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Create a group for the formatted day if it doesn't exist yet
      if (!groups[day]) {
        groups[day] = [];
      }

      // Add current log to the proper day array
      groups[day].push(log);

      return groups;
    }, {});
  };

  const groupedLogs = groupLogsByDay(logs);
  const groupedErrors = groupLogsByDay(errors);

  return (
    <div>
      <div>
        <p>Logs:</p>
        {Object.keys(groupedLogs).map((groupName) => (
          <div key={groupName}>
            <p>{groupName}</p>
            {groupedLogs[groupName]?.map((log, index) => (
              <p key={log.timestamp + index.toString()}>
                {JSON.stringify(log)}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div>
        <p>Errors:</p>
        {Object.keys(groupedErrors).map((groupName) => (
          <div key={groupName}>
            <p>{groupName}</p>
            {groupedErrors[groupName]?.map((errorLog, index) => (
              <p key={errorLog.timestamp + index.toString()}>
                {JSON.stringify(errorLog)}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
