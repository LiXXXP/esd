// import Router from 'vue-router'
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"

/* 引入公共方法 */
import { BASE_PATH } from '@/scripts/config'

const routes = [
    {
        path: '/',
        redirect: '/index',
        name: 'index',
        meta: {
            title: 'esd',
        },
        component: () => import('@/components/index')
    },
]

const router = createRouter({
	history: createWebHashHistory(),
    routes: routes
})

// router.beforeEach((to, from, next) => {

// })

export default router
