import { createRouter, createWebHistory } from 'vue-router'
import config from '../config'

const modules = import.meta.glob('../views/**/**.vue')

const routes = config.menus.map(item => {
  return ({
    path: item.path,
    component: modules[`../views/${item.view}`],
  })
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  let menu = config.menus.find(item => item.path == to.path);
  document.title = menu.title;
  next();
})

export default router
