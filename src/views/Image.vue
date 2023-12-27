<template>
  <el-form inline>
    <el-form-item>
      <el-select v-model="bucket">
        <el-option label="博客" value="blog" />
        <el-option label="恋爱记事本" value="love-note" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-upload
        :file-list="fileList"
        :http-request="upload"
        list-type="picture"
        :show-file-list="false"
        accept="image/*"
      >
        <el-button type="primary">上传</el-button>
      </el-upload>
    </el-form-item>
  </el-form>

  <div class="image-item" v-for="(file, index) in fileList" :key="index">
    <el-divider />
    <div class="image-item-content">
      <!-- <el-image style="width: 100px; height: 100px" :src="file.url" fit="cover" /> -->
      <!-- <a style="flex: auto; margin: 0 20px" :href="file.url" target="_blank">{{
        file.url
      }}</a> -->
      {{file.filename}}
      <el-button type="danger" :icon="Delete" circle @click="deleteImage(file)" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { Delete } from "@element-plus/icons-vue";

import $http from "@/http";

const fileList = ref([]);

const query = reactive({
  current: 1,
  size: 10,
});

const bucket = ref("blog");

onMounted(() => {
  list();
})

const list = () => {
  $http({
      url: "/system/media/list",
      method: "get",
      params: query,
    })
    .then((data) => {
      fileList.value = data;
    });
}

const upload = (item) => {
  let data = new FormData();
  data.append("file", item.file);
  data.append("bucket", bucket.value);
  $http({
      url: "/system/media/upload",
      method: "post",
      data: data,
    })
    .then((data) => {
      list();
    });
};

const deleteImage = (item) => {
  $http({
    url: "/system/media/delete?id=" + item.id,
    method: "post",
  }).then((data) => {
    list();
  });
};
</script>

<style scoped>
.image-item-content {
  display: flex;
  align-items: center;
  padding: 5px 10px;
}
</style>
