import { computed, unref } from 'vue';

import { appStore } from '/@/store/modules/app';

const getLang = computed(


function setLocale(): void {

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