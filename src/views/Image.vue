<template>
  <el-upload :file-list="fileList" :http-request="upload" list-type="picture" :show-file-list="false" accept="image/*">
    <el-button type="primary">上传</el-button>
  </el-upload>

  <div class="image-item" v-for="(file, index) in fileList" :key="index">
    <el-divider />
    <div class="image-item-content">
      <el-image style="width: 100px; height: 100px" :src="file.url" fit="cover" />
      <a style="flex:auto;margin:0 20px;" :href="file.url" target="_blank">{{ file.url }}</a>
      <el-button type="danger" :icon="Delete" circle @click="deleteImage(file)" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { Delete } from '@element-plus/icons-vue'

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
      url: `http://image.caojiantao.site:1024/${data}`,
    });
  });
};

const deleteImage = (item) => {
  $http({
    url: `/upload/image/delete?filename=${item.filename}`,
    method: "post",
  }).then((data) => {
    let index = -1;
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].filename == item.filename) {
        index = i;
        break;
      }
    }
    fileList.splice(index, 1);
  });
}
</script>

<style scoped>
.image-item-content {
  display: flex;
  align-items: center;
  padding: 5px 10px;
}
</style>
