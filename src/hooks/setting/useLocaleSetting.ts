import { computed, unref } from 'vue';

import { appStore } from '/@/store/modules/app';

import type { LocaleSetting } from '/@/types/config';
import getProjectSetting from '/@/settings/projectSetting';
import { localeList } from '/@/locales';

const getLocale = computed(() => appStore.getProjectConfigState?.locale || getProjectSetting.locale)

const getLang = computed(() => unref(getLocale).lang)

const getShowLocale = computed(() => unref(getLocale).show)

const getAvailableLocales = computed(() => unref(getLocale).availableLocales)

const getFallbackLocale = computed(() => unref(getLocale).fallback)

function setLocale(locale: Partial<LocaleSetting>): void {
  appStore.commitProjectConfigState({ locale })
}

export function useLocaleSetting() {
  return {
    getLang,
    getLocale,
    localeList,
    setLocale,
    getShowLocale,
    getAvailableLocales,
    getFallbackLocale,
  }
}