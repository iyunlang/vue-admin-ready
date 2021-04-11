import { MenuModeEnum } from '/@/enums/menuEnum';
import type { Menu as MenuType } from '/@/router/types';
import type { MenuState } from './types';

import { computed, Ref, toRaw } from 'vue';

import { unref } from 'vue';
import { es6Unique } from '/@/utils';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { getAllParentPath } from '/@/router/helper/menuHelper';

export function useOpenKeys(
  menuState: MenuState,
  menus: Ref<MenuType[]>,
  mode: Ref<MenuModeEnum>,
  accordion: Ref<boolean>
) {
  const { getCollapsed } = useMenuSetting();

  function setOpenKeys(path: string) {
    const menuList = toRaw(menus.value);
    if (!unref(accordion)) {
      menuState.defaultOpeneds = es6Unique([...menuState.defaultOpeneds, ...getAllParentPath(menuList, path)]);
    } else {
      menuState.defaultOpeneds = getAllParentPath(menuList, path);
    }
    menuState.defaultActive = menuState.defaultOpeneds.join('-')
  }

  const getOpenKeys = computed(() => {
    return unref(getCollapsed) ? menuState.collapsedOpeneds : menuState.defaultOpeneds;
  });

  /**
   * @description:  重置值
   */
  function resetKeys() {
    menuState.defaultOpeneds = [];
    menuState.collapsedOpeneds = [];
  }

  function handleOpenChange(openKeys: string[]) {
    if (unref(mode) === MenuModeEnum.HORIZONTAL || !unref(accordion)) {
      menuState.defaultOpeneds = openKeys;
    } else {
      // const menuList = toRaw(menus.value);
      // getAllParentPath(menuList, path);
      const rootSubMenuKeys: string[] = [];
      for (const { children, path } of unref(menus)) {
        if (children && children.length > 0) {
          rootSubMenuKeys.push(path);
        }
      }
      if (!unref(getCollapsed)) {
        const latestOpenKey = openKeys.find((key) => menuState.defaultOpeneds.indexOf(key) === -1);
        if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
          menuState.defaultOpeneds = openKeys;
        } else {
          menuState.defaultOpeneds = latestOpenKey ? [latestOpenKey] : [];
        }
      } else {
        menuState.collapsedOpeneds = openKeys;
      }
    }
  }
  return { setOpenKeys, resetKeys, getOpenKeys, handleOpenChange };
}
