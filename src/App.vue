<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterView } from "vue-router";
import TaoMenu from "./components/TaoMenu.vue";
import TaoHeader from "./components/TaoHeader.vue";

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
  <n-layout has-sider>
    <n-layout-sider 
      :width="250"
      bordered
      :native-scrollbar="false"
    >
      <tao-menu />
    </n-layout-sider>
    <n-layout>
      <n-layout-header class="tao-header">
        <TaoHeader :userInfo="homeExtra.userInfo"/>
      </n-layout-header>
      <n-layout-content class="tao-main">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.tao-header {
  padding: 0 24px;
  border-bottom: 1px solid var(--n-border-color);
}

.tao-main {
  padding: 24px;
}
</style>
