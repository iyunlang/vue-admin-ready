import { withInstall } from '../utils';

import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'

export const AppProvider = createAsyncComponent(() => import('./src/AppProvider.vue'))

withInstall(AppProvider);