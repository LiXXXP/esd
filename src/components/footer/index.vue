<template>
    <div class="footer">
        <div class="top page-content">
            <div class="flex flex_center">
                <div class="block">
                    <div class="title">关于我们</div>
                </div>
                <div class="block">
                    <div class="title">友情链接</div>
                </div>
                <div class="block apis">
                    <div class="title">API</div>
                </div>
                <div class="block email">
                    <div class="title">联系我们</div>
                    <p></p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <p></p>
            <p></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'foot',
    }
</script>

<style lang="less" scoped>
    .footer {
        width: 100%;
        margin-top: 110px;
        background-color: #333;
        .top {
            height: 200px;
            padding: 20px 0;
            color: #CFCFCF;
            font-weight: 500;
            box-sizing: border-box;
            .block {
                width: 300px;
                height: 120px;
                &.apis {
                    width: 150px;
                }
                &.email {
                    width: 200px;
                }
                .title {
                    padding-bottom: 6px;
                    border-bottom: 1px solid #434343;
                }
                .els {
                    width: 100px;
                    height: 31px;
                    padding-top: 20px;
                    padding-right: 50px;
                    display: inline-block;
                }
                .api {
                    width: 53px;
                    height: 40px;
                    padding-top: 20px;
                    display: inline-block;
                }
                p {
                    padding-top: 10px;
                }
            }
        }
        .bottom {
            height: 45px;
            padding-top: 3px;
            color: #878787;
            text-align: center;
            box-sizing: border-box;
            background-color: #262626;
        }
    }
</style>
