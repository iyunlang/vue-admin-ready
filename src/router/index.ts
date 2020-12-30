
import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { createGuard } from './guard/';

import { basicRoutes } from './routes'
import { REDIRECT_NAME } from './constant';

export const hashRouter = createWebHashHistory();

console.log(basicRoutes)

const router = createRouter({
    history: hashRouter,
    routes: basicRoutes as RouteRecordRaw[],
    strict: true,
});

// reset router
export function resetRouter() {
    const resetWhiteNameList = ['Login', REDIRECT_NAME];
    router.getRoutes().forEach((route) => {
      const { name } = route;
      if (name && !resetWhiteNameList.includes(name as string)) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    });
}

export function setupRouter(app: App<Element>): void {
    app.use(router)
    createGuard(router);
}

console.log(router.getRoutes())

export default router