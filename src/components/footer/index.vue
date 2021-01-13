<template>
    <div class="footer">
        <div class="top page-content">
            <div class="flex flex_center">
                <div class="block">
                    <div class="title">关于我们</div>
                </div>
                <div class="block">
                    <div class="title">友情链接</div>
                    <a href="http://39.106.24.22:8087/#/index" class="els" target="_blank">
                        <img src="../../assets/imgs/footer/els.png">
                    </a>
                    <a href="http://47.95.177.25/#/main" class="api" target="_blank">
                        <img src="../../assets/imgs/footer/api.png">
                    </a>
                </div>
                <div class="block apis">
                    <div class="title">API</div>
                    <p>全部游戏API</p>
                    <p>LOL - API</p>
                    <p>DOTA2 - API</p>
                    <p>CSGO - API</p>
                </div>
                <div class="block email">
                    <div class="title">联系我们</div>
                    <p>邮箱：ahfohapw99@yig.com</p>
                    <p>邮箱：ahfohapw99@yig.com</p>
                    <p>邮箱：ahfohapw99@yig.com</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <p>体育数据版权所有 Copyright © 2002-2020</p>
            <p> 经营许可证： 粤B1.B2-20060628粤ICP备09088851号 粤公网安备 44120202000185号</p>
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
