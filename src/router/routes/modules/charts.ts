import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/charts',
  name: 'Charts',
  component: LAYOUT,
  redirect: '/charts/simpleCharts',
  meta: {
    icon: 'bx:bx-home',
    title: t('routes.charts.charts'),
  },
  children: [
    {
      path: 'simpleCharts',
      name: 'SimpleCharts',
      component: () => import('/@/views/dashboard/charts/index.vue'),
      meta: {
        title: t('routes.charts.simpleCharts'),
      },
    },
    {
      path: 'lineCharts',
      name: 'LineCharts',
      component: () => import('/@/views/dashboard/charts/line.vue'),
      meta: {
        title: t('routes.charts.lineCharts'),
      },
    },
  ],
};

export default dashboard;
