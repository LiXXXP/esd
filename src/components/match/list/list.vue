<template>
    <div class="list">
        <div class="page-content">
            <Breadcrumb />
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
    import Breadcrumb from '@/components/common/breadcrumb/breadcrumb.vue'    // 面包屑导航
    import Pagination from '@/components/common/pagination/pagination.vue'    // 分页
    import { tournamentList } from "@/scripts/request"
    import { useRouter } from "vue-router"
    import { defineComponent, reactive, toRefs, onMounted } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const listData = reactive({
                tournamentList: [],
                page: {
                    limit: 9,    // 条数
                    count: 0,    // 总数
                    current: 1   // 当前页
                }
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
            const getTournamentList = () => {
                let params = {
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
                getTournamentList()
            }
            onMounted(() => {
                getTournamentList()
            })
            return {
                ...toRefs(listData),
                gotoLink,
                currentPage
            }
        },
        components: {
            Breadcrumb,
            Pagination
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
