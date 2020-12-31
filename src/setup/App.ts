import { App, ref, computed } from 'vue'

import type { ProjectConfig } from '/@/types/config';

import {
  updateGrayMode,
  updateColorWeak,
  updateHeaderBgColor,
  updateSidebarBgColor,
} from '/@/logics/theme';

import { ThemeModeEnum } from '/@/enums/appEnum';
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';

import projectSetting from '/@/settings/projectSetting';

import { appStore } from '/@/store/modules/app';

import { deepMerge } from '/@/utils';
import { getLocal } from '/@/utils/helper/persistent';
import { isUnDef, isNull } from '/@/utils/is';

let app: App;

export function setApp( _app: App ):void {
  app = _app
}

export function getApp(): App {
  return app
}

// TODO Theme switching
export function useThemeMode(mode: ThemeModeEnum) {
  const modeRef = ref(mode);
  const html = document.documentElement;
  const clsList = html.classList;

  const change = () => {
    clsList.contains(mode) ? clsList.remove(mode) : clsList.add(mode);
  };
  return {
    runChangeThemeMode: change,
    mode: computed(() => modeRef.value),
  };
}

// Initial project configuration
export function initAppConfigStore() {
  let projCfg: ProjectConfig = getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});

  try {
    const {
      colorWeak,
      grayMode,
      headerSetting: { bgColor: headerBgColor } = {},
      menuSetting: { bgColor } = {},
    } = projCfg;

    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }
  appStore.commitProjectConfigState(projCfg);
}

// antdv Config Provider
export function getConfigProvider() {
  function transformCellText({ text }: { text: string }) {
    if (isNull(text) || isUnDef(text)) {
      return ' - ';
    }
    return text;
  }
  return {
    transformCellText,
  };
}