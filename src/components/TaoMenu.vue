<script setup>
import config from '../config'
import { Menu as IconMenu } from '@element-plus/icons-vue'
import router from '../router'

const handleClick = (key, keyPath) => {
  let menu = config.routes.find(item => item.path == key.index);
  router.push(menu.path)
}
</script>

<template>
  <el-menu>
    <template v-for="item in config.routes">
      <el-menu-item :index="item.path" v-if="item.isMenu" @click="handleClick">
        <el-icon>
          <icon-menu />
        </el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
    
  </el-menu>
</template>