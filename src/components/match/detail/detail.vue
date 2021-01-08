<template>
    <div class="detail">
        <div class="page-content">
            <Breadcrumb />
            <MatchDetail />
            <TitleView :titleName="teamName" />
            <PlayerEvent :isText="false" />
            <TitleView :titleName="matchName" />
            <div class="tab flex flex_center">
                <p class="active">预选赛</p>
                <p>淘汰赛</p>
            </div>
            <AllEvent :className="'mean'" />
            <OutDetail />
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb/breadcrumb.vue'    // 面包屑导航
    import MatchDetail from '@/components/match/detail/matchDetail.vue'       // 比赛详情
    import TitleView from '@/components/common/title/title.vue'               // 页面标题
    import PlayerEvent from '@/components/home/events/datas/playerEvent.vue'  // 选手数据
    import AllEvent from '@/components/home/events/all/tableEvent.vue'        // 近期赛事
    import OutDetail from '@/components/match/detail/outDetail.vue'           // 淘汰赛

    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
             const titleName = reactive({
                teamName: '参赛队伍',
                matchName: '焦点赛事'
             })
            return {
                ...toRefs(titleName)
            }
        },
        components: {
            Breadcrumb,
            MatchDetail,
            TitleView,
            PlayerEvent,
            AllEvent,
            OutDetail
        }
    })
</script>

<style lang="less" scoped>
    .detail {
        .tab {
            font-size: 18px;
            font-weight: 600;
            line-height: 28px;
            p {
                cursor: pointer;
                padding: 0 105px 15px;
                &.active {
                    color: #B29873;
                }
            }
        }
    }
</style>
