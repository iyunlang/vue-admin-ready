import type { MenuModule } from '/@/router/types.d';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 20,
  menu: {
    name: t('routes.article.article'),
    path: '/article',
    children: [
      {
        path: '/list',
        name: t('routes.article.list'),
      },
      {
        path: '/create',
        name: t('routes.article.create'),
      },
    ],
  },
};
export default menu;
