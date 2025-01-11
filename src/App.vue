<template>
  <div id="app">
    <h1>My Vue App</h1>
    <!-- 渲染路由內容 -->
    <RouterLink to="/DayEn15" @click="transPage('/DayEn15')">DayEn15</RouterLink>

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    transPage(item) {
      console.log("item",item)
      this.$router.push(`${item}`);
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