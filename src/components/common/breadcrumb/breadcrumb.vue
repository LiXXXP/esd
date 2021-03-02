<template>
    <div class="breadcrumb page-content">
        <div class="flex flex_start flex_only_center">
            <div v-for="(item,index) in linkList" :key="item.meta.title" class="item">
                <p class="link" v-if="index === linkList.length - 1">{{item.meta.title}}</p>
                <router-link :to="item.path" class="link" v-else>{{item.meta.title}}</router-link>
                <span v-if="index !== linkList.length - 1">-</span>
            </div>
        </div>
    </div>
</template>

<script>

    import { useRoute } from "vue-router"
    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const route = useRoute()
            const linkData = reactive({
                linkList: route.matched
            })
            return {
                ...toRefs(linkData)
            }
        }
    })
</script>

<style lang="less" scoped>
    .breadcrumb {
        padding: 15px 0;
        .item {
            .link {
                color: #333;
                font-size: 16px;
                cursor: pointer;
            }
            span {
                padding: 0 3px;
            }
            &:last-child {
                .link {
                    color: #B29873;
                }
            }
        }
    }
</style>
