# 04-vue-demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 7.8完成了login的基本样式  

### 7.11完成了user页的基本部分
#### 内容介绍  
  scoped属性:解决在单页面程序中,不同组件的样式之间的影响 <style lang="scss" scoped></style> 
  - axios优化  
    把axios绑定到vue原型上,以后只需要引入一次axios即可 
  - 设置全局的baseURL地址
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'    
  - 使用请求拦截器优化token传递 
    ```
        // 配置axios的请求拦截器
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      // console.log('请求到了哟', config.headers.Authorization)
      // 统一的给config设置 token
      config.headers.Authorization = localStorage.getItem('token')
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })
```    
  - 使用响应拦截器优化res.data问题  
    ```
          // 添加响应拦截器
      axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        console.log(response)
        return response.data
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
      })
    ```