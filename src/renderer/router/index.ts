import Vue from 'vue';
import Router from 'vue-router';

function load(component: string): any {
  return () => import(`@/renderer/views/${component}.vue`);
}

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: load('Home')
    },
  ],
});
