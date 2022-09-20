export default {
  title: '涛涛工具箱',
  routes: [
    {
      path: '/',
      title: '首页',
      view: 'Home.vue',
      isMenu: true,
    },
    {
      path: '/pic',
      title: '图床',
      view: 'Pic.vue',
      isMenu: true,
    },
    {
      path: '/album',
      title: '相册',
      view: 'Album.vue',
      isMenu: true,
    },
    {
      path: '/album/:albumId/pic',
      title: '相册图片',
      view: 'AlbumPic.vue',
      isMenu: false,
    },
  ],
  getPicUrl: filename => {
    return `http://localhost:8080/static/${filename}`;
  }
}