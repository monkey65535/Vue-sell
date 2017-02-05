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
  components: {
    VHeader: Header
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
      a{
        display: block;
      }
    }
  }

</style>
