<template>
  <div class="shopcart">
    <div class="content" @click.stop.prevent="toggleList">
      <div class="content-left">
        <div class="logo-warpper">
          <div class="logo" :class="{'heightlight':totalCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="number" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'heightlight':totalCount>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls" transition="drop" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
      </div>
    </div>

    <div class="shopcart-list" v-show="listShow" transition="fold">
        <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click.stop.prevent="empty">清空</span>
        </div>
        <div class="list-content" v-el:list-content>
            <ul>
                <li class="food" v-for="food in selectFoods">
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                        <span>￥{{food.price*food.count}}</span>
                    </div>
                    <div class="cartcontrol-warpper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </div>
  <div class="list-mask" v-show="listShow" transition="fade" @click="foldHide"></div>
</template>
<script>
    import BScroll from 'better-scroll';
    import cartcontrol from '../cartcontrol/cartcontrol.vue';
    export default {
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return [];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                balls: [{
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                }],
                dropBalls: [],
                fold: true
            };
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            payClass() {
                if (this.totalPrice < this.minPrice) {
                    return '';
                } else {
                    return 'enough';
                }
            },
            listShow() {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$els.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        },
        methods: {
            drop(el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            toggleList() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            foldHide() {
                this.fold = true;
            },
            pay() {
                if (this.totalPrice < this.minPrice) {
                    return;
                }
                window.alert(`支付${this.totalPrice}元`);
            }
        },
        transitions: {
            drop: {
                beforeEnter(el) {
                    let count = this.balls.length;
                    while (count--) {
                        let ball = this.balls[count];
                        if (ball.show) {
                            // 获取元素相对于视口的一个位置
                            let rect = ball.el.getBoundingClientRect();
                            let x = rect.left - 32;
                            let y = -(window.innerHeight - rect.top - 22);
                            el.style.display = '';
                            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                            el.style.transform = `translate3d(0,${y}px,0)`;
                            let inner = el.getElementsByClassName('inner-hook')[0];
                            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                            inner.style.transform = `translate3d(${x}px,0,0)`;
                        }
                    }
                },
                enter(el) {
                    // 触发浏览器重绘
                     /* eslint-disable no-unused-vars */
                    let re = el.offsetHeight;
                    this.$nextTick(() => {
                        el.style.webkitTransform = 'translate3d(0,0,0)';
                        el.style.transform = 'translate3d(0,0,0)';
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = 'translate3d(0,0,0)';
                        inner.style.transform = 'translate3d(0,0,0)';
                    });
                },
                afterEnter(el) {
                    let ball = this.dropBalls.shift();
                    if (ball) {
                        ball.show = false;
                        el.style.display = 'none';
                    }
                }
            }
        },
        components: {
            cartcontrol
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "./scss/shopcart.scss";

</style>
