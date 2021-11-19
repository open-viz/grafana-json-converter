export class Input {
  name: string;
  label: string;
  description: string;
  type: string;
  pluginId: string;
  pluginName: string;

  constructor(params?: Partial<Input>) {
    Object.assign(this, params);
  }
  convert(version: string) {
    return this;
  }
}
