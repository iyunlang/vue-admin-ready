import type { ProjectConfig } from '/@/types/config';

import { elementPlusSizeEnum } from '/@/enums/appEnum';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // 设置element-plus组件大小samll 
  elementPlusSize: elementPlusSizeEnum.SM,
  // 设置element-plus弹框初始z-index
  zIndex: 3000,

  // locale setting
  locale: {
    show: true,
    // Locale
    lang: 'zh_CN',
    // Default locale
    fallback: 'zh_CN',
    // available Locales
    availableLocales: ['zh_CN', 'en'],
  },

}

export default setting;
