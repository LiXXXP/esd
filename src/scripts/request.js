import axios from 'axios'
import { sparkUrl } from './config'
import { Message } from 'element-plus'

const TIMEOUT = 30000 // 设置请求超时时间

// 创建axios实例
const service = axios.create({
    baseURL: sparkUrl, // api 的 base_url
    timeout: TIMEOUT, // request timeout  
    responseType: "json",
    withCredentials: true, // 是否允许带cookie
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'accept': 'application/json',
    }
})

axios.defaults.headers.common["token"] = localStorage.getItem('userToken') || ''

/**
 * 请求拦截器 
 */
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Message.error('数据请求失败，请刷新页面')
        return Promise.reject(err)
    }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功
        if(response.status === 200 && response.data) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(error)
        }
    },
    // http请求状态出错提示,直接返回错误data
    error => {
        Message.error('数据请求失败，请刷新页面')
        return Promise.reject(error)
    }
);

/**
 * get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
function getRequest(url,params={}){
    let fullUrl = sparkUrl + url;
    return new Promise((resolve,reject) => {
        axios.get(fullUrl,{
            params:params
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        });
    });
}

/**
 * post请求
 * @param url
 * @param params
 * @returns {Promise}
 */
function postRequest(url,params={}) {
    let fullUrl = sparkUrl + url
    return new Promise((resolve, reject) => {
        axios.post(fullUrl, params)
        .then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        });
    });
}

/**
 * put请求
 * @param url
 * @param params
 * @returns {Promise}
 */
function putRequest(url,params = {}){
    let fullUrl = sparkUrl + url
    return new Promise((resolve,reject) => {
        axios.put(fullUrl,params)
        .then(response => {
             resolve(response.data)
        },err => {
             reject(err)
        });
    });
}

/**
 *
 * 用户注册
 * @param {*} params
 */
function userRegister(params) {
    return postRequest('/user/register', params)
}

/**
 *
 * 用户登录
 * @param {*} params
 */
function userLogin(params) {
    return postRequest('/user/login', params)
}

/**
 *
 * 用户信息
 * @param {*} params
 */
function userInfo(params) {
    return postRequest('/user/info', params)
}

/**
 *
 * 退出登录
 * @param {*} params
 */
function userLogout(params) {
    return postRequest('/user/logout', params)
}

/**
 *
 * 发送邮件
 * @param {*} params
 */
function mailSend(params) {
    return postRequest('/mail/send', params)
}

/**
 *
 * 近期赛程
 * @param {*} params
 */
function shortMatch(params) {
    return postRequest('/match/short_term_match', params)
}

/**
 *
 * 赛事筛选
 * @param {*} params
 */
function matchScreen(params) {
    return postRequest('/match/match_screen', params)
}

/**
 *
 * 赛事列表
 * @param {*} params
 */
function tournamentList(params) {
    return postRequest('/tournament/tournament_list', params)
}

/**
 *
 * 赛事详情
 * @param {*} params
 */
function tournamentDetail(params) {
    return postRequest('/tournament/tournament_detail', params)
}

/**
 *
 * 战队列表
 * @param {*} params
 */
function teamList(params) {
    return postRequest('/team/team_list', params)
}

/**
 *
 * 战队详情
 * @param {*} params
 */
function teamDetail(params) {
    return postRequest('/team/team_detail', params)
}

/**
 *
 * 比赛详情
 * @param {*} params
 */
function matchDetail(params) {
    return postRequest('/match/match_detail', params)
}

/**
 *
 * battle详情
 * @param {*} params
 */
function battleDetail(params) {
    return postRequest('/battle/battle_detail', params)
}

/**
 *
 * 赛事搜索
 * @param {*} params
 */
function tournamentSearch(params) {
    return postRequest('/tournament/search_info', params)
}

/**
 *
 * 战队搜索
 * @param {*} params
 */
function teamSearch(params) {
    return postRequest('/team/search_info', params)
}

/**
 *
 * 选手搜索
 * @param {*} params
 */
function playerSearch(params) {
    return postRequest('/player/search_info', params)
}

export {
    userRegister,
    userLogin,
    userInfo,
    userLogout,
    mailSend,
    shortMatch,
    matchScreen,
    tournamentList,
    tournamentDetail,
    teamList,
    teamDetail,
    matchDetail,
    battleDetail,
    tournamentSearch,
    teamSearch,
    playerSearch
}

