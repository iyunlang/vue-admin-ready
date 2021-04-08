import type { MenuModule } from '/@/router/types.d';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 20,
  menu: {
    name: t('routes.table.table'),
    path: '/table',
    children: [
      {
        path: '/simpleTable',
        name: t('routes.table.simpleTable'),
      },
    ],
  },
};
export default menu;
