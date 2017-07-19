import Vue from 'vue'
import App from './App.vue'

import welcome from './welcome.vue'
import calibrate from './calibrate.vue';
import play from './play.vue';
import notsupported from './notsupported.vue';



const comms = {
    id: null,

    x: function(value) {
        console.log('x', value);
    },

    y: function(value) {
        console.log('y', value);
    },

    getID: function(callback) {
        console.log('getting ID', callback);
      var that = this;
      $.ajax({
        url: 'id.json',
        method: 'GET'
      }).then(function (response) {
        if(response.error) {
          console.err("There was an error " + response.error);
        } else {
          callback(response.id);
        }
      }).catch(function (err) {
        console.error(err);
      });
    }

/*
    methods: {
        getPosts: function() {
          var that = this
          $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET'
          }).then(function (response) {
            if(response.error) {
              console.err("There was an error " + response.error);
            } else {
              console.log(response.posts);
              this.posts = response.posts
            }
          }).catch(function (err) {
            console.error(err);
          });
        }
      }
      */
}

Vue.component('welcome', welcome);
Vue.component('calibrate', calibrate);
Vue.component('play', play);
Vue.component('notsupported', notsupported);



new Vue({
  el: '#app',
  render(h) {
      return h(App, {
          props: {
              comms
          }
        });
    }
});
