import { isObject } from '/@/utils/is';
export const noop = () => {};

export function deepMerge<T = any>(src: any, target: any): T {
    let key: string;
    for (key in target) {
      src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
  }

  /**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  let url = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters;
  }
  return url;
}

/**
 * @description: 根据数组中某个对象值去重
 */
export function unique<T = any>(arr: T[], key: string): T[] {
  const map = new Map();
  return arr.filter((item) => {
    const _item = item as any;
    return !map.has(_item[key]) && map.set(_item[key], 1);
  });
}

/**
 * @description: es6数组去重复
 */
export function es6Unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}