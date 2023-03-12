import { createRouter, createWebHistory } from 'vue-router'
import config from '../config'
import { getCookie } from '@/util/CookieUtils.js'
import { toLogin } from '@/util/SSOUtils.js'

const modules = import.meta.glob('../views/**/**.vue')

const routes = config.routes.map(item => {
  return ({
    path: item.path,
    component: modules[`../views/${item.view}`],
  })
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from) => {
  let userId = getCookie("user_id");
  if (!userId) {
    toLogin();
    return false;
  }

  let menu = config.routes.find(item => item.path == to.path);
  if (menu) {
    document.title = menu.title;
  }
  return false;
})

export default router
