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
