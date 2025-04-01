type Log = {
  context: Record<string, unknown>;
  level: string;
  message: string;
  timestamp: string;
};

type ErrorLog = Log & {
  error: Record<string, unknown>;
  stack: string[];
};

type LogsResponse = {
  data: {
    combinedLogs: Log[];
    combinedErrors: ErrorLog[];
  };
};
