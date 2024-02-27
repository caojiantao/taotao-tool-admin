<template>
  <div class="tt-header">
    <span class="tt-bread"> 首页 </span>
    <span class="tt-fill">  </span>

    <el-popover
      trigger="click"
      :width="500"
      @show="onShowWeatherPopover"
    >
      <template #reference>
        <span v-if="weatherInfo" class="tt-weather"> {{weatherMsg}} </span>
      </template>
      <template #default>
        <div class="tt-weather-list">
          <div v-for="item in weatherForecasts.casts" class="tt-weather-list-item">
            <div class="tt-weather-list-item-date">
              {{item.date}}
            </div>
            <div class="tt-weather-list-item-temperature">
              {{item.nighttemp}} ~ {{item.daytemp}}
            </div>
            <div class="tt-weather-list-item-info">
              {{formatWeather(item)}}
            </div>
          </div>
        </div>
      </template>
    </el-popover>

    <el-avatar v-if="userInfo" class="tt-userInfo" :size="30" :src="'http://media.caojiantao.site:1024/taotao-tool/' + userInfo.avatar" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import $http from "@/http";

const props = defineProps({
  userInfo: Object,
  weatherInfo: Object,
})

const userInfo = ref(props.userInfo);
const weatherInfo = ref(props.weatherInfo);
const weatherMsg = ref('');

const weatherForecasts = ref({});

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

const onShowWeatherPopover = (e) => {
  if(weatherForecasts.value.casts) {
    // 页面只请求一次
    return;
  }
  $http({
    url: "/home/getWeatherForecasts",
  }).then((data) => {
    weatherForecasts.value = data;
  });
}

const formatWeather = (cast) => {
  let nightweather = cast.nightweather;
  let dayweather = cast.dayweather;
  if (nightweather == dayweather) {
    return nightweather;
  }
  return `${nightweather}转${dayweather}`;
}

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

.tt-weather-list {
  display: flex;
  justify-content: space-between;
}

.tt-weather-list-item {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
}
</style>
