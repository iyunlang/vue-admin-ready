import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const page: AppRouteModule = {
  path: '/page-demo',
  name: 'PageDemo',
  component: LAYOUT,
  redirect: '/page-demo/exception',
  meta: {
    icon: 'mdi:page-next-outline',
    title: t('routes.demo.page.page'),
  },
  children: []
}

export default page