# Vue-sell
## 慕课网Vue.js实战

目前项目版本：  

 - Vue.js@1.2.7
 - Vue-router@0.7.13
 - Vue-resource@1.0.1
 - EcmaScript6
 - balel
 - EsLint
 - webpack@1.0
 - sass  

在build文件夹下的`dev-server.js`中，基于express进行了数据mock  
```
var app = express();

// 使用express转发mooc数据
// 加载data.json
var appData = require('../data/data.json');
// 定义各个变量
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
// 编写路由
var apiRoutes = express.Router();
// 定义返回参数
apiRoutes.get('/seller', function (req, res) {
  res.json({
    error: 0,
    data: seller
  });
});
apiRoutes.get('/goods', function (req, res) {
  res.json({
    error: 0,
    data: goods
  });
});
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    error: 0,
    data: ratings
  });
});
// 定义接口
app.use('/api', apiRoutes);

// end
```

 ## 遇到的问题  
 默认的EsLint配置是不允许添加分号的，但是我们平时的书写习惯是添加分号，如何配置？  

 打开`eslintrc.js`,在rule下添加一条
 ```
 'semi': ['error', 'always']
 ```  
 就可以了。  

 关于缩进报错，如果想修改缩进配置，需要打开`eslintrc.js`,在rule下添加一条  
 ```
 'indent': 0
 ```  
 如果有一段代码不想使用Eslint来检查格式，那么使用这段注释：
 ```
 /* eslint-disable no-new */
 ```  
 就可以达成目的了。  

 ## vue-resource的坑
 在使用Vue-resource请求的过程是一个异步过程，组件最开始传递的数据是一个空对象，所以要进行一些处理
  - 图片地址需要使用`v-bind`来绑定`src`，否则控制台会报错
  - 遍历数据需要使用`v-if`来做一次判断，否则控制台会报错  

## vue和原生JS插件做交互的注意事项:
  - 可以使用`v-el`来绑定元素，绑定之后可以使用Vue实例的`$els`方法去访问，可以获取到一个原生DOM节点  
  - DOM渲染之后会执行`$nextTick()`方法，所以我们有必要将对DOM的操作写入这个方法中，从而保证我们执行的DOM操作一定是在DOM渲染完成之后。  

## Vue的一些注意事项
 - 在Vue中，不支持直接对传入的对象参数添加一个`key`,我们需要使用Vue内置的`set`方法来实现  
```
Vue.set('ObjcteName','key','value');
Vue.set(this.food,'count',1);
``` 
-在Vue中，一般情况下父子组件间的通信是单向数据流，但是我们可以用父组件向子组件传入一个引用类型数据（一般为一个对象）这种黑科技方法实现双向数据流，但是这种方法容易造成数据的混乱，所以不推荐大量使用。如果有需要，请使用`vuex`  

