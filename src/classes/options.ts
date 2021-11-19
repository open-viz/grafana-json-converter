export class OptionsStat {
  reduceOptions: {
    values: boolean;
    calcs: Array<string>;
    fields: string;
    limit?: number;
  };

  orientation: "auto" | "horizontal" | "vertical";
  textMode: "auto" | "value" | "value_and_name" | "name" | "none";
  colorMode: "background" | "value";
  graphMode: "none" | "area";
  justifyMode: "auto" | "center";

  text: {
    titleSize?: number;
    valueSize?: number;
  };

  constructor(params?: Partial<OptionsStat>) {
    if (params?.reduceOptions) this.reduceOptions = params?.reduceOptions;
    if (params?.orientation) this.orientation = params?.orientation || "auto";
    if (params?.textMode) this.textMode = params?.textMode || "auto";
    if (params?.colorMode) this.colorMode = params?.colorMode || "value";
    if (params?.graphMode) this.graphMode = params?.graphMode || "none";
    if (params?.justifyMode) this.justifyMode = params?.justifyMode || "auto";
    if (params?.text) this.text = params.text;
  }

  convert(version: string) {
    return JSON.parse(JSON.stringify(this));
  }
}

export class OptionsTimeseries {
  tooltip?: {
    mode: "single" | "multi" | "none";
  };
  legend?: {
    displayMode: "list" | "table" | "hidden";
    placement: "bottom" | "right";
    calcs: Array<string>;
  };

  constructor(params?: Partial<OptionsTimeseries>) {
    if (params?.tooltip) this.tooltip = params.tooltip;
    if (params?.legend) this.legend = params.legend;
  }

  convert(version: string) {
    return JSON.parse(JSON.stringify(this));
  }
}

export class OptionsTable {
  showHeader: boolean = true;
  constructor(params?: Partial<OptionsTable>) {
    if (params?.showHeader) this.showHeader = params.showHeader;
  }
  convert(version: string) {
    return JSON.parse(JSON.stringify(this));
  }
}
