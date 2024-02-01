<template>
  <el-form inline>
    <el-form-item>
      <el-select v-model="query.bucket">
        <el-option label="博客" value="blog" />
        <el-option label="涛涛工具箱" value="taotao-tool" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="query.filename" />
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
    <el-form-item>
      <el-button type="primary" @click="list">查询</el-button>
    </el-form-item>
  </el-form>


  <el-table :data="fileList" border>
    <el-table-column prop="bucket" label="分区" />
    <el-table-column prop="mediaType" label="类型" />
    <el-table-column prop="filename" label="文件名" />
    <el-table-column prop="contentMd5" label="md5" />
    <el-table-column prop="contentLength" label="大小" />
    <el-table-column prop="content_json" label="拓展信息" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button type="primary" :icon="View" circle @click="onClickView(scope.row)"></el-button>
        <el-button type="danger" :icon="Delete" circle @click="onClickDelete(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { View, Delete } from "@element-plus/icons-vue";

import $http from "@/http";

const fileList = ref([]);

const query = reactive({
  bucket: "blog",
  filename: "",
  current: 1,
  size: 10,
});

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
  data.append("bucket", query.bucket);
  $http({
      url: "/system/media/upload",
      method: "post",
      data: data,
    })
    .then((data) => {
      list();
    });
};

const onClickView = (item) => {
  window.open(`http://media.caojiantao.site:1024/${item.bucket}/${item.filename}`);
};

const onClickDelete = (item) => {
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
