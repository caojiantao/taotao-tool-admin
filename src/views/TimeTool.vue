<template>
  <n-space vertical size="large" style="padding: 20px;">
    <!-- 当前时间戳 -->
    <n-card title="⏰ 当前时间戳" size="small">
      <n-space align="center" justify="space-between">
        <n-tag type="info" size="large" style="font-family: monospace;">
          {{ form.currentMills }}
        </n-tag>
        <n-button type="primary" secondary @click="resetCurrentMills" size="small">
          🔄 刷新
        </n-button>
      </n-space>
    </n-card>

    <!-- 时间戳转换 -->
    <n-card title="🔄 时间戳转换" size="small">
      <n-space vertical size="medium" align="center">
        <n-space align="center">
          <n-text strong>时间戳:</n-text>
          <n-input-number 
            v-model:value="form.stamp" 
            :show-button="false"
            placeholder="输入时间戳"
            style="width: 200px;"
          />
          <n-select 
            v-model:value="form.unit" 
            :options="unitOptions" 
            style="width: 120px;"
          />
        </n-space>
        
        <n-space size="small">
          <n-button 
            type="primary" 
            ghost
            @click="transferToString" 
            size="medium"
          >
            ⬇️ 转为字符串
          </n-button>
          <n-button 
            type="warning" 
            ghost
            @click="transferToStamp" 
            size="medium"
          >
            ⬆️ 转为时间戳
          </n-button>
        </n-space>
        
        <n-space align="center">
          <n-text strong>字符串:</n-text>
          <n-input 
            v-model:value="form.string" 
            placeholder="YYYY-MM-DD HH:mm:ss"
            style="width: 300px;"
          />
        </n-space>
      </n-space>
    </n-card>

    <!-- 时间单位转换 -->
    <n-card title="⚡ 时间单位转换" size="small">
      <n-space vertical size="medium" align="center">
        <n-space align="center">
          <n-text strong>时间1:</n-text>
          <n-input-number 
            v-model:value="form.time1" 
            :show-button="false"
            placeholder="输入数值"
            style="width: 150px;"
          />
          <n-select 
            v-model:value="form.unit1" 
            :options="timeUnitOptions" 
            style="width: 100px;"
          />
        </n-space>
        
        <n-space size="small">
          <n-button 
            type="success" 
            ghost
            @click="transferToTime2" 
            size="medium"
          >
            ⬇️ 转换单位
          </n-button>
          <n-button 
            type="info" 
            ghost
            @click="transferToTime1" 
            size="medium"
          >
            ⬆️ 反向转换
          </n-button>
        </n-space>
        
        <n-space align="center">
          <n-text strong>时间2:</n-text>
          <n-input-number 
            v-model:value="form.time2" 
            :show-button="false"
            placeholder="转换结果"
            style="width: 150px;"
          />
          <n-select 
            v-model:value="form.unit2" 
            :options="timeUnitOptions" 
            style="width: 100px;"
          />
        </n-space>
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import moment from 'moment';

const unitOptions = [
  { label: '毫秒(ms)', value: "1" },
  { label: '秒(s)', value: "0.001" }
]

const timeUnitOptions = [
  { label: '日', value: "86400000" },
  { label: '时', value: "3600000" },
  { label: '分', value: "60000" },
  { label: '秒', value: "1000" },
  { label: '毫秒', value: "1" }
]

const form = reactive({
  currentMills: 0,
  stamp: 0,
  unit: "1",
  string: '',

  time1: 1,
  unit1: "86400000",
  time2: 1,
  unit2: "1",
})

const resetCurrentMills = () => {
  form.currentMills = new Date().getTime();
}

const transferToString = () => {
  let string = new moment(Number(form.stamp) / form.unit).format("yyyy-MM-DD HH:mm:ss");
  form.string = string;
}

const transferToStamp = () => {
  let m = new moment(form.string);
  form.stamp = m.valueOf() * form.unit;
}

const transferToTime1 = () => {
  form.time1 = form.time2 * form.unit2 / form.unit1;
}

const transferToTime2 = () => {
  form.time2 = form.time1 * form.unit1 / form.unit2;
}

onMounted(() => {
  form.currentMills = new Date().getTime();
  form.stamp = form.currentMills;
  transferToString();

  transferToTime2();
});

</script>

<style scoped>
/* 只保留最少量的自定义样式 */
</style>
