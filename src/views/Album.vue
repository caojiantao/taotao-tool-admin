<template>
  <el-button type="primary">新增</el-button>

  <div class="tao-infinite-item" v-for="item in page.resp.rows" :key="item.id">
    {{ item.name }}
  </div>
  <tao-pagination :page="page" @on-success="onSuccess"></tao-pagination>
</template>

<script setup>
import { reactive } from 'vue'

import TaoPagination from '@/components/TaoPagination.vue'
import config from '@/config'

const page = reactive({
  api: '/album/getAlbumPage',
  req: {
    current: 1,
    size: 10,
  },
  resp: {
    rows: [],
    total: 0,
  }
})

const onSuccess = resp => {
  // 生成图片链接
  resp.rows.forEach(item => {
    item.picUrl = config.getPicUrl(item.coverFilename)
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
