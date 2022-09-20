<template>
  <el-upload action="http://localhost:8080/pic/batchUploadPic" multiple :show-file-list="false" :limit="20"
    accept="image/jpg,image/jpeg,image/png" name="files">
    <el-button type="primary">上传</el-button>
  </el-upload>

  <div class="tao-infinite-item" v-for="item in page.resp.rows" :key="item.id">
    <a :href="item.picUrl" target="_blank">
      <img :src="item.picUrl" />
    </a>
    <div>{{ item.picUrl }}</div>
    <el-button type="default" @click="copyUrl(item.picUrl, $event)">复制链接</el-button>
  </div>
  <tao-pagination :page="page" @on-success="onSuccess"></tao-pagination>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'
import TaoPagination from '@/components/TaoPagination.vue'
import config from '@/config'

const page = reactive({
  api: '/pic/getPicPage',
  req: {
    current: 1,
    size: 10,
  },
  resp: {
    rows: [],
    total: 0,
  }
})

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

const onSuccess = resp => {
  // 生成图片链接
  resp.rows.forEach(item => {
    item.picUrl = config.getPicUrl(item.filename)
  });
}
</script>

<style scoped>

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
