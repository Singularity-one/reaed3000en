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
import SpaceExplorationIsItWorthIt from '../views/SpaceExplorationIsItWorthIt.vue';   
import TheDangersOfSocialMedia from '../views/TheDangersOfSocialMedia.vue';  
import TheFutureOfTransportation from '../views/TheFutureOfTransportation.vue';  
import TheValueOfUniversityEducation from '../views/TheValueOfUniversityEducation.vue'; 
import OnlineLearningVsTraditionalSchools from '../views/OnlineLearningVsTraditionalSchools.vue'; 
import TheImportanceOfLearningForeignLanguages from '../views/TheImportanceOfLearningForeignLanguages.vue'; 
import ShouldStudentsWearUniforms from '../views/ShouldStudentsWearUniforms.vue'; 
import HowExamsHelpStudents from '../views/HowExamsHelpStudents.vue'; 
import TheBenefitsOfRemoteWork from '../views/TheBenefitsOfRemoteWork.vue'; 
import StartingABusinessVsHavingAJob from '../views/StartingABusinessVsHavingAJob.vue';
import TheImportanceOfTeamwork from '../views/TheImportanceOfTeamwork.vue';
import TheContemporaryWorkLandscapeIsUndergoingASeismicShift from '../views/TheContemporaryWorkLandscapeIsUndergoingASeismicShift.vue';
import HowTechnologyIsChangingJobs from '../views/HowTechnologyIsChangingJobs.vue';
import TheImpactOfTourismOnLocalCulture from '../views/TheImpactOfTourismOnLocalCulture.vue';
import TheImportanceOfFamilyValues from '../views/TheImportanceOfFamilyValues.vue';
import WhyReadingBooksIsImportant from '../views/WhyReadingBooksIsImportant.vue';
import TheRoleOfMusicInHumanLife from '../views/TheRoleOfMusicInHumanLife.vue';
import WhyPeopleShouldVolunteer from '../views/WhyPeopleShouldVolunteer.vue';
import TheBenefitsOfTravelingAbroad from '../views/TheBenefitsOfTravelingAbroad.vue';
import ShouldPublicTransportBeFree from '../views/ShouldPublicTransportBeFree.vue';
import TheImpactOfCarsOnTheEnvironment from '../views/TheImpactOfCarsOnTheEnvironment.vue';
import AirTravelLuxuryOrNecessity from '../views/AirTravelLuxuryOrNecessity.vue';
import HowTrainsCanReducePollution from '../views/HowTrainsCanReducePollution.vue';
import ShouldTheDeathPenaltyExist from '../views/ShouldTheDeathPenaltyExist.vue';
import TheImportanceOfStrictTrafficLaws from '../views/TheImportanceOfStrictTrafficLaws.vue';
import HowtToReduceCrimeInCities from '../views/HowtToReduceCrimeInCities.vue';
import CybercrimeAndOnlineSafety from '../views/CybercrimeAndOnlineSafety.vue';
import WhyHonestyIsImportantInSociety from '../views/WhyHonestyIsImportantInSociety.vue';
import TheFutureOfRenewableEnergy from '../views/TheFutureOfRenewableEnergy.vue';
import HowRobotsAreChangingIndustries from '../views/HowRobotsAreChangingIndustries.vue';
import MedicalResearchAndNewDiseases from '../views/MedicalResearchAndNewDiseases.vue';
import TheBenefitsOfSpaceTechnology from '../views/TheBenefitsOfSpaceTechnology.vue';
import WillHumansLiveOnMars from '../views/WillHumansLiveOnMars.vue';
import TheImportanceOfSelfDiscipline from '../views/TheImportanceOfSelfDiscipline.vue';
import HowHobbiesImproveMentalHealth from '../views/HowHobbiesImproveMentalHealth.vue';
import WhySettingGoalsIsImportant from '../views/WhySettingGoalsIsImportant.vue';
import TheImpactOfPositiveThinking from '../views/TheImpactOfPositiveThinking.vue';
import TimeManagementAndSuccess from '../views/TimeManagementAndSuccess.vue';
import ThePowerOfObservation from '../views/ThePowerOfObservation.vue';
import LifeInAVillage from '../views/LifeInAVillage.vue';


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
  { path: '/SpaceExplorationIsItWorthIt', name: 'SpaceExplorationIsItWorthIt', component: SpaceExplorationIsItWorthIt },
  { path: '/TheDangersOfSocialMedia', name: 'TheDangersOfSocialMedia', component: TheDangersOfSocialMedia },
  { path: '/TheFutureOfTransportation', name: 'TheFutureOfTransportation', component: TheFutureOfTransportation },
  { path: '/TheValueOfUniversityEducation', name: 'TheValueOfUniversityEducation', component: TheValueOfUniversityEducation },
  { path: '/OnlineLearningVsTraditionalSchools', name: 'OnlineLearningVsTraditionalSchools', component: OnlineLearningVsTraditionalSchools },
  { path: '/TheImportanceOfLearningForeignLanguages', name: 'TheImportanceOfLearningForeignLanguages', component: TheImportanceOfLearningForeignLanguages },
  { path: '/ShouldStudentsWearUniforms', name: 'ShouldStudentsWearUniforms', component: ShouldStudentsWearUniforms },
  { path: '/HowExamsHelpStudents', name: 'HowExamsHelpStudents', component: HowExamsHelpStudents },
  { path: '/TheBenefitsOfRemoteWork', name: 'TheBenefitsOfRemoteWork', component: TheBenefitsOfRemoteWork },
  { path: '/TheBenefitsOfRemoteWork', name: 'TheBenefitsOfRemoteWork', component: TheBenefitsOfRemoteWork },
  { path: '/StartingABusinessVsHavingAJob', name: 'StartingABusinessVsHavingAJob', component: StartingABusinessVsHavingAJob },
  { path: '/TheImportanceOfTeamwork', name: 'TheImportanceOfTeamwork', component: TheImportanceOfTeamwork },
  { path: '/TheContemporaryWorkLandscapeIsUndergoingASeismicShift', name: 'TheContemporaryWorkLandscapeIsUndergoingASeismicShift', component: TheContemporaryWorkLandscapeIsUndergoingASeismicShift },
  { path: '/HowTechnologyIsChangingJobs', name: 'HowTechnologyIsChangingJobs', component: HowTechnologyIsChangingJobs },
  { path: '/TheImpactOfTourismOnLocalCulture', name: 'TheImpactOfTourismOnLocalCulture', component: TheImpactOfTourismOnLocalCulture },
  { path: '/TheImportanceOfFamilyValues', name: 'TheImportanceOfFamilyValues', component: TheImportanceOfFamilyValues },
  { path: '/WhyReadingBooksIsImportant', name: 'WhyReadingBooksIsImportant', component: WhyReadingBooksIsImportant },
  { path: '/TheRoleOfMusicInHumanLife', name: 'TheRoleOfMusicInHumanLife', component: TheRoleOfMusicInHumanLife },
  { path: '/WhyPeopleShouldVolunteer', name: 'WhyPeopleShouldVolunteer', component: WhyPeopleShouldVolunteer },
  { path: '/TheBenefitsOfTravelingAbroad', name: 'TheBenefitsOfTravelingAbroad', component: TheBenefitsOfTravelingAbroad },
  { path: '/ShouldPublicTransportBeFree', name: 'ShouldPublicTransportBeFree', component: ShouldPublicTransportBeFree },
  { path: '/TheImpactOfCarsOnTheEnvironment', name: 'TheImpactOfCarsOnTheEnvironment', component: TheImpactOfCarsOnTheEnvironment },
  { path: '/AirTravelLuxuryOrNecessity', name: 'AirTravelLuxuryOrNecessity', component: AirTravelLuxuryOrNecessity },
  { path: '/HowTrainsCanReducePollution', name: 'HowTrainsCanReducePollution', component: HowTrainsCanReducePollution },
  { path: '/ShouldTheDeathPenaltyExist', name: 'ShouldTheDeathPenaltyExist', component: ShouldTheDeathPenaltyExist },
  { path: '/TheImportanceOfStrictTrafficLaws', name: 'TheImportanceOfStrictTrafficLaws', component: TheImportanceOfStrictTrafficLaws },
  { path: '/HowtToReduceCrimeInCities', name: 'HowtToReduceCrimeInCities', component: HowtToReduceCrimeInCities },
  { path: '/CybercrimeAndOnlineSafety', name: 'CybercrimeAndOnlineSafety', component: CybercrimeAndOnlineSafety },
  { path: '/WhyHonestyIsImportantInSociety', name: 'WhyHonestyIsImportantInSociety', component: WhyHonestyIsImportantInSociety },
  { path: '/TheFutureOfRenewableEnergy', name: 'TheFutureOfRenewableEnergy', component: TheFutureOfRenewableEnergy },
  { path: '/HowRobotsAreChangingIndustries', name: 'HowRobotsAreChangingIndustries', component: HowRobotsAreChangingIndustries },
  { path: '/MedicalResearchAndNewDiseases', name: 'MedicalResearchAndNewDiseases', component: MedicalResearchAndNewDiseases },
  { path: '/TheBenefitsOfSpaceTechnology', name: 'TheBenefitsOfSpaceTechnology', component: TheBenefitsOfSpaceTechnology },
  { path: '/WillHumansLiveOnMars', name: 'WillHumansLiveOnMars', component: WillHumansLiveOnMars },
  { path: '/TheImportanceOfSelfDiscipline', name: 'TheImportanceOfSelfDiscipline', component: TheImportanceOfSelfDiscipline },
  { path: '/HowHobbiesImproveMentalHealth', name: 'HowHobbiesImproveMentalHealth', component: HowHobbiesImproveMentalHealth },
  { path: '/WhySettingGoalsIsImportant', name: 'WhySettingGoalsIsImportant', component: WhySettingGoalsIsImportant },
  { path: '/TheImpactOfPositiveThinking', name: 'TheImpactOfPositiveThinking', component: TheImpactOfPositiveThinking },
  { path: '/TimeManagementAndSuccess', name: 'TimeManagementAndSuccess', component: TimeManagementAndSuccess },
  { path: '/ThePowerOfObservation', name: 'ThePowerOfObservation', component: ThePowerOfObservation },
  { path: '/LifeInAVillage', name: 'LifeInAVillage', component: LifeInAVillage },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;