import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import DayEn15 from '../views/DayEn15.vue';
import dayOne from '../views/dayOne.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/Home', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/DayEn15', name: 'DayEn15', component: DayEn15 },
  { path: '/dayOne', name: 'dayOne', component: dayOne },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;