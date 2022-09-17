<template>
  <el-button type="primary">新增</el-button>

  <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-distance="10" class="tao-infinite">
    <div class="tao-infinite-item" v-for="item in list" :key="item.id">
      {{ item.name }}
    </div>
    <p v-if="loading">正在加载...</p>
    <p v-if="noMore">我是有底线的</p>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import $http from '@/http'

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
    url: '/album/getAlbumPage',
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
