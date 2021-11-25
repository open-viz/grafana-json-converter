#!/usr/bin/env node
declare module "omit-method" {
    export type OmitMethod<T> = T extends Array<Object> ? Array<OmitMethod<T[number]>> : T extends Object ? {
        [K in keyof T as T[K] extends Function ? never : K]: OmitMethod<T[K]>;
    } : T;
}
declare module "classes/annotation" {
    import { OmitMethod } from "omit-method";
    class Annotation {
        builtIn: number;
        datasource: string;
        enable: boolean;
        hide: boolean;
        iconColor: string;
        name: string;
        target: {
            limit: number;
            matchAny: boolean;
            tags: Array<string>;
            type: string;
        };
        type: string;
        constructor(params?: Partial<Annotation>);
        convert(version: string): this;
    }
    export class Annotations {
        list: Array<Annotation>;
        constructor(params?: Partial<OmitMethod<Annotations>>);
        convert(version: string): any;
    }
}
declare module "classes/input" {
    export class Input {
        name: string;
        label: string;
        description: string;
        type: string;
        pluginId: string;
        pluginName: string;
        constructor(params?: Partial<Input>);
        convert(version: string): this;
    }
}
declare module "classes/field-config" {
    import { OmitMethod } from "omit-method";
    class TimeseriesCustom {
        drawStyle: "line" | "bars" | "points";
        lineInterpolation: "linear" | "smooth" | "stepBefore" | "stepAfter";
        barAlignment: -1 | 0 | 1;
        lineWidth: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
        fillOpacity: number;
        fillBelowTo?: string;
        gradientMode: "none" | "opacity" | "hue" | "scheme";
        spanNulls: boolean | number;
        showPoints: "auto" | "always" | "never";
        pointSize?: number;
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
            graph?: boolean;
            viz?: boolean;
            legend: boolean;
        };
        lineStyle?: {
            fill: "solid" | "dash" | "dot";
            dash: Array<number>;
        };
        thresholdsStyle?: {
            mode: "off" | "line" | "area" | "line+area";
        };
        constructor(params: Partial<OmitMethod<TimeseriesCustom>>);
        convert(version: string): TimeseriesCustom;
    }
    class TableCustom {
        align: "auto" | "left" | "center" | "right" | null;
        displayMode: "auto" | "color-text" | "color-background" | "color-background-solid" | "gradient-gauge" | "lcd-gauge" | "basic" | "json-view" | "image";
        minWidth?: number;
        width?: number;
        filterable?: boolean;
        constructor(params?: Partial<TableCustom>);
        convert(version: string): TableCustom;
    }
    class Color {
        mode: "thresholds" | "fixed" | "palette-classic" | "continuous-GrYlRd" | "continuous-RdYlGr" | "continuous-RdYlGr" | "continuous-YlRd" | "continuous-BlPu" | "continuous-YlBl" | "continuous-blues" | "continuous-reds" | "continuous-greens" | "continuous-purples";
        fixedColor?: string;
        constructor(params?: Partial<OmitMethod<Color>>);
        convert(version: string): any;
    }
    class Thresholds {
        mode: "absolute" | "percentage";
        steps: Array<{
            color: string;
            value: string | number | null;
        }>;
        constructor(params?: Partial<OmitMethod<Thresholds>>);
        convert(version: string): Thresholds;
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
        constructor(items: Array<Mapping>);
        convert(version: string): unknown[];
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
        constructor(params?: Partial<OmitMethod<Defaults>>);
        convert(version: string): any;
    }
    class TimeseriesDefaults extends Defaults {
        custom: TimeseriesCustom;
        constructor(params?: Partial<OmitMethod<TimeseriesDefaults>>);
        convert(version: string): any;
    }
    class TableDefaults extends Defaults {
        custom: TableCustom;
        constructor(params?: Partial<OmitMethod<TableDefaults>>);
        convert(version: string): any;
    }
    class OverrideProperty {
        id: "unit" | "min" | "max" | "decimals" | "displayName" | "noValue" | "color" | "thresholds" | "links" | "mappings" | `custom.${keyof TimeseriesCustom}` | `custom.${keyof TableCustom}`;
        value: Unit | Min | Max | Decimals | DisplayName | NoValue | Color | Thresholds | Links | Mappings | TimeseriesCustom[keyof TimeseriesCustom] | TableCustom[keyof TableCustom];
        constructor(params?: Partial<OmitMethod<OverrideProperty>>);
        convert(version: string): any;
    }
    class Override {
        matcher: {
            id: "byName" | "byRegexp" | "byType" | "byFrameRefID";
            options?: string;
        };
        properties: Array<OverrideProperty>;
        constructor(params?: Partial<OmitMethod<Override>>);
        convert(version: string): Override;
    }
    export class FieldConfig {
        overrides: Array<Override>;
        constructor(params?: Partial<OmitMethod<FieldConfig>>);
        convert(version: string): any;
    }
    export class StatFieldConfig extends FieldConfig {
        defaults: Defaults;
        constructor(params?: Partial<OmitMethod<StatFieldConfig>>);
        convert(version: string): any;
    }
    export class TimeseriesFieldConfig extends FieldConfig {
        defaults: TimeseriesDefaults;
        constructor(params?: Partial<OmitMethod<TimeseriesFieldConfig>>);
        convert(version: string): any;
    }
    export class TableFieldConfig extends FieldConfig {
        defaults: TableDefaults;
        constructor(params?: Partial<OmitMethod<TableFieldConfig>>);
        convert(version: string): any;
    }
}
declare module "classes/options" {
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
        constructor(params?: Partial<OptionsStat>);
        convert(version: string): any;
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
        constructor(params?: Partial<OptionsTimeseries>);
        convert(version: string): any;
    }
    export class OptionsTable {
        showHeader: boolean;
        constructor(params?: Partial<OptionsTable>);
        convert(version: string): any;
    }
}
declare module "classes/time" {
    export type TimeInterval = "5s" | "10s" | "30s" | "1m" | "5m" | "15m" | "30m" | "1h" | "2h" | "6h" | "12h" | "24h" | "1d" | "2d" | "7d" | "30d" | "";
    export class Timepicker {
        refresh_intervals: Array<TimeInterval>;
        time_options: Array<TimeInterval>;
        constructor(params?: Partial<Timepicker>);
        convert(version: string): this;
    }
    export class Time {
        from: string;
        to: string;
        constructor(params?: Partial<Time>);
        convert(version: string): this;
    }
}
declare module "classes/target" {
    import { TimeInterval } from "classes/time";
    export class Target {
        exemplar: boolean;
        expr: string;
        format?: "time_series" | "table" | "heatmap";
        instant?: boolean;
        hide?: boolean;
        interval: TimeInterval;
        intervalFactor?: 1 | 2 | 3 | 4 | 5 | 10;
        legendFormat: string;
        constructor(params?: Partial<Target>);
        convert(version: string): any;
    }
}
declare module "classes/transformation" {
    import { OmitMethod } from "omit-method";
    class Transformation {
        id: string;
        options: Record<string, unknown>;
        constructor(params?: Partial<OmitMethod<Transformation>>);
        convert(version: string): any;
    }
    class CalculateField extends Transformation {
        id: "calculateField";
        options: {
            mode: "reduceRow" | "binary";
            reduce: {
                reducer: "sum";
                include?: Array<string>;
            };
            replaceFields: boolean;
            alias: string;
            binary?: {
                left: string;
                operator: "+" | "-" | "*" | "/";
                right: string;
                reducer: "sum";
            };
        };
    }
    class Concatenate extends Transformation {
        id: "concatenate";
        options: {
            frameNameMode?: "label" | "drop";
            frameNameLabel?: string;
        };
    }
    class ConfigFromData extends Transformation {
        id: "configFromData";
        options: {
            configRefId: string;
            mappings: Array<{
                fieldName: string;
                handlerKey: string;
                reducerId: string;
            }>;
        };
    }
    class FilterByName extends Transformation {
        id: "filterFieldsByName";
        options: {
            include: {
                pattern?: string;
                names?: Array<string>;
            };
        };
    }
    class FilterDataByQuery extends Transformation {
        id: "filterByRefId";
        options: {
            include: string;
        };
    }
    class FilterDataByValues extends Transformation {
        id: "filterByValue";
        options: {
            filters: Array<{
                fieldName: string;
                config: {
                    id: string;
                    options: {
                        value: string | number;
                    };
                };
            }>;
            type: "include" | "exclude";
            match: "all" | "any";
        };
    }
    class GroupBy extends Transformation {
        id: "groupBy";
        options: {
            fields?: Record<string, {
                aggregations: Array<string>;
                operation: "aggregate" | "groupby";
            }>;
        };
    }
    class Histogram extends Transformation {
        id: "histogram";
        options: {
            fields?: {};
            bucketSize?: number;
            bucketOffset?: number;
            combine?: boolean;
        };
    }
    class LabelsToFields extends Transformation {
        id: "labelsToFields";
        options: {
            valueLabel?: string;
        };
    }
    class Merge extends Transformation {
        id: "merge";
    }
    class Organize extends Transformation {
        id: "organize";
    }
    class OuterJoin extends Transformation {
        id: "seriesToColumns";
        options: {
            byField?: string;
        };
    }
    class PrepareTimeseries extends Transformation {
        id: "prepareTimeSeries";
        options: {
            format?: "many";
        };
    }
    class Reduce extends Transformation {
        id: "reduce";
        options: {
            reducers?: Array<string>;
            labelsToFields?: boolean;
            mode?: "reduceFields" | "seriesToRows";
            includeTimeField?: boolean;
        };
        convert(version: string): Reduce;
    }
    class RemaneByRegex extends Transformation {
        id: "renameByRegex";
        options: {
            regex?: string;
            renamePattern?: string;
        };
    }
    class RowsToFields extends Transformation {
        id: "rowsToFields";
        options: {
            mappings: Array<{
                fieldName: string;
                handlerKey: string;
            }>;
        };
    }
    class SeriesToRows extends Transformation {
        id: "seriesToRows";
    }
    class SortBy extends Transformation {
        id: "sortBy";
        options: {
            fields?: {};
            sort?: Array<{
                field: string;
                desc: boolean;
            }>;
        };
    }
    export type TransformationTypes = CalculateField | Concatenate | ConfigFromData | FilterByName | FilterDataByQuery | FilterDataByValues | GroupBy | Histogram | LabelsToFields | Merge | Organize | OuterJoin | PrepareTimeseries | Reduce | RemaneByRegex | RowsToFields | SeriesToRows | SortBy;
    export function transformationInstanceCreate(params: Partial<OmitMethod<TransformationTypes>>): CalculateField | Concatenate | ConfigFromData | FilterByName | FilterDataByQuery | FilterDataByValues | GroupBy | Histogram | LabelsToFields | Merge | Organize | OuterJoin | PrepareTimeseries | Reduce | RemaneByRegex | RowsToFields | SeriesToRows | SortBy;
}
declare module "classes/panel" {
    import { OmitMethod } from "omit-method";
    import { StatFieldConfig, TimeseriesFieldConfig, Links, TableFieldConfig } from "classes/field-config";
    import { OptionsStat, OptionsTable, OptionsTimeseries } from "classes/options";
    import { Target } from "classes/target";
    import { TransformationTypes } from "classes/transformation";
    export function panelInstanceCreate(params: Partial<OmitMethod<Panel>>): Panel;
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
        constructor(params?: Partial<OmitMethod<Panel>>);
        convert(version: string): any;
    }
    export class RowPanel extends Panel {
        type: "row";
        collapsed: boolean;
        panels: Array<Panel>;
        constructor(params?: Partial<OmitMethod<RowPanel>>);
        convert(version: string): any;
    }
    export class NonRowPanel extends Panel {
        links?: Links;
        type: "stat" | "timeseries" | "table";
        cacheTimeout?: null;
        transparent?: boolean;
        maxDataPoints?: number;
        targets: Array<Target>;
        transformations?: Array<TransformationTypes>;
        pluginVersion: string;
        constructor(params?: Partial<OmitMethod<NonRowPanel>>);
        convert(version: string): NonRowPanel & Panel;
        static addTargetExprs(panel: OmitMethod<NonRowPanel>, exprs: Array<string>): {
            links?: {
                title: string;
                url: string;
                targetBlank?: boolean | undefined;
            }[] | undefined;
            type: "table" | "stat" | "timeseries";
            cacheTimeout?: null | undefined;
            transparent?: boolean | undefined;
            maxDataPoints?: number | undefined;
            targets: {
                exemplar: boolean;
                expr: string;
                format?: "table" | "time_series" | "heatmap" | undefined;
                instant?: boolean | undefined;
                hide?: boolean | undefined;
                interval: import("classes/time").TimeInterval;
                intervalFactor?: 2 | 1 | 3 | 4 | 5 | 10 | undefined;
                legendFormat: string;
            }[];
            transformations?: ({
                id: "calculateField";
                options: {
                    mode: "reduceRow" | "binary";
                    reduce: {
                        reducer: "sum";
                        include?: string[] | undefined;
                    };
                    replaceFields: boolean;
                    alias: string;
                    binary?: {
                        left: string;
                        operator: "+" | "-" | "*" | "/";
                        right: string;
                        reducer: "sum";
                    } | undefined;
                };
            } | {
                id: "concatenate";
                options: {
                    frameNameMode?: "label" | "drop" | undefined;
                    frameNameLabel?: string | undefined;
                };
            } | {
                id: "configFromData";
                options: {
                    configRefId: string;
                    mappings: {
                        fieldName: string;
                        handlerKey: string;
                        reducerId: string;
                    }[];
                };
            } | {
                id: "filterFieldsByName";
                options: {
                    include: {
                        pattern?: string | undefined;
                        names?: string[] | undefined;
                    };
                };
            } | {
                id: "filterByRefId";
                options: {
                    include: string;
                };
            } | {
                id: "filterByValue";
                options: {
                    filters: {
                        fieldName: string;
                        config: {
                            id: string;
                            options: {
                                value: string | number;
                            };
                        };
                    }[];
                    type: "include" | "exclude";
                    match: "all" | "any";
                };
            } | {
                id: "groupBy";
                options: {
                    fields?: {
                        [x: string]: {
                            aggregations: string[];
                            operation: "aggregate" | "groupby";
                        };
                    } | undefined;
                };
            } | {
                id: "histogram";
                options: {
                    fields?: {} | undefined;
                    bucketSize?: number | undefined;
                    bucketOffset?: number | undefined;
                    combine?: boolean | undefined;
                };
            } | {
                id: "labelsToFields";
                options: {
                    valueLabel?: string | undefined;
                };
            } | {
                id: "merge";
                options: {
                    [x: string]: unknown;
                };
            } | {
                id: "organize";
                options: {
                    [x: string]: unknown;
                };
            } | {
                id: "seriesToColumns";
                options: {
                    byField?: string | undefined;
                };
            } | {
                id: "prepareTimeSeries";
                options: {
                    format?: "many" | undefined;
                };
            } | {
                id: "reduce";
                options: {
                    reducers?: string[] | undefined;
                    labelsToFields?: boolean | undefined;
                    mode?: "reduceFields" | "seriesToRows" | undefined;
                    includeTimeField?: boolean | undefined;
                };
            } | {
                id: "renameByRegex";
                options: {
                    regex?: string | undefined;
                    renamePattern?: string | undefined;
                };
            } | {
                id: "rowsToFields";
                options: {
                    mappings: {
                        fieldName: string;
                        handlerKey: string;
                    }[];
                };
            } | {
                id: "seriesToRows";
                options: {
                    [x: string]: unknown;
                };
            } | {
                id: "sortBy";
                options: {
                    fields?: {} | undefined;
                    sort?: {
                        field: string;
                        desc: boolean;
                    }[] | undefined;
                };
            })[] | undefined;
            pluginVersion: string;
            title: string;
            datasource: string | null;
            description?: string | undefined;
            interval?: number | null | undefined;
            gridPos: {
                h: number;
                w: number;
                x: number;
                y: number;
            };
            id: number;
            timeShift?: string | null | undefined;
            timeFrom?: string | null | undefined;
        };
    }
    export class StatPanel extends NonRowPanel {
        type: "stat";
        fieldConfig: StatFieldConfig;
        options: OptionsStat;
        constructor(params?: Partial<OmitMethod<StatPanel>>);
        convert(version: string): StatPanel & NonRowPanel;
    }
    export class TimeseriesPanel extends NonRowPanel {
        type: "timeseries";
        fieldConfig: TimeseriesFieldConfig;
        options: OptionsTimeseries;
        constructor(params?: Partial<OmitMethod<TimeseriesPanel>>);
        convert(version: string): TimeseriesPanel & NonRowPanel;
    }
    export class TablePanel extends NonRowPanel {
        type: "table";
        fieldConfig: TableFieldConfig;
        options: OptionsTable;
        constructor(params?: Partial<OmitMethod<TablePanel>>);
        convert(version: string): TablePanel & NonRowPanel;
    }
}
declare module "classes/require" {
    export class Require {
        type: string;
        id: string;
        name: string;
        version: string;
        constructor(params?: Partial<Require>);
        convert(version: string): this;
    }
}
declare module "classes/template" {
    import { OmitMethod } from "omit-method";
    export class Template {
        allValue: string | null;
        datasource: string;
        definition: string;
        description: string | null;
        hide: number;
        includeAll: boolean;
        label: string;
        multi: boolean;
        name: string;
        query: {
            query: string;
            refId: string;
        };
        refresh: 0 | 1;
        regex: string;
        skipUrlSync: boolean;
        sort: 0 | 1;
        tagValuesQuery: string;
        tags: Array<string>;
        tagsQuery: string;
        type: string;
        useTags: boolean;
        constructor(params?: Partial<Template>);
        convert(version: string): any;
    }
    export class Templates {
        list: Array<Template>;
        constructor(params?: Partial<OmitMethod<Templates>>);
        convert(version: string): Templates;
    }
}
declare module "classes/dashboard" {
    import { OmitMethod } from "omit-method";
    import { Annotations } from "classes/annotation";
    import { Input } from "classes/input";
    import { Panel } from "classes/panel";
    import { Require } from "classes/require";
    import { Templates } from "classes/template";
    import { Time, TimeInterval, Timepicker } from "classes/time";
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
        constructor(params: Partial<OmitMethod<Dashboard>>);
        convert(version: string): Dashboard;
    }
}
declare module "app" { }
declare module "test-modules/panels/test-row-panel" {
    import { OmitMethod } from "omit-method";
    import { RowPanel } from "classes/panel";
    const testRowPanel: OmitMethod<RowPanel>;
    export default testRowPanel;
}
declare module "test-modules/panels/test-stat-panel" {
    import { OmitMethod } from "omit-method";
    import { StatPanel } from "classes/panel";
    const testStatPanel: OmitMethod<StatPanel>;
    export default testStatPanel;
}
declare module "test-modules/panels/test-table-panel" {
    import { OmitMethod } from "omit-method";
    import { TablePanel } from "classes/panel";
    const testTablePanel: OmitMethod<TablePanel>;
    export default testTablePanel;
}
declare module "test-modules/panels/test-timeseries-panel" {
    import { OmitMethod } from "omit-method";
    import { TimeseriesPanel } from "classes/panel";
    const testTimeseriesPanel: OmitMethod<TimeseriesPanel>;
    export default testTimeseriesPanel;
}
declare module "test-modules/dashboards/test-dashboard" {
    import { OmitMethod } from "omit-method";
    import { Dashboard } from "classes/dashboard";
    const testDashboard: OmitMethod<Dashboard>;
    export default testDashboard;
}
