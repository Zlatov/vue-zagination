import '../css/scss.scss'
import Vue from 'vue';
import { cube, foo } from '../../../src/vue-zagination';
window.cube = cube
console.log(cube(3));
console.log(foo);
