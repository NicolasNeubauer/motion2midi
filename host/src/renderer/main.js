import Vue from 'vue';
import axios from 'axios';

import midi from 'midi';

import { ipcRenderer } from 'electron'; // native electron module remote,

import App from './App';
import router from './router';
import store from './store';
// const { ipcRenderer } = require('electron')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;


function midiTest() {
    const output = new midi.output();
    output.getPortCount();
    for (let i = 0; i < output.getPortCount(); i += 1) {
        console.log(output.getPortName(i));
    }
    output.closePort();
}

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
}).$mount('#app');


midiTest();

ipcRenderer.on('accessed', (event, arg) => {
    console.log(event, arg);
});

ipcRenderer.on('midi', (event, arg) => {
    console.log(event, arg);
});
