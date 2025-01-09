import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/Home', name: 'Home', component: HomePage }, // 確保這裡的路徑是 /Home
  { path: '/about', name: 'About', component: AboutPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;