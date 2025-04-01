type Log = {
  context: Record<unknown, unknown>;
  level: string;
  message: string;
  timestamp: string;
};

type ErrorLog = Log & {
  error: Record<unknown, unknown>;
  stack: string[];
};

type ReturnedLogData = {
  combinedLogs: Log[];
  combinedErrors: ErrorLog[];
};
