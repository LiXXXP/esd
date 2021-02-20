<template>
    <div class="breadcrumb page-content">
        <div class="flex flex_start flex_only_center">
            <div v-for="item in breadLink" :key="item.title" class="item">
                <router-link :to="item.link" class="link">{{item.title}}</router-link>
                <span>-</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            breadLink: {
                type: Array,
                default: () => []
            }
        },
        setup(props,ctx) {
            return {
                
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
            }
            span {
                padding: 0 3px;
            }
            &:last-child {
                .link {
                    color: #B29873;
                }
                span {
                    display: none;
                }
            }
        }
    }
</style>
