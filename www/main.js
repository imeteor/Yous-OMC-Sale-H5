
/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import App from './app.vue';
import $ from 'jquery';
import MintUI from 'mint-ui';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);


//Vue.prototype.$api = "http://192.168.137.54:8081" //api地址
/*Vue.prototype.$api = "http://wx.urskongjian.com:8080" //api地址*/
//Vue.prototype.$api = "http://omc.urskongjian.com" //api地址可以随意改
//Vue.prototype.$api = "http://192.168.0.222:8080" //api地址
Vue.prototype.$prefix = "http://116.62.68.26:81" //图片前缀222
/*Vue.prototype.$export = "http://wx.urskongjian.com:8080" //*/
//Vue.prototype.$export = "http://omc.urskongjian.com" //可以随意改

const api = "http://omc.urskongjian.com/yhcms/web/jcsj/userAuth.do";
const FollowInfo = () => { return axios.post(api, {})};

/*
Vue.prototype.$prefix = "http://116.62.68.26:81" //图片前缀
*/

// 测试环境
//Vue.prototype.$api = "http://192.168.0.222:8080" //api地址
//Vue.prototype.$export = "http://192.168.0.222:8080" //图片前缀

// 生产环境
Vue.prototype.$api = "http://omc.urskongjian.com" //api地址
Vue.prototype.$export = "http://omc.urskongjian.com" //导出

//Vue.config.debug = true;// 开启debug模式
Vue.config.debug = true;// 开启debug模式

var router = new VueRouter({
    mode: "hash",
    hashbang: false,
    routes: [
        {
            path: '/list',
            component: require('./routers/list.vue')
        },
        {
          path: '/filter',
          component: require('./routers/search.vue'),
        },
        {
            path: '/detail',
            component: require('./routers/detail.vue')
        },
        {
            path: '/house',
            component: require('./routers/house.vue')
        },
        {
            path: '/order',
            component: require('./routers/order.vue')
        },
        {
            path: '/select',
            component: require('./routers/select.vue')
        },
        {
            path: '/error',
            component: require('./routers/error.vue')
        },
        {
            path: '*',
            component: require('./routers/list.vue')
        },
        {
            path: '/test',
            component: require('./routers/test.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.path === '/error'){
        next();
    }
    else{
        FollowInfo().then((res)=>{
            const subscribed = res.data.subscribe;
            if(subscribed == 1){
                next();
            }else{
                window.location = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0NjY4ODM5OQ==#wechat_redirect';
            }
        }).catch((err)=>{
            // 出错了
            //window.location = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0NjY4ODM5OQ==#wechat_redirect';
            localStorage.setItem("error", err.toString());
            next({path:'/error'});
        });
    }
});

new Vue({
    el: '#app',
    router: router,
    render: function (h) {
        return h(App)
    }
});
