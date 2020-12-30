import type { LocaleType } from '/@/locales/types';
import { ContentEnum, PermissionModeEnum, ThemeEnum, RouterTransitionEnum } from '/@/enums/appEnum';

export interface LocaleSetting {
  show: boolean;
  // Current language
  lang: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface MultiTabsSetting {
  // 是否显示
  show: boolean;
  // 开启快速操作
  showQuick: boolean;
  canDrag: boolean;

  // 显示刷新按钮
  showRedo: boolean;
}

export interface ProjectConfig {
  // 是否显示配置按钮
  showSettingButton: boolean;
  // 多标签页设置
  multiTabsSetting: MultiTabsSetting;
  
  transitionSetting: TransitionSetting,
  // 权限模式
  permissionMode: PermissionModeEnum,
  // 权限缓存类型
  permissionCacheType: CacheTypeEnum,
  // 设置element-plus组件大小samll 
  elementPlusSize: String,
  // 设置element-plus弹框初始z-index
  zIndex: Number,

  locale: LocaleSetting;
  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: boolean;
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  removeAllHttpPending: boolean;
  // 是否开启色弱模式
  colorWeak: boolean;
  // 主题色
  themeColor?: string;
  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: boolean;
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
