<template>
  <el-button type="primary" @click="openSavePopup({})">新增配置</el-button>

  <el-table :data="dataList" border>
    <el-table-column prop="itemKey" label="key" />
    <el-table-column prop="itemValue" label="value" />
    <el-table-column prop="mark" label="备注" />
    <el-table-column prop="gmtCreate" label="创建时间" />
    <el-table-column prop="gmtModified" label="修改时间" />
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button type="primary" :icon="Edit" circle @click="openSavePopup(scope.row)"></el-button>
        <el-button type="danger" :icon="Delete" circle @click="openRemovePopup(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="保存配置">
    <el-form :model="form" label-width="50px">
      <el-form-item label="key">
        <el-input v-model="form.itemKey" :disabled="itemKeyDisabled" />
      </el-form-item>
      <el-form-item label="value">
        <el-input v-model="form.itemValue" type="textarea" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.mark" />
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
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

import $http from "@/http";

const dataList = ref([]);
const dialogVisible = ref(false);
const itemKeyDisabled = ref(false);
const form = ref({});

onMounted(() => {
  list()
});

const list = () => {
  $http({
    url: "/dictionary/listDictionary",
  }).then((data) => {
    dataList.value = data;
  });
}

const remove = (id) => {
  $http({
    url: "/dictionary/removeDictionary",
    method: "post",
    params: {
      id: id
    }
  }).then((data) => {
    list();
  });
}

const openSavePopup = (data) => {
  form.value = {
    'itemKey': data.itemKey,
    'itemValue': data.itemValue,
    'mark': data.mark,
  }
  dialogVisible.value = true;
  itemKeyDisabled.value = (data.itemKey != null);
}

const openRemovePopup = (data) => {
  ElMessageBox.confirm(
    '确定要删除配置吗？',
    '删除配置',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      remove(data.id);
    })
    .catch(() => {
    })
}

const submitForm = () => {
  $http({
    url: "/dictionary/saveDictionary",
    method: "post",
    data: form.value
  }).then(() => {
    dialogVisible.value = false;
    list();
  });
}
</script>