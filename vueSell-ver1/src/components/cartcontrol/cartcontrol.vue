<template>
    <div class="cartcontrol">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>
<script>
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            },
            selectFoods: {
                type: Array
            }
        },
        created() {
        },
        methods: {
            addCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                this.$dispatch('cart.add', event.target);
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    };
</script>
<style lang="scss" rel="styelsheet/scss">
@import './scss/cartcontrol.scss';
</style>
