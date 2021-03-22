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
                <div class="block" 
                    v-for="item in tournamentList" 
                    :key="item.tournament_id" 
                    @click="gotoLink(item.tournament_id)">
                    <div class="img flex flex_center">
                        <img :src="item.tournament_image">
                    </div>
                    <p class="beyond-ellipsis" 
                        :title="item.tournament_name"
                    >{{item.tournament_name}}</p>
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
    import { gameList, tournamentList } from "@/scripts/request"

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
                tournamentList: [],
                page: {
                    limit: 9,    // 条数
                    count: 0,    // 总数
                    current: 1   // 当前页
                },
                gameId: undefined
            })

            const router = useRouter()

            const gotoLink = (id) => {
                router.push({
                    path: '/match/detail',
                    query: {
                        tournamentId: id
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

            // 赛事列表
            const getTournamentList = (gameId) => {
                let params = {
                    game_id: gameId,
                    page: listData.page.current,
                    limit: listData.page.limit
                }
                tournamentList(params).then(res => {
                    if(res.code === 200) {
                        listData.tournamentList = res.data.tournament_list
                        listData.page.count = res.data.count
                    }
                })
            }

            const currentPage = (val) => {
                listData.page.current = val
                getTournamentList(listData.gameId)
            }

            const getSelectIds = (gameId,tournamentId,teamId,index,val) => {
                listData.gameId = gameId
                getTournamentList(gameId)
            }

            const getSelectAll = (index) => {
                listData.gameId = undefined
                getTournamentList()
            }

            onMounted(() => {
                getGameList()
                getTournamentList()
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
            margin-top: 50px;
            margin-right: 65px;
            &:nth-child(3n) {
                margin-right: 0;
            }
            .img {
                width: 350px;
                height: 180px;
                border: 1px solid hsl(0deg 0% 71% / 20%);
                img {
                    width: 60%;
                    height: 70%;
                }
            }
            p {
                width: 300px;
                color: #666;
                font-size: 16px;
                text-align: center;
                margin: 20px auto 0;
            }
            &:hover {
                .img {
                    border: 1px solid #B29873;
                }
                p {
                    color: #B29873;
                }
            }
        }
        .page {
            margin-top: 40px;
        }
    }
</style>
