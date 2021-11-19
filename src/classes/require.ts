export class Require {
  type: string;
  id: string;
  name: string;
  version: string;

  constructor(params?: Partial<Require>) {
    Object.assign(this, params);
  }
  convert(version: string) {
    return this;
  }
}
