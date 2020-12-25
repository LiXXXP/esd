// import Router from 'vue-router'
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"

/* 引入公共方法 */
import { BASE_PATH } from '@/scripts/config'

const routes = [
    {
        path: '/',
        name: 'index',
        meta: {
            title: 'esd',
        },
        component: () => import('@/components/index')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: 'esd',
        },
        component: () => import('@/components/header/login/register')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'esd',
        },
        component: () => import('@/components/header/login/login')
    },
]

const router = createRouter({
	history: createWebHashHistory(),
    routes
})

// router.beforeEach((to, from, next) => {

// })

export default router
