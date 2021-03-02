// import Router from 'vue-router'
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"

/* 引入公共方法 */
import { environmentType } from '@/scripts/config'

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        meta: {
            title: '首页',
            requireAuth: true
        },
        component: () => import('@/components/index'),
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    requireAuth: true
                },
                component: () => import('@/components/home/index'),
            },
            {
                path: '/match',
                name: 'match',
                meta: {
                    title: '电竞比赛',
                    requireAuth: true
                },
                component: () => import('@/components/match/index')
            },
            {
                path: '/match/detail',
                name: 'matchDetail',
                meta: {
                    title: '赛事详情',
                    requireAuth: true
                },
                component: () => import('@/components/match/detail/detail')
            },
            {
                path: '/match/game',
                name: 'game',
                meta: {
                    title: '比赛详情',
                    requireAuth: true
                },
                component: () => import('@/components/match/game/index')
            },
            {
                path: '/mean',
                name: 'mean',
                meta: {
                    title: '资料库',
                    requireAuth: true
                },
                component: () => import('@/components/mean/index')
            },
            {
                path: '/mean/detail',
                name: 'meanDetail',
                meta: {
                    title: '战队详情',
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
    if(environmentType === '极速') { 
        if (to.matched.some(res => res.meta.requireAuth)) {
            let tmpToken = localStorage.getItem('userToken')
            if (tmpToken) {
                next()
            } else {
                next({
                    path: '/login',
                    redirect:  '/home'
                })
            }
        } else {
            next()
        }
    } else {
        next()
    }

})

export default router
