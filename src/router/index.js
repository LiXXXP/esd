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
        },
        component: () => import('@/components/index'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/components/home/index'),
            },
            {
                path: '/match',
                name: 'match',
                component: () => import('@/components/match/index')
            },
            {
                path: '/match/detail',
                name: 'matchDetail',
                component: () => import('@/components/match/detail/detail')
            },
            {
                path: '/match/game',
                name: 'game',
                component: () => import('@/components/match/game/index')
            },
            {
                path: '/mean',
                name: 'mean',
                component: () => import('@/components/mean/index')
            },
            {
                path: '/mean/detail',
                name: 'meanDetail',
                component: () => import('@/components/mean/detail/detail')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'esd',
        },
        component: () => import('@/components/header/login/index')
    },
]

const router = createRouter({
	history: createWebHashHistory(),
    routes
})

// router.beforeEach((to, from, next) => {

// })

export default router
