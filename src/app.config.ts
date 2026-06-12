export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/add/index',
    'pages/timeline/index',
    'pages/family/index',
    'pages/profile/index',
    'pages/detail/index',
    'pages/card/index',
    'pages/member-detail/index',
    'pages/share/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FBF9F7',
    navigationBarTitleText: '老物件档案',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FBF9F7'
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderStyle: '#E8E4DF',
    selectedColor: '#8B7355',
    color: '#9B9590',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '物件'
      },
      {
        pagePath: 'pages/add/index',
        text: '建档'
      },
      {
        pagePath: 'pages/timeline/index',
        text: '时间轴'
      },
      {
        pagePath: 'pages/family/index',
        text: '家人'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的'
      }
    ]
  }
})
