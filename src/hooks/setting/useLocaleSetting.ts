import { computed, unref } from 'vue';

import { appStore } from '/@/store/modules/app';

const getLang = computed(() => '')

const getLocale = computed(() => '')

const localeList = computed(() => '')

const getShowLocale = computed(() => '')

const getAvailableLocales = computed(() => '')

const getFallbackLocale = computed(() => '')

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