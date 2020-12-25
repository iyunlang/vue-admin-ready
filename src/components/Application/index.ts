import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'

export const AppProvider = createAsyncComponent(() => import('./src/AppProvider.vue'))