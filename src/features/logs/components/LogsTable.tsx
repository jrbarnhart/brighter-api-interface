type LogsTableProps = {
  groupedLogs: LogsByDay;
  groupedErrors: LogsByDay;
};

export default function LogsTable({ ...props }: LogsTableProps) {
  const { groupedLogs, groupedErrors } = props;
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
