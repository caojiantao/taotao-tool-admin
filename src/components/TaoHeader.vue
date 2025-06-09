<template>
  <div class="tao-header">
    <span class="tao-bread">首页</span>
    <span class="tao-fill"></span>
    <n-avatar v-if="userInfo" class="tao-userInfo" :size="30" :src="'http://media.caojiantao.site:1024/taotao-tool/' + userInfo.avatar" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  userInfo: Object,
})

const userInfo = ref(props.userInfo);

// 使用watch监听props的变化
watch(() => props.userInfo, (newVal) => {
  userInfo.value = newVal;
});
</script>

<style scoped>
.tao-header {
  line-height: 64px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
}

.tao-fill {
  flex-grow: 1;
}

.tao-userInfo {
  padding: 0 5px;
  cursor: pointer;
}
</style>
