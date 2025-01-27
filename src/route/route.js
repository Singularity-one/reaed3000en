import { createRouter, createWebHistory } from 'vue-router';
import DayEn15 from '../views/DayEn15.vue';
import dayOne from '../views/dayOne.vue';
import excelUpdata from '../views/excelUpdata.vue';
import excelView from '../views/excelView.vue';

const routes = [
  { path: '/DayEn15', name: 'DayEn15', component: DayEn15 },
  { path: '/dayOne', name: 'dayOne', component: dayOne },
  { path: '/excelUpdata', name: 'ExcelUpdata', component: excelUpdata },
  { path: '/excelUpdata', name: 'ExcelUpdata', component: excelUpdata },
  { path: '/excelView', name: 'ExcelView', component: excelView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;