<template>
  <el-upload action="http://localhost:8080/pic/batchUploadPic" multiple :show-file-list="false" :on-success="resetPage">
    <el-button type="primary">上传</el-button>
  </el-upload>

  <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-distance="10" class="tao-infinite">
    <div class="tao-infinite-item" v-for="item in list" :key="item.id">
      <a :href="fmtUrl(item.url)" target="_blank">
        <img :src="fmtUrl(item.url)" />
      </a>
      <div>{{ fmtUrl(item.url) }}</div>
      <el-button type="default" @click="copyUrl(fmtUrl(item.url), $event)">复制链接</el-button>
    </div>
    <p v-if="loading">正在加载...</p>
    <p v-if="noMore">我是有底线的</p>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import $http from '@/http'
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'

const req = reactive({
  page: 1,
  size: 10,
})

const list = ref([])

const loading = ref(false)
const noMore = ref(false)
const disabled = computed(() => loading.value || noMore.value)

const load = () => {
  loading.value = true;
  $http({
    url: '/pic/getPicPage',
    params: req,
  }).then(resp => {
    const rows = resp.rows;
    if (rows.length > 0) {
      list.value.push(...resp.rows);
      req.page++;
    } else {
      noMore.value = true;
    }
  }).finally(() => {
    loading.value = false;
  })
}

const resetPage = () => {
  req.page = 1;
  list.value = [];
  load();
}

const fmtUrl = (url) => {
  return `http://localhost:8080/static/${url}`;
}

const copyUrl = (url, event) => {
  let clipboard = new Clipboard(event.target, {
    text: () => {
      return url
    }
  })
  clipboard.on('success', e => {
    ElMessage({ message: '复制成功', showClose: true, type: 'success' })
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', e => {
    ElMessage({ message: '复制失败,', showClose: true, type: 'error' })
    clipboard.destroy()
  })
  clipboard.onClick(event);
}
</script>

<style scoped>
.tao-infinite {
  height: 400px;
  overflow: auto;
}

.tao-infinite-item {
  border: 1px solid grey;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
}

.tao-infinite-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
