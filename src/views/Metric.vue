<template>
  <el-collapse>
    <el-collapse-item v-for="(group, index) in metricGroupList" :key="index" :title="group.name">
      <el-table :data="group.itemList" border>
        <el-table-column prop="name" label="name" />
        <el-table-column label="value">
          <template #default="scope">
            {{ getMetricValue(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="description" />
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import $http from "@/http";

const metricGroupList = reactive([]);

onMounted(() => {
  let groupMap = new Map();
  $http({
    url: "/metric/list",
  }).then((data) => {
    data.forEach(metricItem => {
      let groupName = metricItem.name.substring(0, metricItem.name.indexOf("."));
      if (!groupMap.has(groupName)) {
        groupMap.set(groupName, []);
      }
      let groupItemList = groupMap.get(groupName);
      groupItemList.push(metricItem);
    });

    groupMap.forEach((groupItemList, groupName) => {
      metricGroupList.push({
        name: groupName,
        itemList: groupItemList
      })
    })
  });
});

const getMetricValue = (metric) => {
  for (let i = 0; i < metric.measurements.length; i++) {
    let item = metric.measurements[i];
    if (item.statistic == "VALUE") {
      switch (metric.baseUnit) {
        case "bytes":
          return fmtBytes(item.value);
        default:
          return item.value;
      }
    }
  }
}

const fmtBytes = (value) => {
  let units = ["B", "KB", "MB", "GB"];
  for (let i = 0; i < units.length; i++) {
    if (value < 1024) {
      return value.toFixed(2) + units[i];
    }
    value /= 1024;
  }
}
</script>