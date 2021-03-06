import { getI18n } from '/@/setup/i18n';
import projectSetting from '/@/settings/projectSetting';

export function useI18n(namespace?: string) {
  function getKey(key: string) {
    if (!namespace) {
      return key;
    }
    if (key.startsWith(namespace)) {
      return key;
    }
    return `${namespace}.${key}`;
  }
  const normalFn = {
    t: (key: string) => {
      return getKey(key);
    },
  };

  if (!projectSetting.locale.show || !getI18n()) {
    return normalFn;
  }

  const { t, ...methods } = getI18n().global;

  return {
    ...methods,
    t: (key: string, ...arg: any) => {
      if (!key) return '';
      return t(getKey(key), ...(arg as Parameters<typeof t>));
    },
  };
}

// 为什么要编写此函数？
// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key: string) => key;