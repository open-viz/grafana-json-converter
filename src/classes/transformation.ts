import { satisfies } from "semver";
import { OmitMethod } from "../../non-function-properties";

class Transformation {
  id: string;
  options: Record<string, unknown>;
  constructor(params?: Partial<OmitMethod<Transformation>>) {
    this.id = params?.id || "calculateField";
    this.options = params?.options || {};
  }
  convert(version: string) {
    return JSON.parse(JSON.stringify(this));
  }
}

class CalculateField extends Transformation {
  override id: "calculateField";
  override options: {
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
  override id: "concatenate";
  override options: {
    frameNameMode?: "label" | "drop";
    frameNameLabel?: string;
  };
}

class ConfigFromData extends Transformation {
  override id: "configFromData";
  override options: {
    configRefId: string;
    mappings: Array<{
      fieldName: string;
      handlerKey: string;
      reducerId: string;
    }>;
  };
}

class FilterByName extends Transformation {
  override id: "filterFieldsByName";
  override options: {
    include: {
      pattern?: string;
      names?: Array<string>;
    };
  };
}

class FilterDataByQuery extends Transformation {
  override id: "filterByRefId";
  override options: {
    include: string;
  };
}

class FilterDataByValues extends Transformation {
  override id: "filterByValue";
  override options: {
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
  override id: "groupBy";
  override options: {
    fields?: Record<
      string,
      {
        aggregations: Array<string>;
        operation: "aggregate" | "groupby";
      }
    >;
  };
}

class Histogram extends Transformation {
  override id: "histogram";
  override options: {
    fields?: {};
    bucketSize?: number;
    bucketOffset?: number;
    combine?: boolean;
  };
}

class LabelsToFields extends Transformation {
  override id: "labelsToFields";
  override options: {
    valueLabel?: string;
  };
}

class Merge extends Transformation {
  override id: "merge";
}

class Organize extends Transformation {
  override id: "organize";
}

class OuterJoin extends Transformation {
  override id: "seriesToColumns";
  override options: {
    byField?: string;
  };
}

class PrepareTimeseries extends Transformation {
  override id: "prepareTimeSeries";
  override options: {
    format?: "many";
  };
}

class Reduce extends Transformation {
  override id: "reduce";
  override options: {
    reducers?: Array<string>;
    labelsToFields?: boolean;
    mode?: "reduceFields" | "seriesToRows";
    includeTimeField?: boolean;
  };

  override convert(version: string) {
    const convertedReduce: Reduce = super.convert(version);
    if (satisfies(version, "<=8.0.0"))
      delete convertedReduce.options.labelsToFields;
    return convertedReduce;
  }
}

class RemaneByRegex extends Transformation {
  override id: "renameByRegex";
  override options: {
    regex?: string;
    renamePattern?: string;
  };
}

class RowsToFields extends Transformation {
  override id: "rowsToFields";
  override options: {
    mappings: Array<{
      fieldName: string;
      handlerKey: string;
    }>;
  };
}

class SeriesToRows extends Transformation {
  override id: "seriesToRows";
}

class SortBy extends Transformation {
  override id: "sortBy";
  override options: {
    fields?: {};
    sort?: Array<{
      field: string;
      desc: boolean;
    }>;
  };
}

const TransformationMap = {
  calculateField: CalculateField,
  concatenate: Concatenate,
  configFromData: ConfigFromData,
  filterFieldsByName: FilterByName,
  filterByRefId: FilterDataByQuery,
  filterByValue: FilterDataByValues,
  groupBy: GroupBy,
  histogram: Histogram,
  labelsToFields: LabelsToFields,
  merge: Merge,
  organize: Organize,
  seriesToColumns: OuterJoin,
  prepareTimeSeries: PrepareTimeseries,
  reduce: Reduce,
  renameByRegex: RemaneByRegex,
  rowsToFields: RowsToFields,
  seriesToRows: SeriesToRows,
  sortBy: SortBy,
};

export type TransformationTypes =
  | CalculateField
  | Concatenate
  | ConfigFromData
  | FilterByName
  | FilterDataByQuery
  | FilterDataByValues
  | GroupBy
  | Histogram
  | LabelsToFields
  | Merge
  | Organize
  | OuterJoin
  | PrepareTimeseries
  | Reduce
  | RemaneByRegex
  | RowsToFields
  | SeriesToRows
  | SortBy;

export function transformationInstanceCreate(
  params: Partial<OmitMethod<TransformationTypes>>
) {
  return new TransformationMap[params.id || "calculateField"](params);
}
