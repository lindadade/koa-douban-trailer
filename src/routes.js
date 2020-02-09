import AC from './components/async_load'

export default [
  {
    name: '首页',
    icon: 'home',
    path: '/',
    component: AC(() => import('./views/home')) // 动态加载功能
  },
  {
    name: '详情页',
    path: '/detail/:id',
    component: AC(() => import('./views/movie/detail')) // 动态加载功能
  },
  {
    name: '后台入口',
    icon: 'admin',
    path: '/admin',
    component: AC(() => import('./views/admin/login')) // 动态加载功能
  },
  {
    name: '后台电影列表',
    icon: 'admin',
    path: '/admin/list',
    component: AC(() => import('./views/admin/list')) // 动态加载功能
  }
]
