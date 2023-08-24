<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="当前时间戳">
      <el-text>{{ form.currentMills }}</el-text>
      <el-button type="primary" plain @click="resetCurrentMills" size="small">刷新</el-button>
    </el-form-item>

    <el-divider />

    <el-form-item label="时间戳">
      <el-input v-model="form.stamp" type="number" class="tt-data" />
      <el-select v-model="form.unit" class="tt-select">
        <el-option label="毫秒(ms)" value="1" />
        <el-option label="秒(s)" value="0.001" />
      </el-select>
    </el-form-item>
    <el-form-item label="转换">
      <div class="tt-transfer">
        <el-button type="primary" plain @click="transferToString" size="small">👇👇</el-button>
        <el-button type="primary" plain @click="transferToStamp" size="small">👆👆</el-button>
      </div>
    </el-form-item>
    <el-form-item label="字符串">
      <el-input v-model="form.string" class="tt-data" />
    </el-form-item>

    <el-divider />

    <el-form-item label="时间1">
      <el-input v-model="form.time1" type="number" class="tt-data" />
      <el-select v-model="form.unit1" class="tt-select">
        <el-option label="日" value="86400000" />
        <el-option label="时" value="3600000" />
        <el-option label="分" value="60000" />
        <el-option label="秒" value="1000" />
        <el-option label="毫秒" value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="转换">
      <div class="tt-transfer">
        <el-button type="primary" plain @click="transferToTime2" size="small">👇👇</el-button>
        <el-button type="primary" plain @click="transferToTime1" size="small">👆👆</el-button>
      </div>
    </el-form-item>
    <el-form-item label="时间2">
      <el-input v-model="form.time2" type="number" class="tt-data" />
      <el-select v-model="form.unit2" class="tt-select">
        <el-option label="日" value="86400000" />
        <el-option label="时" value="3600000" />
        <el-option label="分" value="60000" />
        <el-option label="秒" value="1000" />
        <el-option label="毫秒" value="1" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import moment from 'moment';

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
.tt-data {
  width: 180px;
}

.tt-select {
  width: 100px;
}
</style>
