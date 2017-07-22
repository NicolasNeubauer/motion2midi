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


const Midi = {
    output: null,

    setup(name) {
        this.output = new midi.output();
        let success = false;
        const max = this.output.getPortCount();
        for (let i = 0; i < max; i += 1) {
            if (this.output.getPortName(i).startsWith(name)) {
                this.output.openPort(i);
                success = true;
                break;
            }
        }
        if (!success) {
            console.error(`did not find MIDI channel with name starting with ${name}`);
        }
    },

    sendFader(value, control) {
        console.log('sending MIDI message 176, ', value, control);
        this.output.sendMessage([176, control, value]);
    },

    close() {
        this.output.closePort();
    },

};


/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
}).$mount('#app');

ipcRenderer.on('accessed', (event, arg) => {
    console.log(event, arg);
});

const lastFaders = {};

function getControl(clientId, channel) {
    return (clientId * 2) + channel;
}

Midi.setup('asd');

ipcRenderer.on('midi_fader', (event, arg) => {
    let { channel, value, clientId } = arg;
    channel = { x: 0, y: 1 }[channel];
    value = parseInt(value, 10);
    clientId = parseInt(clientId, 10);
    console.log(arg);
    console.log(channel, value, clientId);
    if (lastFaders[clientId] === undefined) {
        lastFaders[clientId] = {};
    }
    if (lastFaders[clientId][channel] !== value) {
        lastFaders[clientId][channel] = value;
        Midi.sendFader(value, getControl(clientId, channel));
    }
    console.log(event, arg);
});
