export type OmitMethod<T> = T extends Array<Object>
  ? Array<OmitMethod<T[number]>>
  : T extends Object
  ? {
      [K in keyof T as T[K] extends Function ? never : K]: OmitMethod<T[K]>;
    }
  : T;
