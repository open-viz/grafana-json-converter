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

  constructor(params?: Partial<Annotation>) {
    Object.assign(this, params);
  }
  convert(version: string) {
    return this;
  }
}
export class Annotations {
  list: Array<Annotation>;

  constructor(params?: Partial<OmitMethod<Annotations>>) {
    this.list = params?.list?.map((li) => new Annotation(li)) || [];
  }
  convert(version: string) {
    const convertedAnno = JSON.parse(JSON.stringify(this));
    convertedAnno.list = this.list.map((li) => li.convert(version));

    return convertedAnno;
  }
}
