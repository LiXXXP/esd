<template>
    <div class="list">
        <div class="page-content">
            <Breadcrumb />
            <SelectView 
                :size="'max'"
                style="margin-top:20px"
                @getSelectIds="getSelectIds"
                @getSelectAll="getSelectAll"
            />
            <div class="flex flex_only_center flex_wrap">
                <div class="block flex flex_column flex_center" 
                    v-for="item in teamList" :key="item.team_id" @click="gotoLink(item.team_id)">
                    <img :src="item.team_image">
                    <p class="beyond-ellipsis"
                        :title="item.team_name"
                    >{{item.team_name}}</p>
                </div>
            </div>
            <Pagination 
                class="page" 
                :pageData="page"
                @currentPage="currentPage" 
            />
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, provide, onMounted } from 'vue'
    import { useRouter } from "vue-router"
    import { gameList, teamList } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {
            const listData = reactive({
                selectList: [
                    {
                        placeholder: '游戏',
                        selectValue: '',
                        list: []
                    }
                ],
                teamList: [],
                page: {
                    limit: 12,    // 条数
                    count: 0,    // 总数
                    current: 1   // 当前页
                },
                gameId: 0
            })

            const router = useRouter()
            const gotoLink = (id) => {
                router.push({
                    path: '/mean/detail',
                    query: {
                        teamId: id
                    }
                })
            }

            // 游戏列表
            const getGameList = (() => {
                gameList().then(res => {
                    if(res.code === 200) {
                        listData.selectList[0].list = res.data
                    }
                })
            })

            const getTeamList = (gameId) => {
                let params = {
                    game_id: gameId,
                    page: listData.page.current,
                    limit: listData.page.limit
                }
                teamList(params).then(res => {
                    if(res.code === 200) {
                        listData.teamList = res.data.team_list
                        listData.page.count = res.data.count
                    }
                })
            }

            const currentPage = (val) => {
                listData.page.current = val
                getTeamList(listData.gameId)
            }

            const getSelectIds = (gameId,tournamentId,teamId,index,val) => {
                getTeamList(gameId)
                listData.gameId = gameId
            }

            const getSelectAll = (index) => {
                getTeamList()
                listData.gameId = undefined
            }

            onMounted(() => {
                getGameList()
                getTeamList()
            })

            provide('selectData', listData)

            return {
                ...toRefs(listData),
                gotoLink,
                currentPage,
                getSelectIds,
                getSelectAll
            }
        },
        components: {
            Breadcrumb: defineAsyncComponent(() => import('@/components/common/breadcrumb/breadcrumb')), // 面包屑导航
            Pagination: defineAsyncComponent(() => import('@/components/common/pagination/pagination')), // 分页
            SelectView: defineAsyncComponent(() => import('@/components/common/select/select')),         // 下拉框
        }
    })
</script>

<style lang="less" scoped>
    .list {
        .block {
            cursor: pointer;
            width: 270px;
            height: 170px;
            margin-top: 45px;
            margin-right: 37px;
            box-sizing: border-box;
            background-color: #ECEEF1;
            border: 1px solid hsl(0deg 0% 71% / 20%);
            &:hover {
                box-shadow: 0 0 5px 5px hsl(0deg 0% 71% / 20%);
            }
            &:nth-child(4n) {
                margin-right: 0;
            }
            img {
                width: 115px;
                height: 70px;
                margin: 15px 0;
            }
            p {
                width: 220px;
                color: #999;
                font-size: 24px;
                margin: 0 auto;
                text-align: center;
            }
        }
        .page {
            margin-top: 40px;
        }
    }
</style>
