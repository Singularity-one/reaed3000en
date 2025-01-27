import { createApp } from 'vue';
import App from './App.vue';
import router from './route/route'; // 引入 Vue Router 配置
import { createPinia } from 'pinia'; // 引入 Pinia

// 創建 Vue 應用實例
const app = createApp(App);

// 創建 Pinia 實例並註冊到應用
const pinia = createPinia();
app.use(pinia);

// 註冊 Vue Router
app.use(router);

// 挂載應用
app.mount('#app');
