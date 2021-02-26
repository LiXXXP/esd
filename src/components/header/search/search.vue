<template>
    <div class="search">
        <div class="search-input">
            <input type="text" placeholder="搜索" @click="openSearch">
        </div>
        <div class="search-page" v-if="isShowSearch" @click="openSearch">
            <div class="page" @click.stop>
                <div class="page-input flex flex_only_center">
                    <input type="text" 
                        placeholder="输入 赛事/战队/选手 关键词" 
                        v-model="searchInput" 
                        @keyup.enter="search" 
                        @input="search($event)"
                    >
                    <select v-model="selectVal" @change="getSelected">
                        <option value ="match">赛事</option>
                        <option value ="team">战队</option>
                        <option value="player">选手</option>
                    </select>
                </div>
                <SearchResult @isShow="getIsShow" />
                <Pagination :pageData="page" @currentPage="currentPage" v-if="searchList.length>0"/>
            </div>
        </div>
    </div>
    
</template>

<script>
    import SearchResult from '@/components/header/search/searchResult.vue'   // 搜索结果
    import Pagination from '@/components/common/pagination/pagination.vue' // 分页

    import { tournamentSearch, teamSearch, playerSearch } from "@/scripts/request"
    import { defineComponent, ref, reactive, toRefs, provide } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            let isShowSearch = ref(false)
            const searchData = reactive({
                searchInput: '',
                selectVal: 'match',
                searchList: [],
                page: {
                    limit: 3,    // 条数
                    count: 0,    // 总数
                    current: 1   // 当前页
                },
            })

            const openSearch = () => {
                isShowSearch.value = !isShowSearch.value
                searchData.searchList = []
            }

            const search = (event) => {
                switch (searchData.selectVal) {
                    case 'match':
                        getSearchInfo(searchData.searchInput, tournamentSearch)
                    break
                    case 'team':
                        getSearchInfo(searchData.searchInput, teamSearch)
                    break
                    case 'player':
                        getSearchInfo(searchData.searchInput, playerSearch)
                    break
                    default:
                        searchData.searchList = []
                    break
                }
            }

            const getSelected = () => {
                searchData.searchInput = ''
                searchData.searchList = []
            }

            provide('selectData',searchData)

            const getSearchInfo = ((val, searchName) => {
                let params = {
                    search_info: val,
                    page: searchData.page.current,
                    limit: searchData.page.limit
                }
                searchName(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            switch (searchData.selectVal) {
                                case 'match':
                                    searchData.searchList = res.data.match_list
                                break
                                case 'team':
                                    searchData.searchList = res.data.team_list
                                break
                                case 'player':
                                    searchData.searchList = res.data.player_list
                                break
                                default:
                                break
                            }
                            searchData.page.count = res.data.count
                        } else {
                            searchData.searchList = []
                        }
                    }
                })
            })

            const currentPage = (val) => {
                searchData.page.current = val
                search()
            }

            const getIsShow = (val) => {
                isShowSearch.value = val
            }

            return {
                isShowSearch,
                ...toRefs(searchData),
                openSearch,
                search,
                getSelected,
                getSearchInfo,
                currentPage,
                getIsShow
            }
        },
        components: {
            SearchResult,
            Pagination
        }
    })
</script>

<style lang="less" scoped>
    .search {
        .search-input {
            input {
                width: 180px;
                height: 25px;
                color: #fff;
                cursor: pointer;
                padding: 0 10px;
                border-radius: 13px;
                box-sizing: border-box;
                background: url('../../../assets/imgs/search.png') no-repeat 90% center #555;
            }
        }
        .search-page {
            width: 100%;
            height: 100%;
            z-index: 99999;
            font-size: 18px;
            padding: 80px 0;
            box-sizing: border-box;
            transition: opacity .3s;
            background-color: rgba(0,0,0, .85);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            .page {
                width: 800px;
                margin: 0 auto;
                .page-input {
                    input {
                        width: 650px;
                        height: 55px;
                        color: #333;
                        padding: 0 20px;
                        font-size: 18px;
                        font-weight: 500;
                        line-height: 55px;
                        box-sizing: border-box;
                        background-color: #fff;
                        border-radius: 2px 0 0 2px;
                    }
                    select {
                        width: 150px;
                        height: 55px;
                        color: #fff;
                        font-size: 18px;
                        font-weight: 500;
                        line-height: 55px;
                        cursor: pointer;
                        text-align: center;
                        text-align-last: center;
                        border-radius: 0 2px 2px 0;
                        background: url('../../../assets/imgs/sj.png') no-repeat 70% center #B29873;
                        option {
                            color: #666;
                            cursor: pointer;
                            padding: 10px 0;
                            background-color: #fff;
                        }
                    }
                }
            }
        }
    }
</style>