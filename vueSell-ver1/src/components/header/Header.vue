<template>
    <div class="header">
        <div class="content-warpper">
            <div class="avatar">
                <img :src="Seller.avatar" alt="" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <strong class="name">{{Seller.name}}</strong>
                </div>
                <div class="description">
                    {{Seller.description}}/{{Seller.deliveryTime}}分钟送达
                </div>
                <div v-if="Seller.supports" class="supports">
                    <span class="icon" :class="classMap[Seller.supports[0].type]"></span>
                    <span class="text">{{Seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="Seller.supports" class="support-content">
                <span>{{Seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-warpper"></div>
    </div>
</template>

<script>
    export default {
        props: {
            Seller: {
                type: Object
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
   @import "./sass/header.scss";
</style>