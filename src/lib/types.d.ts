type Log = {
  context: Record<string, unknown> | string;
  level: string;
  message: string;
  timestamp: string;
};

type ErrorLog = Log & {
  error: Record<string, unknown>;
  stack: string[];
};

type LogsResponse = {
  combinedLogs: Log[];
  combinedErrors: ErrorLog[];
};

type LogsByDay = {
  [day: string]: (Log | ErrorLog)[];
};
