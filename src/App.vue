<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <CardTest />
  <div id="app">
    <h1>My Vue App</h1>
    <!-- 渲染路由內容 -->
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about" @click="goToAbout()">Go to About</RouterLink>

    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import CardTest from './components/CardTest.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    CardTest,
  },
  methods: {
    goToAbout() {
      this.$router.push('/about')
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>