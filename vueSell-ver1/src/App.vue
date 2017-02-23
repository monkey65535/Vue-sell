<template>
  <div>
    <v-header :seller="seller"></v-header>
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
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script>
  import Header from './components/header/Header.vue';
  const ErrOk = 0;
  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then((respones) => {
        respones = respones.body;
      if (respones.error === ErrOk) {
        this.seller = respones.data;
      }
    })
      ;
    },
    components: {
      VHeader: Header
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "./common/sass/index.scss";
</style>
