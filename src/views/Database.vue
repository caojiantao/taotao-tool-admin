<template>
  <n-form>
    <n-form-item>
      <n-input 
        v-model:value="form.sql" 
        type="textarea" 
        placeholder="请输入SQL语句"
        :autosize="{ minRows: 3, maxRows: 8 }"
      />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="onSumitForm">查询</n-button>
    </n-form-item>
  </n-form>

  <n-data-table 
    :columns="columns"
    :data="dataList" 
    :bordered="true"
    :single-line="false"
  />
</template>

<script setup>
import { ref, computed } from "vue";

import $http from "@/http";

const head = ref([]);
const dataList = ref([]);
const form = ref({});

const columns = computed(() => {
  return head.value.map(item => ({
    title: item,
    key: item,
    resizable: true
  }))
})

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
