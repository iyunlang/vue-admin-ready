import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/article',
  name: 'Article',
  component: LAYOUT,
  redirect: '/article/list',
  meta: {
    icon: 'bx:bx-home',
    title: t('routes.article.article'),
  },
  children: [
    {
      path: 'list',
      name: 'articleList',
      component: () => import('/@/views/dashboard/article/list.vue'),
      meta: {
        title: t('routes.article.list'),
      },
    },
    {
      path: 'create',
      name: 'ArticleCreate',
      component: () => import('/@/views/dashboard/article/create.vue'),
      meta: {
        title: t('routes.article.create'),
      },
    },
  ],
};

export default dashboard;
