import type { ProjectConfig } from '/@/types/config';

import { computed, unref } from 'vue';

import { appStore } from '/@/store/modules/app';
import { ContentEnum } from '/@/enums/appEnum';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

const getRootSetting = computed((): RootSetting => appStore.getProjectConfig);

const getPageLoading = computed(() => appStore.getPageLoading);

const getShowSettingButton = computed(() => unref(getRootSetting).showSettingButton);

const getShowBreadCrumb = computed(() => unref(getRootSetting).showBreadCrumb);

const getOpenKeepAlive = computed(() => unref(getRootSetting).openKeepAlive);

const getShowLogo = computed(() => unref(getRootSetting).showLogo);

function setRootSetting(setting: Partial<RootSetting>) {
  appStore.commitProjectConfigState(setting);
}

const getCanEmbedIFramePage = computed(() => unref(getRootSetting).canEmbedIFramePage);

const getLayoutContentMode = computed(() =>
  unref(getRootSetting).contentMode === ContentEnum.FULL ? ContentEnum.FULL : ContentEnum.FIXED
);

export function useRootSetting() {
  return {
    setRootSetting,

    getShowSettingButton,
    getShowBreadCrumb,
    getShowLogo,
    getLayoutContentMode,
    getPageLoading,
    getCanEmbedIFramePage,
    getOpenKeepAlive,
  };
}
