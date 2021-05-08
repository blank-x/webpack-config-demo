import VueRouter from 'vue-router'

import Home from '../pages/home'
const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/home2",
    name: "home2",
    component: Home,
  },
  {
    path: "/sdsdfs2222122",
    name: "home3222",
    component: Home,
  },
];


const router = new VueRouter({
  mode: "history",
  routes,
});

export default router


