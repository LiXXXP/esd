<template>
    <div class="detail">
        <Breadcrumb />
        <TeamDetail />
        <div class="page-content">
            <TitleLine :titleName="playerName" />
            <PlayerDetail />
            <TitleLine :titleName="teamName" />
            <TeamEvent :className="'mean'" />
            <TitleLine :titleName="matchName" />
            <AllEvent :className="'mean'" />
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb/breadcrumb.vue'    // 面包屑导航
    import TeamDetail from '@/components/mean/detail/teamDetail.vue'          // 战队详情
    import TitleLine from '@/components/common/title/titleLine.vue'               // 页面标题
    import PlayerDetail from '@/components/mean/detail/playerDetail.vue'      // 现役成员
    import TeamEvent from '@/components/home/events/datas/tableEvent.vue'     // 战队数据
    import AllEvent from '@/components/home/events/all/tableEvent.vue'        // 近期赛事

    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
             const titleName = reactive({
                playerName: '现役成员',
                teamName: '战队数据',
                matchName: '近期赛事'
             })
            return {
                ...toRefs(titleName)
            }
        },
        components: {
            Breadcrumb,
            TeamDetail,
            TitleLine,
            PlayerDetail,
            TeamEvent,
            AllEvent
        }
    })
</script>

<style lang="less" scoped>
    .detail {

    }
</style>
