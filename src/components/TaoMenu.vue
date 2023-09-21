<script setup>
import config from "../config";
import router from "../router";

const onSelect = (index) => {
  let menu = config.routes[index];
  router.push(menu.path);
};
</script>

<template>
  <el-menu @select="onSelect">
    <el-menu-item
      v-for="(item, index) in config.routes"
      :index="index.toString()"
      :key="index"
    >
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>
