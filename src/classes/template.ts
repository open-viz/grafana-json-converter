import { satisfies } from "semver";
import { OmitMethod } from "../../non-function-properties";

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

  constructor(params?: Partial<Template>) {
    this.allValue = params?.allValue || null;
    this.datasource = params?.datasource || "Prometheus";
    this.definition = params?.definition || "";
    this.description = params?.description || null;
    this.hide = params?.hide || 0;
    this.includeAll = params?.includeAll || false;
    this.label = params?.label || "";
    this.multi = params?.multi || false;
    this.name = params?.name || "";
    this.query = params?.query || {
      query: "",
      refId: "StandardVariableQuery",
    };
    this.refresh = params?.refresh || 1;
    this.regex = params?.regex || "";
    this.skipUrlSync = params?.skipUrlSync || false;
    this.sort = params?.sort || 0;
    this.tagValuesQuery = params?.tagValuesQuery || "";
    this.tags = params?.tags || [];
    this.type = params?.type || "query";
    this.useTags = params?.useTags || false;
  }

  convert(version: string) {
    const convertedTemplate = JSON.parse(JSON.stringify(this));
    if (satisfies(version, ">=8.0.0")) {
      delete convertedTemplate.tags;
    }

    return convertedTemplate;
  }
}
export class Templates {
  list: Array<Template>;

  constructor(params?: Partial<OmitMethod<Templates>>) {
    this.list = params?.list?.map((param) => new Template(param)) || [];
  }

  convert(version: string) {
    const convertedTemplates: Templates = JSON.parse(JSON.stringify(this));
    convertedTemplates.list = this.list.map((li) => li.convert(version));

    return convertedTemplates;
  }
}
