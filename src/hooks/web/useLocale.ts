import { ref } from 'vue'
import { LocaleType } from '../../locales/types'
import { getI18n } from '/@/setup/i18n';
import { useLocaleSetting } from '/@/hooks/setting/useLocaleSetting';

const elemPlusConfigLocaleRef = ref<any>(null);

export function useLocale() {
  const { getLang, getLocale, setLocale: setLocalSetting } = useLocaleSetting();

  function changeLocale(lang: LocaleType): void {
    (getI18n().global.locale as any).value = lang

    switch(lang) {
      case 'zh-cn':
        import('element-plus/lib/locale/lang/zh-cn').then((locale) => {
          elemPlusConfigLocaleRef.value = locale.default
        })
        break;
      case 'en':
        import('element-plus/lib/locale/lang/en').then((locale) => {
          elemPlusConfigLocaleRef.value = locale.default
        })
        break;
      default:
        break;
    }
  }

  function setupLocale() {

  }
  
  return {
    setupLocale
  }
}