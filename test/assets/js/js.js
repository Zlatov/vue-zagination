import '../css/scss.scss'

import Vue from "vue/dist/vue.min.js";

import zagination from '../../../src/vue-zagination';
window.zagination = zagination

Vue.component("zagination", zagination)

import vue_app from './vue/app';
window.vue = {
  application: {
    app: new Vue(vue_app)
  }
}
