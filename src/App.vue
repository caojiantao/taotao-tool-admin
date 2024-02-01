<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterView } from "vue-router";
import TaoMenu from "./components/TaoMenu.vue";
import TTHeader from "./components/TTHeader.vue";

import $http from "@/http";

const homeExtra = ref({});

onMounted(() => {
  $http({
    url: "/home/getHomeExtraResp",
  }).then((data) => {
    homeExtra.value = data
  });
});
</script>

<template>
  <el-container>
    <el-aside class="tt-aside">
      <tao-menu />
    </el-aside>
    <el-container class="tt-main">
      <el-header>
        <TTHeader :userInfo="homeExtra.userInfo" :weatherInfo="homeExtra.weatherInfo"/>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.tt-aside {
  position: fixed;
  overflow-y: auto;
  height: 100%;
}

.tt-main {
  margin-left: var(--el-aside-width);
}
</style>
