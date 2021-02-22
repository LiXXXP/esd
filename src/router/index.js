// import Router from 'vue-router'
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"

/* 引入公共方法 */
import { BASE_PATH } from '@/scripts/config'

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        meta: {
            title: 'esd',
            requireAuth: true
        },
        component: () => import('@/components/index'),
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    requireAuth: true
                },
                component: () => import('@/components/home/index'),
            },
            {
                path: '/match',
                name: 'match',
                meta: {
                    requireAuth: true
                },
                component: () => import('@/components/match/index')
            },
            {
                path: '/match/detail',
                name: 'matchDetail',
                meta: {
                    requireAuth: true
                },
                component: () => import('@/components/match/detail/detail')
            },
            {
                path: '/match/game',
                name: 'game',
                meta: {
                    requireAuth: true
                },
                component: () => import('@/components/match/game/index')
            },
            {
                path: '/mean',
                name: 'mean',
                meta: {
                    requireAuth: true
                },
                component: () => import('@/components/mean/index')
            },
            {
                path: '/mean/detail',
                name: 'meanDetail',
                meta: {
                    requireAuth: true
                },
                component: () => import('@/components/mean/detail/detail')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '用户登录注册',
        },
        component: () => import('@/components/header/login/index')
    },
]

const router = createRouter({
	history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    /* 设置title */
    if(to.meta.title) {
        document.title = to.meta.title
    }

    // 路由拦截
    if (to.matched.some(res => res.meta.requireAuth)) {
        let tmpToken = localStorage.getItem('userToken')
        if (tmpToken) {
            next()
        } else {
            next({
                path: '/login',     // 未登录则跳转至login页面
                redirect:  '/home' // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
            })
        }
    } else {
        next()
    }

})

export default router
