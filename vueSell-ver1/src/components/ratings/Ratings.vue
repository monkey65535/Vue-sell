<template>
  <div class="ratings" v-el:ratings>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-warpper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-warpper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <!--分隔组件-->
      <split></split>
      <!--选择组件-->
      <rating-selcet :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></rating-selcet>
      <!--评论列表-->
      <div class="rating-warpper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-warpper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import star from '../star/Star';
    import split from '../split/split.vue';
    import ratingSelcet from '../ratingSelect/ratingSelect.vue';
    import {formatDate} from '../../common/js/date.js';
    import BScroll from 'better-scroll';
    const ALL = 2;
    const ERROK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            star,
            split,
            ratingSelcet
        },
        data() {
            return {
                selectType: ALL,
                onlyContent: true,
                ratings: []
            };
        },
        created() {
            this.selectType = ALL;
            this.onlyContent = true;
            // 请求ratings并赋值
            this.$http.get('./api/ratings').then((res) => {
                res = res.body;
                if (res.error === ERROK) {
                    this.ratings = res.data;
                    // 加载betterScroll
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$els.ratings, {
                            click: true
                        });
                    });
                }
            });
        },
        methods: {
          needShow(type, text) {
              if (this.onlyContent && !text) {
                  return false;
              }
              if (this.selectType === ALL) {
                  return true;
              } else {
                  return type === this.selectType;
              }
          }
        },
        filters: {
            formatDate() {
                let date = new Date();
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        events: {
             'ratingtype.select'(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            'content.toggle'(onlyContent) {
                this.onlyContent = onlyContent;
                console.log(this);
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './scss/ratings.scss';

</style>
