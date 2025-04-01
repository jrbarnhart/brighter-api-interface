import queryKeys from "@/lib/queryKeys";
import useGetRecords from "@/queries/useGetAllRecords";

export default function LogsIndex() {
  // Fetch log data
  const logsQueryResult = useGetRecords<{
    data: ReturnedLogData;
  }>({
    queryKey: queryKeys.logs,
    url: `${import.meta.env.VITE_API_URL}/logs`,
  });

  const { isLoading, isSuccess, error, data } = logsQueryResult;

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!isSuccess) {
    return (
      <div>
        <p>There was a problem fetching the logs data.</p>
      </div>
    );
  }

  const { data: returnedLogData } = data;
  const { combinedLogs: logs, combinedErrors: errors } = returnedLogData;

  // Group logs by day
  type LogsByDay = {
    [day: string]: (Log | ErrorLog)[];
  };
  const groupLogsByDay = (logs: Log[] | ErrorLog[]): LogsByDay => {
    return logs.reduce((groups: LogsByDay, log: Log | ErrorLog) => {
      const day = log.timestamp.split("T")[0] || "Day Not Found";

      // Create a group for the found day if it doesn't exist yet
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
      {Object.keys(groupedLogs).map((groupName) => (
        <div key={groupName}>
          <p>Logs:</p>
          {groupedLogs[groupName]?.map((log) => (
            <p key={log.timestamp}>{JSON.stringify(log)}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
