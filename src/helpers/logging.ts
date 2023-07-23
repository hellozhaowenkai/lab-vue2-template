enum LogLevel {
  NOTSET,
  DEBUG,
  INFO,
  WARNING,
  ERROR,
  CRITICAL,
}

type LogLevelStrings = keyof typeof LogLevel;

export class Logger {
  public name: string;
  private level: LogLevelStrings;

  constructor(name: string, level?: LogLevelStrings) {
    this.name = name;
    this.level = level || "WARNING";
  }

  output(level: LogLevelStrings, ...data: any[]): void {
    if (LogLevel[level] < LogLevel[this.level]) return;

    switch (level) {
      case "DEBUG":
        console.debug(...data);
        break;
      case "INFO":
        console.info(...data);
        break;
      case "WARNING":
        console.warn(...data);
        break;
      case "ERROR":
        console.error(...data);
        break;
      case "CRITICAL":
        console.trace(...data);
        break;
      default:
        console.log(...data);
        break;
    }
  }

  debug(...data: any[]): void {
    this.output("DEBUG", ...data);
  }

  info(...data: any[]): void {
    this.output("INFO", ...data);
  }

  warning(...data: any[]): void {
    this.output("WARNING", ...data);
  }

  error(...data: any[]): void {
    this.output("ERROR", ...data);
  }

  critical(...data: any[]): void {
    this.output("CRITICAL", ...data);
  }
}

export const logger = new Logger(
  "GlobalLogger",
  require("@/helpers/is-production") ? "ERROR" : "DEBUG"
);
