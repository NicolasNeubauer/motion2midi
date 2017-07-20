import Vue from 'vue'
import App from './App.vue'

import welcome from './welcome.vue'
import calibrate from './calibrate.vue';
import play from './play.vue';
import notsupported from './notsupported.vue';
import { listenToOrientation } from './mpu.js'
import comms from './comms.js';


Vue.component('welcome', welcome);
Vue.component('calibrate', calibrate);
Vue.component('play', play);
Vue.component('notsupported', notsupported);

Vue.filter('round', value => Math.round(value * 100) / 100);

window.mainApp = new Vue({
  el: '#app',
  render(h) {
      return h(App, {
          props: {
              comms
          }
        });
    }
}).$children[0];

listenToOrientation(
    (x, y) => window.mainApp.updateGravity(x, y),
    (lastOrientation, currentOrientation) => console.log('orientationChange', lastOrientation, currentOrientation),
    1000);
