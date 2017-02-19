<template>
  <div class="food" v-show="showFlag" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper" v-show="food.count && food.count>0">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0" transition="fade">加入购物车</div>
      </div>
      <split></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split v-show="food.info"></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <rating-selcet :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></rating-selcet>
      </div>
      <div class="rating-wrapper">
        <ul v-show="food.ratings && food.ratings.length">
          <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
            </div>
            <div class="time">{{rating.rateTime | formatDate}}</div>
            <p class="text">
              <i :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></i>
              {{rating.text}}
            </p>
          </li>
        </ul>
        <!--<div class="no-rating" show="!food.ratings || !food.ratings.length">暂无评价</div>-->
        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
      </div>
    </div>
  </div>
</template>
<script>
    import Vue from 'vue';
    import BScroll from 'better-scroll';
    import cartcontrol from '../cartcontrol/cartcontrol.vue';
    import split from '../split/split.vue';
    import ratingSelcet from '../ratingSelect/ratingSelect.vue';
    import {formatDate} from '../../common/js/date.js';

    const ALL = 2;
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        methods: {
            show() {
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$els.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            hide() {
                this.showFlag = false;
            },
            addFirst(event) {
                if (!event._constructed) {
                    return;
                }
                this.$dispatch('cart.add', event.target);
                Vue.set(this.food, 'count', 1);
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                console.log(this.selectType, type);
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
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
        },
        components: {
            cartcontrol,
            split,
            ratingSelcet
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "./scss/food.scss";

</style>
