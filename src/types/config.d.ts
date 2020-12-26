import type { LocaleType } from '/@/locales/types';

export interface LocaleSetting {
  show: boolean;
  // Current language
  lang: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface ProjectConfig {
  transitionSetting: TransitionSetting;

  permissionCacheType: CacheTypeEnum;
  // 设置element-plus组件大小samll 
  elementPlusSize: String,
  // 设置element-plus弹框初始z-index
  zIndex: Number,

  locale: LocaleSetting;
  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: boolean;
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  removeAllHttpPending: boolean;
}

export interface GlobConfig {
  // 网站标题
  title: string;
  // 项目路径
  apiUrl: string;
  uploadUrl?: string;
  urlPrefix?: string;
  shortName: string;
}

export interface GlobEnvConfig {
  // 网站标题
  VITE_GLOB_APP_TITLE: string;
  // 项目路径
  VITE_GLOB_API_URL: string;
  VITE_GLOB_API_URL_PREFIX?: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_GLOB_UPLOAD_URL?: string;
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean;

  // Route basic switching animation
  basicTransition: RouterTransitionEnum;

  // Whether to open page switching loading
  openPageLoading: boolean;

  // Whether to open the top progress bar
  openNProgress: boolean;
}
