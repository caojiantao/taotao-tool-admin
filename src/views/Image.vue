<template>
  <n-space style="margin-bottom: 16px">
    <n-select v-model:value="query.bucket" style="width: 120px" :options="bucketOptions" />
    <n-input v-model:value="query.filename" placeholder="文件名" style="width: 200px" />
    <n-checkbox v-model:checked="keepName">原名保持</n-checkbox>
    <n-upload
      :custom-request="upload"
      :show-file-list="false"
      accept="image/*"
      :multiple="false"
      @before-upload="beforeUpload"
      @change="onChange"
    >
      <n-button type="primary">上传图片</n-button>
    </n-upload>
    <n-button type="primary" @click="list">查询</n-button>
  </n-space>

  <n-data-table 
    :columns="columns"
    :data="fileList" 
    :bordered="true"
  />
</template>

<script setup>
import { onMounted, reactive, ref, h } from "vue";
import { fmtBytes } from "@/util/common"
import { NButton } from 'naive-ui'

import $http from "@/http";

const fileList = ref([]);
const keepName = ref(false);

const bucketOptions = [
  { label: "博客", value: "blog" },
  { label: "涛涛工具箱", value: "taotao-tool" },
  { label: "个人资料", value: "personal-data" }
]

const query = reactive({
  bucket: "blog",
  filename: "",
  current: 1,
  size: 10,
});

const columns = [
  { title: '分区', key: 'bucket' },
  { title: '类型', key: 'mediaType' },
  { title: '文件名', key: 'filename' },
  { title: 'md5', key: 'contentMd5' },
  { title: '大小', key: 'contentLength' },
  { title: '拓展信息', key: 'content_json' },
  { title: '创建时间', key: 'createTime' },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    render(row) {
      return h('div', { style: 'display: flex; gap: 8px;' }, [
        h(NButton, {
          type: 'primary',
          size: 'small',
          onClick: () => onClickView(row)
        }, { default: () => '查看' }),
        h(NButton, {
          type: 'error',
          size: 'small',
          onClick: () => onClickDelete(row)
        }, { default: () => '删除' })
      ])
    }
  }
]

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
      for (let item of data) {
        item.contentLength = fmtBytes(item.contentLength);
      }
      fileList.value = data;
    });
}

const upload = (options) => {
  console.log('Upload options:', options); // 调试用
  
  let data = new FormData();
  data.append("file", options.file.file || options.file);  // 兼容不同的文件对象结构
  data.append("bucket", query.bucket);
  data.append("keepName", keepName.value);
  
  $http({
      url: "/system/media/upload",
      method: "post",
      data: data,
    })
    .then((data) => {
      console.log('Upload success:', data);
      list();
      options.onFinish();  // 必须调用 onFinish()
    })
    .catch((error) => {
      console.error('Upload error:', error);
      options.onError();   // 必须调用 onError()
    });
};

const beforeUpload = (data) => {
  console.log('Before upload:', data);
  return true;
};

const onChange = (data) => {
  console.log('Upload change:', data);
};

const onClickView = (item) => {
  window.open(`http://media.caojiantao.site:1024/${item.bucket}/${item.filename}`);
};

const onClickDelete = (item) => {
  if (confirm(`确定要删除文件 "${item.filename}" 吗？此操作不可撤销。`)) {
    $http({
      url: "/system/media/delete?id=" + item.id,
      method: "post",
    }).then((data) => {
      list();
    });
  }
};
</script>

<style scoped>
.image-item-content {
  display: flex;
  align-items: center;
  padding: 5px 10px;
}
</style>
