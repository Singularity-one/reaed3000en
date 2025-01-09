<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the Home Page!</p>
    <router-link to="/about">Go to About Page</router-link>
  </div>
  <div>
    <button @click="goToAbout">Go to About Page</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter();

    const goToAbout = () => {
      router.push('/about'); // 跳轉到 About 頁面
    };

    return { goToAbout };
  },
};
</script>