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
    this.level = level || "DEBUG";
  }

  output(level: LogLevelStrings, ...data: any[]): void {
    if (LogLevel[level] >= LogLevel[this.level]) console.log(...data);
  }
}
