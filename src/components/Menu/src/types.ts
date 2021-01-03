// import { ComputedRef } from 'vue';
// import { ThemeEnum } from '/@/enums/appEnum';
// import { MenuModeEnum } from '/@/enums/menuEnum';
export interface MenuState {
  // 当前激活菜单的 index
  defaultActive: string | number;

  // 模式
  // mode?: MenuModeEnum;

  // // 主题
  // theme: ComputedRef<ThemeEnum> | ThemeEnum;

  // 当前打开的 sub-menu 的 index 的数组
  defaultOpeneds: string[];

  // 收缩状态下展开的数组
  collapsedOpeneds: string[];
}
