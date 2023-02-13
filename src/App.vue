<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TaoMenu from './components/TaoMenu.vue'
import TaoHeader from './components/TaoHeader.vue'

</script>

<template>
  <el-container>
    <el-header>
      涛涛控制台
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
