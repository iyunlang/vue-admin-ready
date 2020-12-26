import type { ProjectConfig } from '/@/types/config';

import { CacheTypeEnum } from '/@/enums/cacheEnum';
import { elementPlusSizeEnum, RouterTransitionEnum } from '/@/enums/appEnum';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,
  // 设置element-plus组件大小samll 
  elementPlusSize: elementPlusSizeEnum.SM,
  // 设置element-plus弹框初始z-index
  zIndex: 3000,

  // locale setting
  locale: {
    show: true,
    // Locale
    lang: 'zh-cn',
    // Default locale
    fallback: 'zh-cn',
    // available Locales
    availableLocales: ['zh-cn', 'en'],
  },

    // Transition Setting
  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoadinng
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar
    openNProgress: false,
  },

  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: true,
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  removeAllHttpPending: true,
}

export default setting;
