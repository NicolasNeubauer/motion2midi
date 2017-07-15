import Vue from 'vue'
import App from './App.vue'

import welcome from './welcome.vue'
import calibrate from './calibrate.vue';
import play from './play.vue';
import notsupported from './notsupported.vue';


Vue.component('welcome', welcome);
Vue.component('calibrate', calibrate);
Vue.component('play', play);
Vue.component('notsupported', notsupported);

new Vue({
  el: '#app',
  render: h => h(App)
});
