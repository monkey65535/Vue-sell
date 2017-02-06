<template>
  <div class="header">
    <div class="content-warpper">
      <!--商户头像-->
      <div class="avatar">
        <img :src="Seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <!--商品名称-->
        <div class="title">
          <span class="brand"></span>
          <strong class="name">{{Seller.name}}</strong>
        </div>
        <!--派送信息-->
        <div class="description">
          {{Seller.description}}/{{Seller.deliveryTime}}分钟送达
        </div>
        <!--第一条优惠信息-->
        <div v-if="Seller.supports" class="supports">
          <span class="icon" :class="classMap[Seller.supports[0].type]"></span>
          <span class="text">{{Seller.supports[0].description}}</span>
        </div>
      </div>
      <!--优惠信息-->
      <div v-if="Seller.supports" class="support-content" @click="showDetial">
        <span>{{Seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--公告信息-->
    <div class="bulletin-warpper" @click="showDetial">
      <span class="bulletin-title"></span><span class="bulletin-text">{{Seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--遮罩背景-->
    <div class="background">
      <img :src="Seller.avatar" alt="" width="100%" height="100%">
    </div>
    <!--优惠信息遮罩层-->
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-warpper clearfix">
        <div class="detail-main">
          <h1 class="name">{{Seller.name}}</h1>
          <!--star组件-->
          <div class="star-wapper">
            <v-star :size="48" :score="Seller.score"></v-star>
          </div>
          <!--优惠信息title-->
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <!--优惠信息-->
          <ul v-if="Seller.supports" class="supports">
              <li class="supports-item" v-for="item in Seller.supports">
                  <span class="icon" :class="classMap[Seller.supports[$index].type]"></span>
                  <span class="text">{{Seller.supports[$index].description}}</span>
              </li>
          </ul>
          <!--商家公告title-->
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <!--商家公告-->
          <div class="bulletin">
              <p class="content">{{Seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <!--关闭-->
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
    import VStar from '../star/Star.vue';
    export default {
        props: {
            Seller: {
                type: Object
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        data () {
            return {
                detailShow: false
            };
        },
        methods: {
            showDetial () {
                this.detailShow = true;
            },
            hideDetail () {
                this.detailShow = false;
            }
        },
        components: {
            VStar
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "./sass/header.scss";

</style>
