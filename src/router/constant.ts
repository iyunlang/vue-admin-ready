import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import ParentLayout from '/@/layouts/page/ParentView.vue';

const EXCEPTION_COMPONENT = () => import('../views/sys/exception/Exception');

export const LAYOUT = () => import('/@/layouts/default/index.vue')

export const getParentLayout = (name: string) => {
  return () => {
    new Promise((resolve) => {
      resolve({
        ...ParentLayout,
        name,
      })
    })
  }
}

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPage',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
};

export const REDIRECT_NAME = 'Redirect';

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  name: REDIRECT_NAME,
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@/views/sys/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};