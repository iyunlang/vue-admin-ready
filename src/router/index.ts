
import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { basicRoutes } from './routes'

export const hashRouter = createWebHashHistory();

const router = createRouter({
    history: hashRouter,
    routes: basicRoutes as RouteRecordRaw[],
    strict: true,
});


export function setupRouter(app: App<Element>): void {
    app.use(router)
}

export default router