<script setup>
import { ref } from 'vue'
import config from "../config";
import router from "../router";

const selectedKey = ref(null)

const menuOptions = config.routes.map((item, index) => ({
  label: item.title,
  key: index.toString()
}))

const handleMenuSelect = (key) => {
  selectedKey.value = key
  let menu = config.routes[parseInt(key)];
  router.push(menu.path);
};
</script>

<template>
  <n-menu
    :options="menuOptions"
    :value="selectedKey"
    @update:value="handleMenuSelect"
  />
</template>
