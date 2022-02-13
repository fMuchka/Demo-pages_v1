import Vue from "vue";
import AOS from "aos"
import "aos/dist/aos.css"

import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/index'

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
    mounted: function(){
        AOS.init()
    }
}).$mount('#app');
