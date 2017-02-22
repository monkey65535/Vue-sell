<template>
    <div class="sellers">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">{{seller.sellCount}}</span>
                </div>
                <div class="remark">
                    <div class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <div class="stress">{{seller.minPrice}}</div>
                        </div>
                    </div>
                    <div class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <div class="stress">{{seller.deliveryPrice}}</div>
                        </div>
                    </div>
                    <div class="block">
                        <h2>平均配送事件</h2>
                        <div class="content">
                            <div class="stress">{{seller.deliveryTime}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import star from '../star/Star';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            star
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
@import './scss/seller.scss';
</style>