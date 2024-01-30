<template>
  <el-form inline @submit.prevent>
    <el-form-item>
      <el-select v-model="groupId" @change="list">
        <el-option label="今日待办" value="10" />
        <el-option label="需求迭代" value="20" />
        <el-option label="技术优化" value="21" />
        <el-option label="个人博客" value="22" />
        <el-option label="创新项目" value="23" />
        <el-option label="已完成" value="11" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="title" placeholder="新的待办..." @keyup.enter="submitForm"/>
    </el-form-item>
  </el-form>

  <div>
    <div class="item" v-for="(item, index) in dataList" :index="index" :key="index">
      <el-checkbox v-model="item.checked" @change="onCheckedChange(item)" />
      <el-text class="item-title-text" v-show="!item.edit" :type="item.checked?'info':''" :tag="item.checked?'del':'p'" @dblclick.native="onEdit(item)">{{item.title}}</el-text>
      <el-input class="item-title-input" v-show="item.edit" :ref="(ref)=>setRef(ref, item)" v-model="item.title" @blur="onEditChange(item)" @keyup.enter="onEditChange(item)"/>
      <el-link class="item-btn" type="danger" :icon="Delete" :underline="false" @click="deleteTodo(item)"></el-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessageBox } from 'element-plus'
import moment from 'moment';
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'

import $http from "@/http";

const dataList = ref([]);
const groupId = ref('10');

const title = ref('');

const refMap = new Map();

const setRef = (ref, item) => {
  refMap.set(item.id, ref);
}

onMounted(() => {
  list()
});

const list = () => {
  $http({
    url: `/todo/listTodo?groupId=${groupId.value}`,
  }).then((data) => {
    dataList.value = [];
    let now = new moment().format("yyyy-MM-DD");
    for (let item of data) {
      // 如果不是今天完成 todo 项，则不用展示。也就是只展示未完成和当天已完成的
      let updateTime = new moment(item.updateTime).format("yyyy-MM-DD");
      let finished = item.state == 1;
      if (finished && (now != updateTime)) {
        continue;
      }
      dataList.value.push({
        id: item.id,
        title: item.title,
        checked: finished,
        edit: false,
      })
    }
  });
}

const deleteTodo = (item) => {
  $http({
    url: "/todo/deleteTodo",
    method: "post",
    params: {
      id: item.id
    }
  }).then((data) => {
    list();
  });
}

const submitForm = () => {
  $http({
    url: "/todo/saveTodo",
    method: "post",
    data: {
      groupId: groupId.value,
      title: title.value
    }
  }).then(() => {
    title.value = '';
    list();
  });
}

const onCheckedChange = (item) => {
  $http({
    url: "/todo/saveTodo",
    method: "post",
    data: {
      id: item.id,
      state: item.checked ? 1 : 0
    }
  }).then(() => {
    list();
  });
}

const onEdit = (item) => {
  item.edit = true;
  // 手动获取焦点
  refMap.get(item.id).focus();
}

const onEditChange = (item) => {
  $http({
    url: "/todo/saveTodo",
    method: "post",
    data: {
      id: item.id,
      title: item.title
    }
  }).then(() => {
    list();
  });
}

</script>

<style scope>
  .el-select {
    --el-select-width: 120px;
  }

  .item {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
  }

  .item-title-text:hover {
    cursor: default;
  }

  .item-title-text,
  .item-title-input,
  .item-btn {
    margin-left: 5px
  }

  .item-btn {
    display: none;
  }

  .item:hover .item-btn {
    display: inline;
  }
</style>
