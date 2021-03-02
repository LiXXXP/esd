'use strict'

let environmentVar = '';
let sparkUrlVar = ''// 接口地址
let basePathVar = ''// history模式下的路径后缀

// environmentVar = '复刻'
environmentVar = '极速'

if(environmentVar === '复刻') {
    sparkUrlVar = 'http://18.166.54.6'
    basePathVar = '/'
} else if(environmentVar === '极速') {
    sparkUrlVar = 'http://18.163.55.183'
    basePathVar = '/'
}

export const sparkUrl = sparkUrlVar
export const environmentType = environmentVar


