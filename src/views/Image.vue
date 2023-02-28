<template>
  <el-upload
    :file-list="fileList"
    :http-request="upload"
    list-type="picture"
    :show-file-list="false"
    accept="image/*"
  >
    <el-button type="primary">上传</el-button>
  </el-upload>

  <div v-for="(file, index) in fileList" :key="index">
    <a :href="file.url" target="_blank">{{ file.filename }}</a>
  </div>
</template>

<script setup>
import { reactive } from "vue";

import $http from "@/http";

const fileList = reactive([]);

const upload = (item) => {
  let data = new FormData();
  data.append("file", item.file);
  $http({
    url: "/upload/image",
    method: "post",
    data: data,
  }).then((data) => {
    fileList.push({
      filename: data,
      url: `http://image.caojiantao.site:38080/${data}`,
    });
  });
};
</script>
