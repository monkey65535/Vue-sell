<template>
    <div class="cartcontrol">
        <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart" transition="move">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
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
            },
            decreaseCart() {
                if (this.food.count > 0) {
                    this.food.count--;
                } else {
                    this.food.count = 0;
                }
            }
        }
    };
</script>
<style lang="scss" rel="styelsheet/scss">
@import './scss/cartcontrol.scss';
</style>