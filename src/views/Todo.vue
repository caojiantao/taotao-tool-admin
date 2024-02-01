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
      <el-input v-model="title" placeholder="新的待办..." @keyup.enter="quickSubmitForm"/>
    </el-form-item>
  </el-form>

  <div>
    <div class="group" v-for="(group, index) in groupList" :index="index" :key="index">
      <el-text v-if="group.groupTitle">{{group.groupTitle}}</el-text>
      <div class="item" v-for="(item, index) in group.itemList" :index="index" :key="index">
        <el-checkbox v-model="item.checked" @change="onCheckedChange(item)" />
        <el-text class="item-title-text" v-show="!item.edit" :type="item.checked?'info':''" :tag="item.checked?'del':'p'" @dblclick.native="onEdit(item)">{{item.title}}</el-text>
        <el-input class="item-title-input" v-show="item.edit" :ref="(ref)=>setRef(ref, item)" v-model="item.title" @blur="onEditChange(item)" @keyup.enter="onEditChange(item)"/>
        <el-link class="item-btn" :icon="ChatLineRound" :underline="false" @click="openSavePopup(item)"></el-link>
        <el-link class="item-btn" type="danger" :icon="Delete" :underline="false" @click="deleteTodo(item)"></el-link>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="保存">
    <el-form :model="form" label-width="50px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" rows="5"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessageBox } from 'element-plus'
import moment from 'moment';
import {
  ChatLineRound,
  Delete,
  Edit,
} from '@element-plus/icons-vue'

import $http from "@/http";

const groupList = ref([]);
const groupId = ref('10');

const title = ref('');

const form = ref({});
const dialogVisible = ref(false);

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
    groupList.value = [];
    for (let group of data) {
      let itemList = [];
      for (let item of group.itemList) {
        itemList.push({
          id: item.id,
          title: item.title,
          content: item.content,
          checked: item.state == 1,
          edit: false,
        })
      }
      groupList.value.push({
        groupTitle: group.groupTitle,
        itemList: itemList,
      })
    }
    console.log(groupList.value)
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

const quickSubmitForm = () => {
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

const openSavePopup = (data) => {
  form.value = {
    'id': data.id,
    'title': data.title,
    'content': data.content,
  }
  dialogVisible.value = true;
}

const submitForm = () => {
  $http({
    url: "/todo/saveTodo",
    method: "post",
    data: form.value
  }).then(() => {
    dialogVisible.value = false;
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
