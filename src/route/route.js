import { createRouter, createWebHistory } from 'vue-router';
import DayEn15 from '../views/DayEn15.vue';
import dayOne from '../views/dayOne.vue';
import excelUpdata from '../views/excelUpdata.vue';
import excelView from '../views/excelView.vue';
import ListTry50 from '../views/ListTry50.vue';
import ClimateChangeAndItsImpact from '../views/ClimateChangeAndItsImpact.vue';
import PollutionInModernCities from '../views/PollutionInModernCities.vue';
import RenewableEnergyVsFossilFuels from '../views/RenewableEnergyVsFossilFuels.vue';
import TheImportanceOfForests from '../views/TheImportanceOfForests.vue';
import WaterConservation from '../views/WaterConservation.vue';
import BenefitsOfExercise from '../views/BenefitsOfExercise.vue';
import TheRoleOfDoctorsInSociety from '../views/TheRoleOfDoctorsInSociety.vue';
import HealthyeatingHabits from '../views/HealthyeatingHabits.vue';
import MentalHealthAwareness from '../views/MentalHealthAwareness.vue';
import TheImpactOfModernMedicine from '../views/TheImpactOfModernMedicine.vue';
import ArtificialIntelligenceInDailyLife from '../views/ArtificialIntelligenceInDailyLife.vue';   
import TheRoleOfTheInternetInEducation from '../views/TheRoleOfTheInternetInEducation.vue';   

const routes = [
  { path: '/DayEn15', name: 'DayEn15', component: DayEn15 },
  { path: '/dayOne', name: 'dayOne', component: dayOne },
  { path: '/excelUpdata', name: 'ExcelUpdata', component: excelUpdata },
  { path: '/excelUpdata', name: 'ExcelUpdata', component: excelUpdata },
  { path: '/excelView', name: 'ExcelView', component: excelView },
  { path: '/ListTry50', name: '50list', component: ListTry50 },
  { path: '/ClimateChangeAndItsImpact', name: 'ClimateChangeAndItsImpact', component: ClimateChangeAndItsImpact },
  { path: '/PollutionInModernCities', name: 'PollutionInModernCities', component: PollutionInModernCities },
  { path: '/RenewableEnergyVsFossilFuels', name: 'RenewableEnergyVsFossilFuels', component: RenewableEnergyVsFossilFuels },
  { path: '/TheImportanceOfForests', name: 'TheImportanceOfForests', component: TheImportanceOfForests },
  { path: '/WaterConservation', name: 'WaterConservation', component: WaterConservation },
  { path: '/BenefitsOfExercise', name: 'BenefitsOfExercise', component: BenefitsOfExercise },
  { path: '/TheRoleOfDoctorsInSociety', name: 'TheRoleOfDoctorsInSociety', component: TheRoleOfDoctorsInSociety },
  { path: '/HealthyeatingHabits', name: 'HealthyeatingHabits', component: HealthyeatingHabits },
  { path: '/MentalHealthAwareness', name: 'MentalHealthAwareness', component: MentalHealthAwareness },
  { path: '/TheImpactOfModernMedicine', name: 'TheImpactOfModernMedicine', component: TheImpactOfModernMedicine },
  { path: '/ArtificialIntelligenceInDailyLife', name: 'ArtificialIntelligenceInDailyLife', component: ArtificialIntelligenceInDailyLife },
  { path: '/TheRoleOfTheInternetInEducation', name: 'TheRoleOfTheInternetInEducation', component: TheRoleOfTheInternetInEducation },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;