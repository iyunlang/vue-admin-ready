import type { MenuModule } from '/@/router/types.d';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 5,
  menu: {
    name: t('routes.dashboard.dashboard'),
    path: '/dashboard',
    children: [
      {
        path: '/workbench',
        name: t('routes.dashboard.workbench'),
      },
      {
        path: '/analysis',
        name: t('routes.dashboard.analysis'),
      },
    ],
  },
};
export default menu;
