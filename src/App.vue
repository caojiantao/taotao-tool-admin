<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import config from './config'
import TaoMenu from './components/TaoMenu.vue'
</script>

<template>
  <el-container>
    <el-header>
      {{ config.title }}
    </el-header>
    <el-container>
      <el-aside>
        <tao-menu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
