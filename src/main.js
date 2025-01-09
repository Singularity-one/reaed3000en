import { createApp } from 'vue';
import App from './App.vue';
import router from './route/route'; // 引入 Vue Router 配置

createApp(App).use(router).mount('#app')
