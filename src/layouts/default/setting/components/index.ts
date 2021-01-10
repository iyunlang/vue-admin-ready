import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

export const SettingFooter = createAsyncComponent(() => import('./SettingFooter.vue'));
export const ThemePicker = createAsyncComponent(() => import('./ThemePicker.vue'));
