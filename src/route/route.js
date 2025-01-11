import { createRouter, createWebHistory } from 'vue-router';
import DayEn15 from '../views/DayEn15.vue';
import dayOne from '../views/dayOne.vue';

const routes = [
  { path: '/DayEn15', name: 'DayEn15', component: DayEn15 },
  { path: '/dayOne', name: 'dayOne', component: dayOne },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;