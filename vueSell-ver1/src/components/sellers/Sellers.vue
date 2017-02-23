<template>
  <div class="sellers" v-el:seller>
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
        <ul v-if="seller.supports" class="supports">
          <li class="supports-item" v-for="item in seller.supports">
            <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
            <span class="text">{{seller.supports[$index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <!--商家实景-->
      <div class="pics">
          <h1 class="title">商家实景</h1>
          <div class="pic-warpper" v-el:pic-warpper>
              <ul class="pic-list" v-el:pic-list>
                  <li class="pic-item" v-for="pic in seller.pics">
                      <img :src="pic" width="120" height="90" alt="">
                  </li>
              </ul>
          </div>
      </div>
      <split></split>
    </div>
  </div>
</template>

<script>
    import star from '../star/Star';
    import split from '../split/split.vue';
    import BScroll from 'better-scroll';
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
        },
        watch: {
            seller() {
               this._initScroll();
               this._initPics();
            }
        },
        ready() {
            this._initScroll();
            this._initPics();
        },
        methods: {
            _initScroll() {
                if (!this.scroll) {
                     this.scroll = new BScroll(this.$els.seller, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            },
            _initPics() {
                if (this.seller.pics) {
                    let picWidth = 120;
                    let margin = 6;
                    let width = (picWidth + margin) * this.seller.pics.length - margin;
                    this.$els.picList.style.width = width + 'px';
                    this.$nextTick(() => {
                        if (!this.picScroll) {
                            this.picScroll = new BScroll(this.$els.picWarpper, {
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            });
                        } else {
                            this.picScroll.refresh();
                        }
                    });
                }
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './scss/seller.scss';

</style>
