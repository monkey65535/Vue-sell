<template>
  <div class="goods-warpper">
    <!--上层商品列表-->
    <div class="goods">
      <!--左侧菜单-->
      <div class="menu-warpper" v-el:menu-warpper>
        <ul>
          <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex === $index}" @click="slectMenu($index,$event)">
            <span class="text">
                <i v-show="item.type>0" class="icon" :class="classMap[item.type]"></i>
                {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧食物-->
      <div class="foods-warpper" v-el:food-warpper>
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
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
                  <div class="cartcontrol-warpper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--底部购物车组件-->
    <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
  <food :food="selectedFood" v-ref:food></food>
</template>
<script>
    import BScroll from 'better-scroll';
    import shopcart from '../shopcart/ShopCart.vue';
    import cartcontrol from '../cartcontrol/cartcontrol.vue';
    import food from '../food/food.vue';
    const ERR_OK = 0;
    export default {
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            shopcart,
            cartcontrol,
            food
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('/api/goods').then((response) => {
               let res = response.body;
               if (res.error === ERR_OK) {
                   this.goods = res.data;
                    //    DOM更新完成
                   this.$nextTick(() => {
                    //    调用betterScroll
                       this._initScroll();
                    //    计算高度
                        this._calculateHeight();
                   });
               }
            });
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                        foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        methods: {
            _initScroll() {
                // 初始化BetterScroll
                this.meunScroll = new BScroll(this.$els.menuWarpper, {
                    click: true
                });

                this.foodScroll = new BScroll(this.$els.foodWarpper, {
                    click: true,
                    probeType: 3
                });
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight() {
                let foodList = this.$els.foodWarpper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            slectMenu(index, event) {
                if (!event._constructed) {
                    return false;
                }
                let foodList = this.$els.foodWarpper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodScroll.scrollToElement(el, 300);
            },
            _drop(target) {
                // 异步执行 dom重绘完成执行动画，优化体验
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(target);
                });
            },
            selectFood(food, event) {
                if (!event._constructed) {
                    return false;
                }
                this.selectedFood = food;
                this.$refs.food.show();
            }
        },
        events: {
            'cart.add'(target) {
                this._drop(target);
            }
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "./scss/goods.scss";

</style>
