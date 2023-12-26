<template>
  <el-form :model="form">
    <el-form-item>
      <el-input v-model="form.sql" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSumitForm">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="dataList" border>
    <el-table-column v-for="item in head" :prop="item" :label="item" />
  </el-table>
</template>

<script setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

import $http from "@/http";

const head = ref([]);
const dataList = ref([]);
const form = ref({});

const onSumitForm = () => {
  $http({
    url: "/database/execute",
    method: "post",
    data: form.value,
  }).then((resp) => {
    head.value = [];
    dataList.value = [];

    let list = resp.dataList;
    let dataList2 = [];
    for (let dataArr of list) {
      let data = {};
      for (let i = 0; i < resp.head.length; i++) {
        data[resp.head[i]] = dataArr[i];
      }
      dataList2.push(data);
    }

    head.value = resp.head;
    dataList.value = dataList2;
  });
};
</script>
