import { withInstall } from '../utils';

import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
export const ScrollContainer = createAsyncComponent(() => import('./src/ScrollContainer.vue'));

withInstall(ScrollContainer);

export * from './src/types';
