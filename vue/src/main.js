import Vue from "vue";
import './styles/index.less';
import VueRouter from "vue-router";
import router from "./router";
import App from './App'
import './auth'
import './styles/font-awesome/font-awesome.less'
Vue.use(VueRouter);
new Vue({
  el:'#vue-app',
  router,
  render:(h)=>h(App)
})

/*
* Vue 支持热更新
* css 内容替换自动生效，不需要处理
* 需要处理的是没有走vue的一些东西
* */
if (module.hot) {
  module.hot.accept(['./auth','./router'],()=>{
    location.reload()
  })
  module.hot.accept(  )

}

/*
* 此处未import jquery 但是可以直接使用$
* console.log($,1);  这是因为使用了 ProvidePlugin
* */
// import _$ from 'jquery'
function f(){
  console.log('sdfsdfsfsdfsdfsdfsdf');
  console.log(1,_$,1);
}
f()
import ('./asyncModule')
import moment from 'moment'
import 'moment/locale/zh-cn';// 手动引入

