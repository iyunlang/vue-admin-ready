import type { MenuModule } from '/@/router/types.d';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 20,
  menu: {
    name: t('routes.charts.charts'),
    path: '/charts',
    children: [
      {
        path: '/simpleCharts',
        name: t('routes.charts.simpleCharts'),
      },
      {
        path: '/lineCharts',
        name: t('routes.charts.lineCharts'),
      },
    ],
  },
};
export default menu;
