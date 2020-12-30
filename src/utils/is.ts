export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isObject(val: unknown): val is object {
  return is(val, 'Object')
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