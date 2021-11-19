import { satisfies } from "semver";
import {
  StatFieldConfig,
  TimeseriesFieldConfig,
  Links,
  TableFieldConfig,
} from "./field-config";
import { OptionsStat, OptionsTable, OptionsTimeseries } from "./options";
import { Target } from "./target";
import {
  transformationInstanceCreate,
  TransformationTypes,
} from "./transformation";

export function panelInstanceCreate(params: Partial<OmitMethod<Panel>>) {
  if (params.type === "row") {
    return new RowPanel(params as OmitMethod<RowPanel>);
  } else if (params.type === "stat")
    return new StatPanel(params as OmitMethod<StatPanel>);
  else if (params.type === "timeseries")
    return new TimeseriesPanel(params as OmitMethod<TimeseriesPanel>);
  else if (params.type === "table")
    return new TablePanel(params as OmitMethod<TablePanel>);
  else return new Panel(params);
}

interface GridPos {
  h: number;
  w: number;
  x: number;
  y: number;
}

export class Panel {
  type: string;
  title: string;
  datasource: string | null;
  description?: string;
  interval?: number | null;
  gridPos: GridPos;
  id: number;
  timeShift?: string | null;
  timeFrom?: string | null;

  constructor(params?: Partial<OmitMethod<Panel>>) {
    this.title = params?.title || "Panel";
    this.datasource = params?.datasource || null;
    params?.description !== undefined
      ? (this.description = params?.description)
      : "";
    params?.interval !== undefined
      ? (this.interval = params?.interval || null)
      : "";
    this.gridPos = params?.gridPos || { h: 1, w: 24, x: 0, y: 0 };
    this.id = params?.id || 0;

    if (params?.timeFrom !== undefined) this.timeFrom = params.timeFrom;
    if (params?.timeShift !== undefined) this.timeShift = params.timeShift;
  }

  convert(version: string) {
    return JSON.parse(JSON.stringify(this));
  }
}

export class RowPanel extends Panel {
  override type: "row" = "row";
  collapsed: boolean;
  panels: Array<Panel>;

  constructor(params?: Partial<OmitMethod<RowPanel>>) {
    super(params);
    this.panels =
      params?.panels?.map((panel) => panelInstanceCreate(panel)) || [];
    this.collapsed = params?.collapsed || false;
  }

  override convert(version: string) {
    return super.convert(version);
  }
}

export class NonRowPanel extends Panel {
  links?: Links;
  override type: "stat" | "timeseries" | "table";
  cacheTimeout?: null;
  transparent?: boolean;
  maxDataPoints?: number;
  targets: Array<Target>;
  transformations?: Array<TransformationTypes>;
  pluginVersion: string;

  constructor(params?: Partial<OmitMethod<NonRowPanel>>) {
    super(params);

    if (params?.cacheTimeout !== undefined)
      this.cacheTimeout = params.cacheTimeout;

    params?.transparent ? (this.transparent = params.transparent) : "";
    this.links = params?.links || [];
    params?.maxDataPoints ? (this.maxDataPoints = params.maxDataPoints) : "";
    this.pluginVersion = params?.pluginVersion || "";
    params?.targets
      ? (this.targets = params.targets.map((target) => new Target(target)))
      : "";

    if (params?.targets) {
      this.targets = params.targets.map((target) => new Target(target));
    }

    if (params?.transformations) {
      this.transformations = params.transformations.map((transformation) =>
        transformationInstanceCreate(transformation)
      );
    }
  }

  override convert(version: string) {
    const convertedNonRowPanel: NonRowPanel & Panel = super.convert(version);
    this.targets
      ? (convertedNonRowPanel.targets = this.targets.map((target) =>
          target.convert(version)
        ))
      : "";
    if (this.transformations) {
      convertedNonRowPanel.transformations = this.transformations
        .filter((transformation) => {
          if (satisfies(version, "<=8.0.0")) {
            // no support for this type of transformation
            if (
              transformation.id === "configFromData" ||
              transformation.id === "histogram" ||
              transformation.id === "rowsToFields"
            )
              return false;
          }

          return true;
        })
        .map((transformation) => transformation.convert(version));
    }
    if (satisfies(version, ">=8.0.0"))
      convertedNonRowPanel.pluginVersion = "8.1.2";
    else convertedNonRowPanel.pluginVersion = "7.4.5";

    return convertedNonRowPanel;
  }

  static addTargetExprs(panel: OmitMethod<NonRowPanel>, exprs: Array<string>) {
    const newPanel: OmitMethod<NonRowPanel> = JSON.parse(JSON.stringify(panel));
    const { targets } = newPanel || { targets: [] };
    newPanel.targets = targets.map((target, index) => {
      const newTarget = JSON.parse(JSON.stringify(target));
      newTarget.expr = exprs[index];
      return newTarget;
    });
    return newPanel;
  }
}

export class StatPanel extends NonRowPanel {
  override type: "stat" = "stat";
  fieldConfig: StatFieldConfig;
  options: OptionsStat;

  constructor(params?: Partial<OmitMethod<StatPanel>>) {
    super(params);
    this.fieldConfig = new StatFieldConfig(params?.fieldConfig);
    this.options = new OptionsStat(params?.options);
  }

  override convert(version: string) {
    const convertedStatPanel = super.convert(version) as StatPanel &
      NonRowPanel;
    convertedStatPanel.fieldConfig = this.fieldConfig.convert(version);
    convertedStatPanel.options = this.options.convert(version);

    return convertedStatPanel;
  }
}

export class TimeseriesPanel extends NonRowPanel {
  override type: "timeseries" = "timeseries";
  fieldConfig: TimeseriesFieldConfig;
  options: OptionsTimeseries;

  constructor(params?: Partial<OmitMethod<TimeseriesPanel>>) {
    super(params);
    this.fieldConfig = new TimeseriesFieldConfig(params?.fieldConfig);
    this.options = new OptionsTimeseries(params?.options);
  }

  override convert(version: string) {
    const convertedTimeseriesPanel = super.convert(version) as TimeseriesPanel &
      NonRowPanel;
    convertedTimeseriesPanel.fieldConfig = this.fieldConfig.convert(version);
    convertedTimeseriesPanel.options = this.options.convert(version);

    return convertedTimeseriesPanel;
  }
}

export class TablePanel extends NonRowPanel {
  override type: "table" = "table";
  fieldConfig: TableFieldConfig;
  options: OptionsTable;

  constructor(params?: Partial<OmitMethod<TablePanel>>) {
    super(params);
    this.fieldConfig = new TableFieldConfig(params?.fieldConfig);
    this.options = new OptionsTable(params?.options);
  }

  override convert(version: string) {
    const convertedTablePanel = super.convert(version) as TablePanel &
      NonRowPanel;
    convertedTablePanel.fieldConfig = this.fieldConfig.convert(version);
    convertedTablePanel.options = this.options.convert(version);

    return convertedTablePanel;
  }
}
