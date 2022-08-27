<script setup>
import config from '../config'
import { Menu as IconMenu } from '@element-plus/icons-vue'
import router from '../router'

const handleClick = (key, keyPath) => {
  let menu = config.menus.find(item => item.path == key.index);
  router.push(menu.path)
}
</script>

<template>
  <el-menu>
    <el-menu-item v-for="item in config.menus" :index="item.path" @click="handleClick">
      <el-icon>
        <icon-menu />
      </el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>