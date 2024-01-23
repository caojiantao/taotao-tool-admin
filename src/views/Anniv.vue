<template>
  <el-form :model="form" inline>
    <el-form-item>
      <el-button type="primary" @click="openSavePopup({})">新增</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="dataList" border>
    <el-table-column prop="annivType" label="类型" />
    <el-table-column prop="annivDate" label="日期" />
    <el-table-column prop="lunar" label="农历" />
    <el-table-column prop="remark" label="备注" />
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button type="primary" :icon="Edit" circle @click="openSavePopup(scope.row)"></el-button>
        <el-button type="danger" :icon="Delete" circle @click="openRemovePopup(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="保存">
    <el-form :model="form" label-width="150px">
      <el-form-item label="类型">
        <el-select v-model="form.annivType">
          <el-option label="生日" value="BIRTHDAY" />
          <el-option label="新婚" value="WEDDING" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.annivDate"
          type="date"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="农历/公历">
        <el-select v-model="form.lunar">
          <el-option label="农历" value="true" />
          <el-option label="公历" value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" />
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
const form = ref({});

onMounted(() => {
  list()
});

const list = () => {
  $http({
    url: "/anniv/listAnniv",
  }).then((data) => {
    dataList.value = data;
  });
}

const remove = (id) => {
  $http({
    url: "/anniv/deleteAnniv",
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
    'id': data.id,
    'annivType': data.annivType,
    'annivDate': data.annivDate,
    'lunar': data.lunar,
    'remark': data.remark,
  }
  dialogVisible.value = true;
}

const openRemovePopup = (data) => {
  ElMessageBox.confirm(
    '确定要删除吗？',
    '删除',
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
    url: "/anniv/saveAnniv",
    method: "post",
    data: form.value
  }).then(() => {
    dialogVisible.value = false;
    list();
  });
}
</script>