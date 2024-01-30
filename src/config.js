export default {
  routes: [
    {
      path: '/',
      title: '首页',
      view: 'Home.vue',
      icon: 'House',
    },
    {
      path: '/metric',
      title: '服务指标',
      view: 'Metric.vue',
      icon: 'Odometer',
    },
    {
      path: '/upload/image',
      title: '图片上传',
      view: 'Image.vue',
      icon: 'Picture',
    },
    {
      path: '/time-tool',
      title: '日期工具',
      view: 'TimeTool.vue',
      icon: 'Calendar',
    },
    {
      path: '/dictionary',
      title: '字典管理',
      view: 'Dictionary.vue',
      icon: 'Document',
    },
    {
      path: '/todo',
      title: '待办事项',
      view: 'Todo.vue',
      icon: 'Finished',
    },
    {
      path: '/anniv',
      title: '纪念日',
      view: 'Anniv.vue',
      icon: 'AlarmClock',
    },
    {
      path: '/database',
      title: '数据库',
      view: 'Database.vue',
      icon: 'Cpu',
    },
  ],
}