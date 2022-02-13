<template>
    <div id="app">
      <div id="nav">
        <router-link to="/">首页</router-link> |
        <router-link to="/goods/list">商品列表</router-link> |
        <router-link to="/goods/detail">商品详情 </router-link> |
        <router-link to="/about">个人中心</router-link>
      </div>
      <router-view />
      <micro-view />
    </div>
</template>

<script>
import { router } from '../qiankun-admin';

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    push(url) {
      router.push(url);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
