export default {
  routes: [
    {
      path: '/',
      title: '首页',
      view: 'Home.vue',
    },
    {
      path: '/metric',
      title: '服务指标',
      view: 'Metric.vue',
    },
    {
      path: '/upload/image',
      title: '图片上传',
      view: 'Image.vue',
    },
    {
      path: '/time-tool',
      title: '日期工具',
      view: 'TimeTool.vue',
    },
  ],
}