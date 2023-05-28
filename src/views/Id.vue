<template>
  <el-button type="primary" @click="refresh">刷新</el-button>
  <el-input v-model="id" disabled />
</template>

<script setup>
import { ref, onMounted } from "vue";

import $http from "@/http";

const id = ref("");

onMounted(() => {
  refresh();
});

const refresh = () => {
  $http({
    url: "/id/get",
  }).then((data) => {
    id.value = data;
  });
};
</script>
