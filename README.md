# Vue-sell
## 慕课网Vue.js实战

目前项目版本：  

 - Vue.js@1.2.7
 - Vue-router
 - Vue-resource
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