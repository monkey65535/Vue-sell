<template>
  <div class="sellers">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
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
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-warpper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <!--优惠信息-->
        <ul v-if="Seller.supports" class="supports">
          <li class="supports-item" v-for="item in Seller.supports">
            <span class="icon" :class="classMap[Seller.supports[$index].type]"></span>
            <span class="text">{{Seller.supports[$index].description}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import star from '../star/Star';
    import split from '../split/split.vue';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            star,
            split
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './scss/seller.scss';

</style>
