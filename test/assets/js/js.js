import '../css/scss.scss'

// import Vue from "../../../node_modules/vue/dist/vue.min.js";
// или
import Vue from "vue/dist/vue.min.js";

import { vue_zagination as zagination, foo, cube } from '../../../src/vue-zagination';
Vue.component("zagination", zagination)
window.cube = cube
console.log(cube(3));
console.log(foo);

import vue_app from './vue/app';
window.vue = {
  application: {
    app: new Vue(vue_app)
  }
}
