import { TimeInterval } from "./time";

export class Target {
  exemplar: boolean = false;
  expr: string;
  format?: "time_series" | "table" | "heatmap";
  instant?: boolean;
  hide?: boolean;
  interval: TimeInterval;
  intervalFactor?: 1 | 2 | 3 | 4 | 5 | 10;
  legendFormat: string;

  constructor(params?: Partial<Target>) {
    this.expr = params?.expr || "";
    if (params?.format !== null) this.format = params?.format;
    if (params?.instant !== undefined) this.instant = params?.instant;
    if (params?.hide !== undefined) this.hide = params.hide;
    this.interval = params?.interval || "";
    if (params?.intervalFactor !== undefined)
      this.intervalFactor = params?.intervalFactor;
    this.legendFormat = params?.legendFormat || "";
  }

  convert(version: string) {
    return JSON.parse(JSON.stringify(this));
  }
}
