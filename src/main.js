// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Registry from './components/Registry'
import Login from './components/Login'
import Index from './components/Index'
import Owner from './components/Owner'
import Company from './components/Company'
import Police from './components/Police'
import Alert from './components/Alert'
import Cars from './components/Cars'
import Sales from './components/Sales'
import Accidents from './components/Accidents'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)


Vue.directive('rainbow',{
	bind(el,binding,vnode){
		el.style.color="#"+Math.random().toString(16).slice(2,8);
	}
})
Vue.directive('rainboww',{
	bind(el,binding,vnode){
		el.style.background="#"+Math.random().toString(16).slice(2,8);
	}
})


const router=new VueRouter({
	mode:"history",
	base:__dirname,
	routes:[
		{path:"/",component:Index},
		{path:"/registry",component:Registry},
		{path:"/login",component:Login},
		{path:"/owner/:addr",component:Owner},
		{path:"/company/:addr",component:Company},
		{path:"/police/:addr",component:Police},
		{path:"/cars/:addr/:carId",component:Cars},
		{path:"/sales/:id",component:Sales},
		{path:"/accidents/:id",component:Accidents},
	]
})


/* eslint-disable no-new */
new Vue({
	router,
  el: '#app',
  components: { App,Registry,Login,Index,Owner,Company,Police,Alert,Cars,Sales,Accidents },
  template: '<App/>'
})
