import fs from 'fs'
import path from 'path'

export const isFunction = (arg: unknown): arg is (...args: any[]) => any =>
  typeof arg === 'function';

/*
 * Read all files in the specified folder, filter through regular rules, and return file path array
 * @param root Specify the folder path
 * [@param] reg Regular expression for filtering files, optional parameters
 * Note: It can also be deformed to check whether the file path conforms to regular rules. The path can be a folder or a file. The path that does not exist is also fault-tolerant.
 */
export function readAllFile(root: string, reg: RegExp) {
  let resultArr: string[] = [];
  try {
    if (fs.existsSync(root)) {
      const stat = fs.lstatSync(root);
      if (stat.isDirectory()) {
        // dir
        const files = fs.readdirSync(root);
        files.forEach(function (file) {
          const t = readAllFile(root + '/' + file, reg);
          resultArr = resultArr.concat(t);
        });
      } else {
        if (reg !== undefined) {
          if (isFunction(reg.test) && reg.test(root)) {
            resultArr.push(root);
          }
        } else {
          resultArr.push(root);
        }
      }
    }
  } catch (error) {}

  return resultArr;
}

export function isProdFn(mode: 'development' | 'production'): boolean {
  return mode === 'production';
}

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

/**
 * Whether to generate gzip for packaging
 */
export function isBuildGzip(): boolean {
  return process.env.VITE_BUILD_GZIP === 'true';
}

/**
 *  Whether to generate package site
 */
export function isSiteMode(): boolean {
  return process.env.SITE === 'true';
}

export interface ViteEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_USE_CDN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_GZIP: boolean;
  VITE_DYNAMIC_IMPORT: boolean;
}
export function wrapperEnv(envConf: any): ViteEnv{
  const ret: any = {};
  
  for(const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    console.log(envName, realName)
    ret[envName] = realName;
    process.env[envName] = realName;
  }

  return ret;
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getCwdPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}