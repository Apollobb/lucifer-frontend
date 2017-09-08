import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'

/* layout */
import Layout from '@/views/layout/Layout';

Vue.use(VueRouter);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const routes = [
    {path: '/login', component: require('@/views/login/login'), hidden: true},
    {path: '/404', component: require('@/views/error/404'), hidden: true},
    {path: '/401', component: require('@/views/error/401'), hidden: true},
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'dashboard',
        hidden: true,
        meta: {requiresAuth: true},
        children: [{path: 'dashboard', component: require('@/views/dashboard/index')}]
    },
    {
        path: '/users',
        component: Layout,
        redirect: '/user/index',
        name: '用户管理',
        icon: 'user',
        meta: {requiresAuth: true},
        children: [
            {path: 'user', component: require('@/views/users/user'), name: '用户列表'},
            {path: 'groups', component: require('@/views/users/usergroups'), name: '用户组列表'},
            {path: 'roles', component: require('@/views/users/roles'), name: '角色列表'},
        ]
    },
    {
        path: '/permissions',
        component: Layout,
        redirect: '/permission/index',
        name: '权限管理',
        icon: 'user',
        meta: {requiresAuth: true},
        children: [
        ]
    },
    {
        path: '/assets',
        component: Layout,
        redirect: '/asset/index',
        name: '主机管理',
        icon: 'server',
        meta: {requiresAuth: true},
        children: [
            {path: 'hosts', component: require('@/views/assets/hosts'), name: '主机列表'},
            {path: 'idcs', component: require('@/views/assets/idcs'), name: 'IDC列表'},
        ]
    },
    {
        path: '/projects',
        component: Layout,
        redirect: '/project/index',
        name: '项目管理',
        icon: 'server',
        meta: {requiresAuth: true},
        children: [
            {path: 'hosts', component: require('@/views/assets/hosts'), name: '主机列表'},
            {path: 'idcs', component: require('@/views/assets/idcs'), name: 'IDC列表'},
        ]
    },
    {
        path: '/ansible',
        component: Layout,
        redirect: '/ansible/index',
        name: 'ansible管理',
        icon: 'leaf',
        meta: {requiresAuth: true},
        children: [
        ]
    },
    {
        path: '/tools',
        component: Layout,
        redirect: '/tool/index',
        name: '工具管理',
        icon: 'cogs',
        meta: {requiresAuth: true},
        children: [
            {path: 'duty', component: require('@/views/tools/duty'), name: '值班交接'},
            {path: 'upload', component: require('@/views/tools/upload'), name: '上传管理'},
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
];

const router = new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes
});

// 设置路由拦截
// 在vue-router的全局钩子中设置拦截
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
router.beforeEach((to, from, next) => {
    // console.log('to=', to.fullPath, '| from=', from.fullPath);
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let userinfo = JSON.parse(localStorage.getItem('userinfo'));
        localStorage.setItem('username', userinfo.name);
        //console.log(userinfo);
        if (userinfo instanceof Object) {
            next();
        } else {
            next({
                path: '/login'
            });
        }
    } else {
        next(); // 确保一定要调用 next()
    }
})

export default router