<template>
  <n-space style="margin-bottom: 16px">
    <n-button type="primary" @click="openSavePopup({})">新增配置</n-button>
  </n-space>

  <n-data-table 
    :columns="columns"
    :data="dataList" 
    :bordered="true"
  />

  <n-modal v-model:show="dialogVisible" title="保存配置">
    <n-card style="width: 600px" title="保存配置" :bordered="false" size="huge">
      <n-form label-width="50px">
        <n-form-item label="key">
          <n-input v-model:value="form.itemKey" :disabled="itemKeyDisabled" />
        </n-form-item>
        <n-form-item label="value">
          <n-input v-model:value="form.itemValue" type="textarea" :autosize="{ minRows: 3 }" />
        </n-form-item>
        <n-form-item label="备注">
          <n-input v-model:value="form.mark" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space>
          <n-button @click="dialogVisible = false">取消</n-button>
          <n-button type="primary" @click="submitForm">提交</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>

  <n-modal v-model:show="deleteDialogVisible" title="删除确认">
    <n-card style="width: 400px" title="删除确认" :bordered="false" size="huge">
      <p>确定要删除这个配置吗？</p>
      <template #footer>
        <n-space>
          <n-button @click="deleteDialogVisible = false">取消</n-button>
          <n-button type="error" @click="confirmDelete">确认删除</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref, onMounted, h } from "vue";
import { NButton } from 'naive-ui';
import $http from "@/http";

const dataList = ref([]);
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const itemKeyDisabled = ref(false);
const form = ref({});
const deleteId = ref(null);

const columns = [
  { title: 'key', key: 'itemKey' },
  { title: 'value', key: 'itemValue' },
  { title: '备注', key: 'mark' },
  { title: '创建时间', key: 'gmtCreate' },
  { title: '修改时间', key: 'gmtModified' },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    render(row) {
      return h('div', { style: 'display: flex; gap: 8px;' }, [
        h(NButton, {
          type: 'primary',
          size: 'small',
          onClick: () => openSavePopup(row)
        }, { default: () => '编辑' }),
        h(NButton, {
          type: 'error',
          size: 'small',
          onClick: () => openRemovePopup(row)
        }, { default: () => '删除' })
      ])
    }
  }
]

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
  deleteId.value = data.id;
  deleteDialogVisible.value = true;
}

const confirmDelete = () => {
  remove(deleteId.value);
  deleteDialogVisible.value = false;
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