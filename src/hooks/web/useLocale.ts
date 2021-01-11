import { ref, unref } from 'vue'
import { LocaleType } from '/@/locales/types'
import { getI18n } from '/@/setup/i18n';
import { useLocaleSetting } from '/@/hooks/setting/useLocaleSetting';

import moment from 'moment';

import 'moment/dist/locale/zh-cn';

moment.locale('zh-cn');

const elemPlusConfigLocaleRef = ref<any>(null);

export function useLocale() {
  const { getLang, getLocale, setLocale: setLocalSetting } = useLocaleSetting();

  function changeLocale(lang: LocaleType): void {
    (getI18n().global.locale as any).value = lang
    setLocalSetting({ lang })
    switch(lang) {
      case 'zh':
        import('element-plus/lib/locale/lang/zh-cn').then((locale) => {
          elemPlusConfigLocaleRef.value = locale.default
        })
        moment.locale('cn');
        break;
      case 'en':
        import('element-plus/lib/locale/lang/en').then((locale) => {
          elemPlusConfigLocaleRef.value = locale.default
        })
        moment.locale('en-us');
        break;
      default:
        break;
    }
  }

  function setupLocale() {
    const lang = unref(getLang)
    lang && changeLocale(lang)
  }
  return {
    setupLocale,
    getLang,
    getLocale,
    changeLocale,
    elemPlusConfigLocale: elemPlusConfigLocaleRef,
  }
}