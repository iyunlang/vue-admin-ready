import type { ProjectConfig } from '/@/types/config';

import { MenuTypeEnum, MenuModeEnum, TriggerEnum } from '/@/enums/menuEnum';
import { ThemeEnum } from '/@/enums/appEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import { elementPlusSizeEnum, PermissionModeEnum, RouterTransitionEnum } from '/@/enums/appEnum';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // 显示面包屑
  showBreadCrumb: true,
  // 显示面包屑图标
  showBreadCrumbIcon: true,
  // 是否显示logo
  showLogo: true,
  showFooter: true,
  // 全屏显示主界面,不显示菜单,及顶部
  fullContent: false,
  // 是否显示配置按钮
  showSettingButton: true,
  // Permission mode
  permissionMode: PermissionModeEnum.ROLE,
  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,
  // 设置element-plus组件大小samll 
  elementPlusSize: elementPlusSizeEnum.SM,
  // 设置element-plus弹框初始z-index
  zIndex: 3000,

  colorWeak: false,

  grayMode: false,

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

  // Multi-label
  multiTabsSetting: {
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,

    // Whether to show the refresh button
    showRedo: true,
  },

  // Menu configuration
  menuSetting: {
    // sidebar menu bg color
    bgColor: '#273352',
    //  Whether to fix the left menu
    fixed: true,
    // Menu collapse
    collapsed: false,
    // Whether to display the menu name when folding the menu
    collapsedShowTitle: false,
    // Whether it can be dragged
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: true,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // Menu width
    menuWidth: 210,
    // Menu mode
    mode: MenuModeEnum.INLINE,
    // Menu type
    type: MenuTypeEnum.MIX,
    // Menu theme
    theme: ThemeEnum.DARK,
    // Split menu
    split: false,
    // Top menu layout
    topMenuAlign: 'center',
    // Fold trigger position
    trigger: TriggerEnum.HEADER,
    // Turn on accordion mode, only show a menu
    accordion: true,
    // Switch page to close menu
    closeMixSidebarOnChange: false,
  },

  // Header configuration
  headerSetting: {
    // 头部高度
    height: 48,
    // header bg color
    bgColor: '#ffffff',
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // theme
    theme: ThemeEnum.LIGHT,
    // Whether to enable the lock screen function
    useLockPage: true,

    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the document button
    showDoc: true,
    // Whether to show the notification button
    showNotice: true,
    // Whether to display the menu search
    showSearch: true,
  },

  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: true,
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  removeAllHttpPending: true,
}

export default setting;
