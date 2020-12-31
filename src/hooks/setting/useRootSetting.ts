import type { ProjectConfig } from '/@/types/config';

import { computed, unref } from 'vue';

import { appStore } from '/@/store/modules/app';
// import { ContentEnum } from '/@/enums/appEnum';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

const getRootSetting = computed((): RootSetting => appStore.getProjectConfig);

const getShowSettingButton = computed(() => unref(getRootSetting).showSettingButton);

const getShowBreadCrumb = computed(() => unref(getRootSetting).showBreadCrumb);

const getShowLogo = computed(() => unref(getRootSetting).showLogo);

function setRootSetting(setting: Partial<RootSetting>) {
  appStore.commitProjectConfigState(setting);
}

export function useRootSetting() {
  return {
    setRootSetting,

    getShowSettingButton,
    getShowBreadCrumb,
    getShowLogo,
  };
}
