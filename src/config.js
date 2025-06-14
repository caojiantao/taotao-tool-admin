export default {
  routes: [
    {
      path: '/',
      title: '首页',
      view: 'Home.vue'
    },
    {
      path: '/upload/image',
      title: '图片上传',
      view: 'Image.vue'
    },
    {
      path: '/time-tool',
      title: '日期工具',
      view: 'TimeTool.vue'
    },
    {
      path: '/dictionary',
      title: '字典管理',
      view: 'Dictionary.vue'
    },
    {
      path: '/database',
      title: '数据库',
      view: 'Database.vue'
    },
  ],
}