import fs from 'fs'
import path from 'path'
import chalk from 'chalk';
import dotenv from 'dotenv';
import { networkInterfaces } from 'os';

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

export function isProdFn(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevFn(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = ['.env', '.env.production']) {
  let envConfig = {};
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));

      envConfig = { ...envConfig, ...env };
    } catch (error) {}
  });
  Object.keys(envConfig).forEach((key) => {
    const reg = new RegExp(`^(${match})`);
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

function consoleFn(color: string, message: any) {
  console.log(
    chalk.blue.bold('****************  ') +
      (chalk as any)[color].bold(message) +
      chalk.blue.bold('  ****************')
  );
}

/**
 * get client ip address
 */
export function getIPAddress() {
  let interfaces = networkInterfaces();
  for (let devName in interfaces) {
    let iFace = interfaces[devName];
    if (!iFace) return;
    for (let i = 0; i < iFace.length; i++) {
      let alias = iFace[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }

  return '';
}


/**
 * warnConsole
 * @param message
 */
export function successConsole(message: any) {
  consoleFn('green', '✨ ' + message);
}

/**
 * warnConsole
 * @param message
 */
export function errorConsole(message: any) {
  consoleFn('red', '✨ ' + message);
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