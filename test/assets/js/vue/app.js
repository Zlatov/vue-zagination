"use strict"

var vue_app = {

  el: '#vue-app',

  data: {
    current: 1,
    total: 15
  },

  computed: {
    message: function() {
      return 'App Vue with total pages: ' + this.total + ', and current page: ' + this.current + '.'
    },
  },

  methods: {

    custom_handler: function(page) {
      this.current = page
    },
  },
}

export default vue_app
