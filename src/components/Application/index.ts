import { withInstall } from '../utils';

import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'

export const AppProvider = createAsyncComponent(() => import('./src/AppProvider.vue'))
export const AppLogo = createAsyncComponent(() => import('./src/AppLogo.vue'))

withInstall(AppProvider, AppLogo);

export { useAppProviderContext } from './src/useAppContext';