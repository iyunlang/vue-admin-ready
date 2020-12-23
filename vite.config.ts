import { SharedConfig } from 'vite';
import { resolve } from 'path';

const pathResolve = (pathStr: string) => {
  return resolve(__dirname, pathStr);
};

const viteConfig: SharedConfig = {
  alias: {
    '/@/': pathResolve('./src'),
  },
};

module.exports = viteConfig;
