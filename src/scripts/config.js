'use strict'

let environmentVar = '';
let sparkUrlVar = ''// 接口地址
let basePathVar = ''// history模式下的路径后缀

// environmentVar = '复刻'
environmentVar = '极速'

if(environmentVar === '复刻') {
    sparkUrlVar = 'https://sapi.esport.beer'
    basePathVar = '/'
} else if(environmentVar === '极速') {
    sparkUrlVar = 'http://tools.esport.beer'
    basePathVar = '/'
}

export const sparkUrl = sparkUrlVar
export const environmentType = environmentVar


