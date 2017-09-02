import Vue from 'vue';
import Vuex from 'vuex';
import uuid from 'uuid/v4';

// import modules from './modules';

Vue.use(Vuex);

const state = {
    clients: [],
    clientsById: {},
};

const getters = {
    clients: state => state.clients,
};

const mutations = {
    addClient(state, client) {
        state.clients.push(client);
        state.clientsById[client.id] = client;
    },
};

const actions = {
    newClient(context, { req, callback }) {
        const newClient = {
            name: `Client ${state.clients.length + 1} - ${req.headers['user-agent']}`,
            isActive: false,
            ui: null,
            data: {
                x: [],
                y: [],
            },
            id: uuid(),
        };
        context.commit('addClient', newClient);
        callback(newClient);
    },
    setClientActive(context, { id, status }) {
        context.commit('setClientActive', { id, status });
    },
    setClientUI(context, { id, ui }) {
        context.commit('setClientUI', { id, ui });
    },
    removeClient(context, { id }) {
        context.commit('removeClient', { id });
    },
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    // modules,
    strict: process.env.NODE_ENV !== 'production',
});
