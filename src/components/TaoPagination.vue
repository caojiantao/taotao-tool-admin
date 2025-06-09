<template>
  <n-pagination 
    v-model:page="page.req.current"
    :page-count="Math.ceil(page.resp.total / page.req.size)"
    show-quick-jumper
    show-size-picker
    :page-sizes="[10, 20, 50, 100]"
    @update:page="load"
    @update:page-size="handlePageSizeChange"
  />
</template>

<script setup>
import { watch, onMounted } from 'vue'
import $http from '@/http'

const props = defineProps(['page'])
const emit = defineEmits(['onSuccess'])

const load = () => {
  let page = props.page;
  $http({
    url: page.api,
    params: page.req,
  }).then(resp => {
    page.resp = resp;
    // 通知父组件
    emit('onSuccess', resp)
  })
}

const handlePageSizeChange = (pageSize) => {
  props.page.req.size = pageSize;
  props.page.req.current = 1;
  load();
}

onMounted(() => {
  load();
})

watch(() => props.page.req.current, (newValue, oldValue) => {
  load();
});
</script>
