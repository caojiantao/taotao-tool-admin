<template>
  <el-pagination background layout="prev, pager, next" v-model:current-page="page.req.current"
    :total="page.resp.total" />
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

onMounted(() => {
  load();
})

watch(() => props.page.req.current, (newValue, oldValue) => {
  load();
});
</script>
