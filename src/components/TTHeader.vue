<template>
  <div class="tt-header">
    <span class="tt-bread"> 首页 </span>
    <span class="tt-fill">  </span>
    <span v-if="weatherInfo" class="tt-weather"> {{weatherMsg}} </span>
    <el-avatar v-if="userInfo" class="tt-userInfo" :size="30" :src="'http://media.caojiantao.site:1024/taotao-tool/' + userInfo.avatar" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  userInfo: Object,
  weatherInfo: Object,
})

const userInfo = ref(props.userInfo);
const weatherInfo = ref(props.weatherInfo);
const weatherMsg = ref('');

// 使用watch监听props的变化
watch(() => props.userInfo, (newVal) => {
  userInfo.value = newVal;
});

// 使用watch监听props的变化
watch(() => props.weatherInfo, (newVal) => {
  weatherInfo.value = newVal;
  let live = newVal;
  weatherMsg.value = `${live.city} ${live.weather} ${live.temperature}°`;
});


</script>

<style scoped>
.tt-header {
  line-height: var(--el-header-height);
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  align-items: center;
}

.tt-fill {
  flex-grow: 1;
}

.tt-weather,
.tt-userInfo {
  padding: 0 5px;
}
</style>
