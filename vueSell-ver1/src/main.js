import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// 引用组件
import Goods from './components/goods/Goods.vue';
import Ratings from './components/ratings/Ratings.vue';
import Sellers from './components/sellers/Sellers.vue';

// 调用vue-router
Vue.use(VueRouter);
Vue.use(VueResource);
// 声明一个根组件
const app = Vue.extend(App);
// 创建Vue实例
const router = new VueRouter();
// 定义路由
router.map({
  '/goods': {
    component: Goods
  },
  '/ratings': {
    component: Ratings
  },
  '/seller': {
    component: Sellers
  }
});
// 配置默认页面
// router.redirect({
//   '/': '/goods'
// });
// 启动路由
router.start(app, '#app');
// 另外一种配置默认页面的方法：
router.go('/goods');
