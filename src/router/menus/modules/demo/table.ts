import type { MenuModule } from '/@/router/types.d';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 30,
  menu: {
    name: t('routes.table.table'),
    path: '/table',
    children: [
      {
        path: '/simpleTable',
        name: t('routes.table.simpleTable'),
      },
      {
        path: '/dropTable',
        name: t('routes.table.dropTable'),
      },
      {
        path: '/editTable',
        name: t('routes.table.editTable'),
      },
    ],
  },
};
export default menu;
