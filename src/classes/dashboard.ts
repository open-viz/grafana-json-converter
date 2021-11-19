import { satisfies } from "semver";
import { Annotations } from "./annotation";
import { Input } from "./input";
import { Panel, panelInstanceCreate } from "./panel";
import { Require } from "./require";
import { Templates } from "./template";
import { Time, TimeInterval, Timepicker } from "./time";

export class Dashboard {
  __inputs: Array<Input>;
  __requires: Array<Require>;
  annotations: Annotations;
  description: string;
  editable: boolean;
  gnetId: number | null;
  graphTooltip: 0 | 1;
  id: number | null;
  iteration: number;
  links: Array<string>;
  panels: Array<Panel>;
  refresh: TimeInterval;
  schemaVersion: number;
  style: "dark" | "light";
  tags: Array<string>;
  templating: Templates;
  time: Time;
  timepicker: Timepicker;
  timezone: "utc" | "browser";
  title: string;
  uid: string;
  version: number;

  constructor(params: Partial<OmitMethod<Dashboard>>) {
    this.__inputs =
      (params?.__inputs && params?.__inputs.map((input) => new Input(input))) ||
      [];
    this.__requires =
      (params?.__requires &&
        params?.__requires.map((require) => new Require(require))) ||
      [];
    this.annotations = new Annotations(params.annotations);
    this.description = params.description || "";
    this.editable = params.editable || true;
    this.gnetId = params.gnetId || null;
    this.graphTooltip = params.graphTooltip || 0;
    this.id = params.id || null;
    this.iteration = params.iteration || new Date().getTime();
    this.links = params.links || [];
    this.panels =
      (params.panels &&
        params.panels.map((panel) => panelInstanceCreate(panel))) ||
      [];
    this.refresh = params.refresh || "5s";
    this.schemaVersion = params.schemaVersion || 30;
    this.style = params.style || "dark";
    this.tags = params.tags || ["db", "stats"];
    this.templating = new Templates(params.templating);
    this.time = new Time(params.time);
    this.timepicker = new Timepicker(params.timepicker);
    this.timezone = params.timezone || "browser";
    this.title = params.title || "KubeDB Dashboard";
    this.uid =
      params.uid ||
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    this.version = params.version || 0;
  }

  convert(version: string) {
    const convertedDashboard: Dashboard = JSON.parse(JSON.stringify(this));
    convertedDashboard.__inputs = this.__inputs.map(
      (input) => input.convert(version) || input
    );
    convertedDashboard.__requires = this.__requires.map(
      (require) => require.convert(version) || require
    );
    convertedDashboard.annotations = this.annotations.convert(version);

    convertedDashboard.panels = this.panels.map((panel) =>
      panel.convert(version)
    );

    if (satisfies(version, ">=8.0.0")) convertedDashboard.schemaVersion = 30;
    else convertedDashboard.schemaVersion = 27;

    convertedDashboard.templating = this.templating.convert(version);

    convertedDashboard.time = this.time.convert(version);
    convertedDashboard.timepicker = this.timepicker.convert(version);

    return convertedDashboard;
  }
}
