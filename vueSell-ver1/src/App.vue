<template>
  <div>
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <!--路由显示切换区域-->
    <router-view></router-view>
  </div>
</template>
<script>
import Header from './components/header/Header.vue';

export default {
  data () {
    return {
      seller: {}
    };
  },
  components: {
    VHeader: Header
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "./common/sass/index.scss";
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item {
      flex: 1;
      text-align: center;
      a{
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.v-link-active{
          color: rgb(240, 20, 20);
          font-size:14px;
        }
      }
    }
  }
</style>
