import '../css/scss.scss'
import Vue from "vue/dist/vue.min.js";

import vue_zagination from 'vue-zagination';
import 'vue-zagination/dist/vue-zagination.css'
Vue.component("zagination", vue_zagination)

import another_component from './vue/another_component';
Vue.component("another-component", another_component)

import vue_app from './vue/app';
window.vue = {
  application: {
    app: new Vue(vue_app)
  }
}
