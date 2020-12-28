import { withInstall } from '../utils';

import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'

export const InputSimple = createAsyncComponent(() => import('./src/InputSimple.vue'))

withInstall(InputSimple);