export type TimeInterval =
  | "5s"
  | "10s"
  | "30s"
  | "1m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "2h"
  | "6h"
  | "12h"
  | "24h"
  | "1d"
  | "2d"
  | "7d"
  | "30d"
  | "";

export class Timepicker {
  refresh_intervals: Array<TimeInterval>;
  time_options: Array<TimeInterval>;

  constructor(params?: Partial<Timepicker>) {
    this.refresh_intervals = params?.refresh_intervals || [
      "5s",
      "10s",
      "30s",
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "2h",
      "1d",
    ];
    this.time_options = params?.time_options || [
      "5m",
      "15m",
      "1h",
      "6h",
      "12h",
      "24h",
      "2d",
      "7d",
      "30d",
    ];
  }

  convert(version: string) {
    return this;
  }
}

export class Time {
  from: string;
  to: string;

  constructor(params?: Partial<Time>) {
    this.from = params?.from || "now-6h";
    this.to = params?.to || "now";

    Object.assign(this, params);
  }
  convert(version: string) {
    return this;
  }
}
