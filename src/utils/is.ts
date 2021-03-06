export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isObject(val: unknown): val is object {
  return is(val, 'Object')
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export const isUrl = (path: string): boolean => {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};

export const isFunction = (val: unknown): val is Function => typeof val === 'function';

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

export const isServer = typeof window === 'undefined';

export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window');
};