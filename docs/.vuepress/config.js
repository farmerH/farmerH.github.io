module.exports = {
  title: '洪旭的博客',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
      lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
      nav: [ // 导航栏配置
          { text: 'GitHub', link: 'https://github.com/farmerH' },
      ],
      sidebar: [{ // 左侧导航栏配置
                  title: 'Vuepress搭建'
                  // collapsable: false, //是否展开
              },
              // ['/accumulate/2019/准备工作', '准备工作']
          ]
          // sidebar: 'auto', // 侧边栏配置
          // sidebarDepth: 2, // 侧边栏显示2级
  }
};