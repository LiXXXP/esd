<template>
    <div class="search">
        <div class="search-input">
            <input type="text" placeholder="搜索" @click="openSearch">
        </div>
        <div class="search-page" v-if="isShowSearch" @click="openSearch">
            <div class="page" @click.stop>
                <div class="page-input flex flex_center">
                    <input type="text" placeholder="输入搜索内容">
                    <select>
                        <option value ="volvo">赛事</option>
                        <option value ="saab">战队</option>
                        <option value="opel">选手</option>
                    </select>
                </div>
                <SearchResult />
            </div>
        </div>
    </div>
    
</template>

<script>
    import SearchResult from '@/components/header/search/searchResult.vue'   // 搜索结果

    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        setup(props,ctx) {
            let isShowSearch = ref(false)
            const openSearch = () => {
                isShowSearch.value = !isShowSearch.value
            }
            return {
                isShowSearch,
                openSearch
            }
        },
        components: {
            SearchResult
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
                padding: 0 10px;
                border-radius: 13px;
                box-sizing: border-box;
                background-color: #555555;
            }
        }
        .search-page {
            width: 100%;
            height: 100%;
            z-index: 999;
            font-size: 18px;
            padding: 200px 0;
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
                        background: url("") no-repeat right center #B29873;
                        option {
                            cursor: pointer;
                            padding: 10px 0;
                        }
                    }
                }
            }
        }
    }
</style>