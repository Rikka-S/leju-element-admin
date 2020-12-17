import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: 'competence',
    component: Layout,
    redirect: '/account',
    name: 'Product',
    meta: { title: '权限管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/competence/account'),
        meta: { title: '账号管理', icon: 'el-icon-user' }
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import('@/views/competence/role'),
        meta: { title: '角色管理', icon: 'el-icon-s-custom' }
      },
      {
        path: 'naturalResources',
        name: 'NaturalResources',
        component: () => import('@/views/competence/naturalResources'),
        meta: { title: '资源管理', icon: 'el-icon-s-grid' }
      }
    ]
  },
  {
    path: 'product',
    component: Layout,
    redirect: '/productLs',
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-s-shop' },
    children: [
      {
        path: '/productLs',
        name: 'ProductLs',
        component: () => import('@/views/product/productLs'),
        meta: { title: '商品列表', icon: 'el-icon-shopping-bag-1' }
      },
      {
        path: '/addProduct',
        name: 'AddProduct',
        hidden: true,
        component: () => import('@/views/product/productLs/addProduct'),
        meta: { title: '新增商品', icon: 'table', activeMenu: '/productLs' }
      },
      {
        path: '/editProduct/:id',
        name: 'EditProduct',
        hidden: true,
        component: () => import('@/views/product/productLs/addProduct'),
        meta: { title: '编辑商品', icon: 'table', activeMenu: '/productLs' }
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/product/category'),
        meta: { title: '商品分类', icon: 'tree' }
      }
    ]
  },
  {
    path: 'order',
    component: Layout,
    redirect: '/orderLs',
    name: 'Order',
    meta: { title: '订单管理', icon: 'el-icon-s-order' },
    children: [
      {
        path: '/orderLs',
        name: 'OrderLs',
        component: () => import('@/views/order/orderLs'),
        meta: { title: '订单列表', icon: 'el-icon-tickets' }
      },
      {
        path: '/orderDetail/:id',
        name: 'OrderDetail',
        hidden: true,
        component: () => import('@/views/order/orderLs/orderDetail'),
        meta: { title: '订单详细', icon: 'table', activeMenu: '/orderLs' }
      },

      {
        path: '/backLs',
        name: 'BackLs',
        component: () => import('@/views/order/backLs'),
        meta: { title: '退单列表', icon: 'el-icon-tickets' }
      },
      {
        path: '/backDetail/:id',
        name: 'BackDetail',
        hidden: true,
        component: () => import('@/views/order/backLs/backDetail'),
        meta: { title: '退单详细', icon: 'table', activeMenu: '/backLs' }
      }
      // {
      //   path: '/addressLs',
      //   name: 'AddressLs',
      //   component: () => import('@/views/order/addressLs'),
      //   meta: { title: '地址管理', icon: 'el-icon-location-outline' }
      // }
    ]
  },
  {
    path: 'marketing',
    component: Layout,
    redirect: '/activity',
    name: 'Marketing',
    alwaysShow: true,
    meta: { title: '营销管理', icon: 'el-icon-s-management' },
    children: [
      {
        path: '/activity',
        name: 'Activity',
        component: () => import('@/views/marketing/activity/index'),
        meta: { title: '限时活动', icon: 'el-icon-present' }
      }
      // {
      //   path: '/adLs',
      //   name: 'AdLs',
      //   component: () => import('@/views/marketing/adLs'),
      //   meta: { title: '广告列表', icon: 'el-icon-chat-square' }
      // }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/article',
    name: 'Content',
    meta: { title: '内容管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/article',
        name: 'Article',
        component: () => import('@/views/content/article/index'),
        meta: { title: '文章管理', icon: 'el-icon-notebook-1' }
      },
      {
        path: '/addArticle',
        name: 'AddrAticle',
        hidden: true,
        component: () => import('@/views/content/article/addArticle/index'),
        meta: { title: '新增文章', icon: 'el-icon-notebook-1', activeMenu: '/article' }
      },
      {
        path: '/editArticle/:id',
        name: 'EditArticle',
        hidden: true,
        component: () => import('@/views/content/article/addArticle/index'),
        meta: { title: '编辑文章', icon: 'el-icon-edit', activeMenu: '/article' }
      },
      {
        path: '/material',
        name: 'Material',
        component: () => import('@/views/content/material/index'),
        meta: { title: '素材管理', icon: 'tree' }
      }

    ]
  },
  {
    path: 'user',
    component: Layout,
    name: 'User',
    alwaysShow: true,
    meta: { title: '注册用户管理', icon: 'el-icon-s-custom' },
    children: [
      {
        path: '/userList',
        name: 'UserList',
        component: () => import('@/views/user'),
        meta: { title: '用户列表', icon: 'tree' }
      }

    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
