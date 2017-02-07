<template>
    <div class="goods">
        <div class="menu-warpper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <span class="text">
                        <i v-show="item.type>0" class="icon" :class="classMap[item.type]"></i>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-warpper">
            <ul>
                <li v-for="item in goods" class="food-list">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="icon">
                                <img :src="food.icon" alt="" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <div class="desc">{{food.description}}</div>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}</span>
                                    <span>好评率{{food.rating}}</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-if="food.oldPrice">{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    const ERR_OK = 0;
    export default {
        data() {
            return {
                goods: []
            };
        },
        props: {
            seller: {
                type: Object
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('/api/goods').then((response) => {
               let res = response.body;
               if (res.error === ERR_OK) {
                   this.goods = res.data;
               }
            });
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
@import "./scss/goods.scss";
</style>