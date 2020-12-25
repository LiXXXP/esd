import { createStore } from 'vuex'

import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

//创建VueX对象
export default createStore({
    state,
    actions,
    getters,
    mutations
})