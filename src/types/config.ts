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
    locale: LocaleSetting;
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