<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-warpper">
                    <div class="logo" :class="{heightlight:totalCount>0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="number" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{heightlight:totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliverPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay">￥{{minPrice}}起送</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            deliverPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            selectFoods: {
                type: Array,
                default() {
                    return [{
                        price: 10,
                        count: 1
                    }];
                }
            }
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((e, i) => {
                    total += e.price * e.count;
                });
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((e, i) => {
                    count += e.count;
                });
                return count;
            }
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss">
@import "./scss/shopcart.scss";
</style>