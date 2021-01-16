import { SharedConfig, UserConfig, Resolver, loadEnv } from 'vite';
import { resolve } from 'path';
import fs from 'fs'
import dotenv from "dotenv"
import pkg from './package.json'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { modifyVars } from './build/config/sassModifyVars'

import globbyTransform from './build/vite/plugin/transform/globby';
import dynamicImportTransform from './build/vite/plugin/transform/dynamic-import';

import { createRollupPlugin, createVitePlugins } from './build/vite/plugin';

const pathResolve = (pathStr: string) => {
  return resolve(__dirname, pathStr);
};

const alias: Record<string, string> = {
  '/@/': pathResolve('src'),
};

const root: string = process.cwd();

const resolvers: Resolver[] = [];

export default (mode: 'development' | 'production'): UserConfig => {
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_DYNAMIC_IMPORT,
  } = viteEnv;
  return {
    root,
    alias,

        /**
     * port
     * @default '3000'
     */
    port: VITE_PORT,

        /**
     * Base public path when served in production.
     * @default '/'
     */
    base: VITE_PUBLIC_PATH,

        /**
     * Transpile target for esbuild.
     * @default 'es2020'
     */
    esbuildTarget: 'es2019',

    // terser options
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: VITE_DROP_CONSOLE,
      },
    },

    // 是否自动在浏览器打开
    open: false,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,

      /**
     * Directory relative from `root` where build output will be placed. If the
     * directory exists, it will be removed before the build.
     * @default 'dist'
     */
    outDir: process.env.VITE_OUTPUT_DIR,
    // 反向代理
    // proxy: {
    //   api: {
    //     target: "http://www.skillnull.com",
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, "")
    //   }
    // },
    proxy: createProxy(VITE_PROXY),

    plugins: createVitePlugins(viteEnv),

    define: {
      __VERSION__: pkg.version,
      // setting vue-i18-next
      // Suppress warning
      // __VUE_I18N_LEGACY_API__: false,
      // __VUE_I18N_FULL_INSTALL__: false,
      // __INTLIFY_PROD_DEVTOOLS__: false,
    },

    cssPreprocessOptions: {
      scss: {
        modifyVars: modifyVars,
        javascriptEnabled: true,
      },
    },

    optimizeDeps: {
      include: [
        // 'qs',
        // 'echarts/map/js/china',
        'element-plus/lib/locale/lang/zh-cn',
        'element-plus/lib/locale/lang/en',
        // '@ant-design/icons-vue',
      ],
    },

    transforms: [
      globbyTransform({
        resolvers: resolvers,
        root: root,
        alias: alias,
        includes: [resolve('src/router'), resolve('src/locales')],
      }),
      dynamicImportTransform(VITE_DYNAMIC_IMPORT),
    ],
  }
}
