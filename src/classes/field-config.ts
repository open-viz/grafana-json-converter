import { satisfies } from "semver";
import { OmitMethod } from "../../non-function-properties";

class TimeseriesCustom {
  drawStyle: "line" | "bars" | "points";
  lineInterpolation: "linear" | "smooth" | "stepBefore" | "stepAfter";
  barAlignment: -1 | 0 | 1;
  lineWidth: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  fillOpacity: number;
  fillBelowTo?: string;
  gradientMode: "none" | "opacity" | "hue" | "scheme"; // scheme only in v8
  spanNulls: boolean | number;
  showPoints: "auto" | "always" | "never";
  pointSize?: number;
  // only in v8
  stacking?: {
    mode: "none" | "normal" | "percent";
    group: string;
  };
  axisPlacement: "auto" | "left" | "right" | "hidden";
  axisLabel?: string;
  axisWidth?: number;
  axisSoftMin?: number;
  axisSoftMax?: number;
  scaleDistribution: {
    type: "linear" | "log";
    log?: 2 | 10;
  };
  hideFrom: {
    tooltip: boolean;
    graph?: boolean; // for v7
    viz?: boolean; // for v8
    legend: boolean;
  };
  lineStyle?: {
    fill: "solid" | "dash" | "dot";
    dash: Array<number>;
  };
  // only in v8
  thresholdsStyle?: {
    mode: "off" | "line" | "area" | "line+area";
  };

  constructor(params: Partial<OmitMethod<TimeseriesCustom>>) {
    this.drawStyle = params.drawStyle || "line";
    this.lineInterpolation = params.lineInterpolation || "linear";
    this.barAlignment = params.barAlignment || 0;
    this.lineWidth = params.lineWidth || 1;
    this.fillOpacity = params.fillOpacity || 0;
    if (params.fillBelowTo !== undefined) this.fillBelowTo = params.fillBelowTo;
    this.gradientMode = params.gradientMode || "none";
    this.spanNulls = params.spanNulls || false;
    this.showPoints = params.showPoints || "never";
    this.pointSize = params.pointSize || 0;
    if (params.stacking !== undefined)
      this.stacking = params.stacking || { mode: "none", group: "A" };
    this.axisPlacement = params.axisPlacement || "auto";
    if (params.axisLabel !== undefined) this.axisLabel = params.axisLabel || "";
    if (params.axisWidth !== undefined) this.axisWidth = params.axisWidth || 0;
    if (params.axisSoftMin !== undefined)
      this.axisSoftMin = params.axisSoftMin || 0;
    if (params.axisSoftMax !== undefined)
      this.axisSoftMax = params.axisSoftMax || 0;
    this.scaleDistribution = params.scaleDistribution || {
      type: "linear",
    };
    this.hideFrom = params.hideFrom || {
      tooltip: false,
      viz: false,
      legend: false,
    };
    if (params.lineStyle !== undefined)
      this.lineStyle = params.lineStyle || { fill: "solid", dash: [] };
    if (params.thresholdsStyle !== undefined)
      this.thresholdsStyle = params.thresholdsStyle || { mode: "off" };
  }

  convert(version: string) {
    const convertedCustom: TimeseriesCustom = JSON.parse(JSON.stringify(this));
    if (satisfies(version, ">=8.0.0")) {
      delete convertedCustom.hideFrom.graph;
    } else {
      delete convertedCustom.stacking;
      delete convertedCustom.thresholdsStyle;
      delete convertedCustom.hideFrom.viz;
      if (this.gradientMode === "scheme") convertedCustom.gradientMode = "none";
    }

    return convertedCustom;
  }
}
class TableCustom {
  align: "auto" | "left" | "center" | "right" | null;
  displayMode:
    | "auto"
    | "color-text"
    | "color-background"
    | "color-background-solid"
    | "gradient-gauge"
    | "lcd-gauge"
    | "basic"
    | "json-view"
    | "image";
  minWidth?: number; // for v8
  width?: number; // for v7 and v8
  filterable?: boolean;

  constructor(params?: Partial<TableCustom>) {
    this.align = params?.align || null;
    this.displayMode = params?.displayMode || "auto";
    if (params?.minWidth !== undefined) this.minWidth = params.minWidth;
    if (params?.width !== undefined) this.width = params.width;
    if (params?.filterable !== undefined)
      this.filterable = params?.filterable || false;
  }

  convert(version: string) {
    const convertedTableCustom: TableCustom = JSON.parse(JSON.stringify(this));
    if (satisfies(version, "<8.0.0")) {
      delete convertedTableCustom.minWidth;
      if (this.displayMode === "color-background-solid")
        convertedTableCustom.displayMode = "color-background";
    }
    return convertedTableCustom;
  }
}

class Color {
  mode:
    | "thresholds"
    | "fixed"
    | "palette-classic"
    | "continuous-GrYlRd"
    | "continuous-RdYlGr"
    | "continuous-RdYlGr"
    | "continuous-YlRd"
    | "continuous-BlPu"
    | "continuous-YlBl"
    | "continuous-blues"
    | "continuous-reds"
    | "continuous-greens"
    | "continuous-purples";
  fixedColor?: string;

  constructor(params?: Partial<OmitMethod<Color>>) {
    this.mode = params?.mode || "thresholds";
    if (params?.fixedColor !== undefined)
      this.fixedColor = params?.fixedColor || "rgb(204, 204, 220)";
  }

  convert(version: string) {
    const convertedColor = JSON.parse(JSON.stringify(this));
    if (this.mode !== "thresholds") {
      if (satisfies(version, ">=8.0.0")) {
        convertedColor.fixedColor = this.fixedColor;
      } else {
        if (convertedColor.fixedColor === "text") {
          convertedColor.fixedColor = "rgb(204, 204, 220)";
        }
      }
    }

    return convertedColor;
  }
}
class Thresholds {
  mode: "absolute" | "percentage";
  steps: Array<{ color: string; value: string | number | null }>;

  constructor(params?: Partial<OmitMethod<Thresholds>>) {
    this.mode = params?.mode || "absolute";
    this.steps = params?.steps || [];
  }

  convert(version: string) {
    const convertedThreshold: Thresholds = JSON.parse(JSON.stringify(this));
    convertedThreshold.steps = this.steps.map((step) => {
      return {
        color:
          version < "8.0" && step.color === "text"
            ? "rgb(204, 204, 220)"
            : step.color,
        value: step.value,
      };
    });
    return convertedThreshold;
  }
}

interface MapResult {
  text?: string;
  color?: string;
}
type ValueMapping = Record<string, MapResult>;
interface RangeMapping {
  from: number;
  to: number;
  result: MapResult;
}
interface SpecialMapping {
  match: "null" | "nan" | "null+nan" | "true" | "false" | "empty";
  result: MapResult;
}

interface Mapping {
  type: "value" | "range" | "special";
  options: ValueMapping | RangeMapping | SpecialMapping;
}

class Mappings extends Array<Mapping> {
  constructor(items: Array<Mapping>) {
    super();
    items.forEach((item, index) => {
      this[index] = item;
    });
  }
  convert(version: string) {
    if (satisfies(version, "<8.0.0")) {
      const newItems: Array<unknown> = [];
      this.forEach((item) => {
        if (item.type === "value") {
          const options: ValueMapping = item.options as ValueMapping;
          Object.keys(options).forEach((key) => {
            newItems.push({
              type: 1,
              value: key,
              text: options[key].text || key,
            });
          });
        } else if (item.type === "range") {
          const options: RangeMapping = item.options as RangeMapping;
          newItems.push({
            type: 2,
            to: options.to,
            from: options.from,
            text: options.result.text,
          });
        } else {
          const options: SpecialMapping = item.options as SpecialMapping;
          newItems.push({
            type: 1,
            value: options.match,
            text: options.result.text,
          });
        }
      });

      return newItems;
    } else return this;
  }
}
type NoValue = string;
type DisplayName = string;
type Decimals = number;
type Max = number;
type Min = number;
type Unit = string;
export type Links = Array<{
  title: string;
  url: string;
  targetBlank?: boolean;
}>;

class Defaults {
  color: Color;
  thresholds: Thresholds;
  mappings: Mappings;
  noValue?: NoValue;
  displayName?: DisplayName;
  decimals?: Decimals;
  max?: Max;
  min?: Min;
  unit?: Unit;
  links?: Links;

  constructor(params?: Partial<OmitMethod<Defaults>>) {
    this.color = new Color(params?.color);
    this.thresholds = new Thresholds(params?.thresholds || {});

    if (params?.mappings !== undefined) {
      this.mappings = new Mappings(params.mappings);
    } else this.mappings = new Mappings([]);

    params?.noValue !== undefined ? (this.noValue = params?.noValue) : "";
    params?.displayName !== undefined
      ? (this.displayName = params?.displayName)
      : "";
    params?.decimals !== undefined ? (this.decimals = params?.decimals) : "";
    params?.max !== undefined ? (this.max = params?.max) : "";
    params?.min !== undefined ? (this.min = params?.min) : "";
    params?.unit !== undefined ? (this.unit = params?.unit) : "";
    params?.links !== undefined ? (this.links = params?.links) : "";
  }

  convert(version: string) {
    const convertedDefaults = JSON.parse(JSON.stringify(this));
    convertedDefaults.color = this.color.convert(version);
    convertedDefaults.thresholds = this.thresholds.convert(version);
    convertedDefaults.mappings = this.mappings.convert(version);

    return convertedDefaults;
  }
}

class TimeseriesDefaults extends Defaults {
  custom: TimeseriesCustom;
  constructor(params?: Partial<OmitMethod<TimeseriesDefaults>>) {
    super(params);
    if (params?.custom) {
      this.custom = new TimeseriesCustom(params?.custom);
    }
  }
  override convert(version: string) {
    const convertedTimeseriesDefaults = super.convert(version);
    convertedTimeseriesDefaults.custom = this.custom.convert(version);
    return convertedTimeseriesDefaults;
  }
}
class TableDefaults extends Defaults {
  custom: TableCustom;
  constructor(params?: Partial<OmitMethod<TableDefaults>>) {
    super(params);
    if (params?.custom) {
      this.custom = new TableCustom(params?.custom);
    }
  }
  override convert(version: string) {
    const convertedTableDefaults = super.convert(version);
    convertedTableDefaults.custom = this.custom.convert(version);
    return convertedTableDefaults;
  }
}

class OverrideProperty {
  id:
    | "unit"
    | "min"
    | "max"
    | "decimals"
    | "displayName"
    | "noValue"
    | "color"
    | "thresholds"
    | "links"
    | "mappings"
    | `custom.${keyof TimeseriesCustom}`
    | `custom.${keyof TableCustom}`;
  value:
    | Unit
    | Min
    | Max
    | Decimals
    | DisplayName
    | NoValue
    | Color
    | Thresholds
    | Links
    | Mappings
    | TimeseriesCustom[keyof TimeseriesCustom]
    | TableCustom[keyof TableCustom];

  constructor(params?: Partial<OmitMethod<OverrideProperty>>) {
    this.id = params?.id || "unit";

    if (
      this.id === "unit" ||
      this.id === "noValue" ||
      this.id === "displayName"
    ) {
      this.value = <string>params?.value || "";
    } else if (this.id === "min" || this.id === "max" || this.id === "decimals")
      this.value = <number>params?.value || 0;
    else if (this.id === "color")
      this.value = new Color(<OmitMethod<Color>>params?.value);
    else if (this.id === "thresholds")
      this.value = new Thresholds(<Thresholds>params?.value || {});
    else if (this.id === "links") this.value = <Links>params?.value || [];
    else if (this.id === "mappings") {
      const mappings: Mappings = params?.value as Mappings;
      this.value = new Mappings(mappings || []);
    } else {
      this.value = <OverrideProperty["value"]>params?.value;
    }
  }

  convert(version: string) {
    const convertedOverrideProperty = JSON.parse(JSON.stringify(this));
    if (this.id === "color") {
      const value = <Color>this.value;
      convertedOverrideProperty.value = value.convert(version);
    } else if (this.id === "mappings") {
      const value = <Mappings>this.value;
      convertedOverrideProperty.value = value.convert(version);
    } else if (this.id === "thresholds") {
      const value = <Thresholds>this.value;
      convertedOverrideProperty.value = value.convert(version);
    } else if (this.id === "custom.gradientMode") {
      const value = <TimeseriesCustom["gradientMode"]>this.value;
      if (satisfies(version, "<8.0.0") && value === "scheme") {
        convertedOverrideProperty.value = "none";
      }
    } else if (this.id === "custom.hideFrom") {
      const value = <TimeseriesCustom["hideFrom"]>this.value;
      if (satisfies(version, ">=8.0.0")) {
        delete convertedOverrideProperty.value.graph;
      } else {
        delete convertedOverrideProperty.value.viz;
      }
    } else if (this.id === "custom.displayMode") {
      const value = <TableCustom["displayMode"]>this.value;
      if (satisfies(version, "<8.0.0") && value === "color-background-solid") {
        convertedOverrideProperty.value = "color-background";
      }
    }
    return convertedOverrideProperty;
  }
}
class Override {
  matcher: {
    id: "byName" | "byRegexp" | "byType" | "byFrameRefID";
    options?: string;
  };
  properties: Array<OverrideProperty>;

  constructor(params?: Partial<OmitMethod<Override>>) {
    this.matcher = params?.matcher || { id: "byName" };
    this.properties =
      params?.properties?.map((prop) => new OverrideProperty(prop)) || [];
  }

  convert(version: string) {
    const convertedOverride: Override = JSON.parse(JSON.stringify(this));
    convertedOverride.properties = this.properties
      .filter((prop) => {
        if (satisfies(version, "<8.0.0")) {
          if (
            prop.id === "custom.stacking" ||
            prop.id === "custom.thresholdsStyle" ||
            prop.id === "custom.minWidth"
          )
            return false;
          else return true;
        } else return true;
      })
      .map((prop) => prop.convert(version));

    return convertedOverride;
  }
}

export class FieldConfig {
  overrides: Array<Override>;
  constructor(params?: Partial<OmitMethod<FieldConfig>>) {
    this.overrides = params?.overrides?.map((ov) => new Override(ov)) || [];
  }
  convert(version: string) {
    const convertedFieldConfg = JSON.parse(JSON.stringify(this));
    convertedFieldConfg.overrides = this.overrides.map((ov) =>
      ov.convert(version)
    );
    return convertedFieldConfg;
  }
}
export class StatFieldConfig extends FieldConfig {
  defaults: Defaults;

  constructor(params?: Partial<OmitMethod<StatFieldConfig>>) {
    super(params);
    this.defaults = new Defaults(params?.defaults);
  }

  override convert(version: string) {
    const convertedStatFieldConfig = super.convert(version);
    convertedStatFieldConfig.defaults = this.defaults.convert(version);

    return convertedStatFieldConfig;
  }
}
export class TimeseriesFieldConfig extends FieldConfig {
  defaults: TimeseriesDefaults;

  constructor(params?: Partial<OmitMethod<TimeseriesFieldConfig>>) {
    super(params);
    this.defaults = new TimeseriesDefaults(params?.defaults);
  }

  override convert(version: string) {
    const convertedTimeseriesFieldConfig = super.convert(version);
    convertedTimeseriesFieldConfig.defaults = this.defaults.convert(version);

    return convertedTimeseriesFieldConfig;
  }
}
export class TableFieldConfig extends FieldConfig {
  defaults: TableDefaults;

  constructor(params?: Partial<OmitMethod<TableFieldConfig>>) {
    super(params);
    this.defaults = new TableDefaults(params?.defaults);
  }

  override convert(version: string) {
    const convertedTableFieldConfig = super.convert(version);
    convertedTableFieldConfig.defaults = this.defaults.convert(version);

    return convertedTableFieldConfig;
  }
}
