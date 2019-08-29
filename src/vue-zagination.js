"use strict"

import './vue-zagination.scss'

function cube(x) {
  return x * x * x
}

const foo = Math.PI + Math.SQRT2

let vue_zagination = {

  data: function() {
    return {
      name: 'Zagination'
    }
  },

  template: `
    <div class="vue-zagination">
      <div class="el">el</div>
      {{ name }}
    </div>
  `,
}

export { cube, foo, vue_zagination }
