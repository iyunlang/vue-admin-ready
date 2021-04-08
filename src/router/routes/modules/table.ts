import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/table',
  name: 'Table',
  component: LAYOUT,
  redirect: '/table/simpleTable',
  meta: {
    icon: 'bx:bx-home',
    title: t('routes.table.table'),
  },
  children: [
    {
      path: 'simpleTable',
      name: 'SimpleTable',
      component: () => import('/@/views/dashboard/table/index.vue'),
      meta: {
        title: t('routes.table.simpleTable'),
      },
    },
  ],
};

export default dashboard;
