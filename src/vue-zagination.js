"use strict"

import './vue-zagination.scss'

var vue_zagination = {

  props: {
    current: [Number, Object],
    total: Number,
    custom_options: Object
  },

  data: function() {
    var default_options = {
      central_max: 2,
      side_max: 3,
      is_prev_next: true,
      is_first_last: true,
      is_hide_one: true,
    }
    return {
      options: Object.assign(default_options, this.custom_options || {})
    }
  },

  computed: {
    valid_current: function() {
      if (this.current == null) return 1
      let temp
      if (typeof this.current === 'number') {
        temp = this.current
      } else {
        temp = parseInt(this.current)
      }
      if (isNaN(temp)) return 1
      return temp
    },

    valid_total: function() {
      if (this.total == null) return 1
      let temp
      if (typeof this.total === 'number') {
        temp = this.total
      } else {
        temp = parseInt(this.total)
      }
      if (isNaN(temp)) {
        return 1
      }
      return temp
    },

    pages: function() {
      var pages = []
      // Номера страниц рядом с первой страницей.
      for (let i = 1; i <= this.options.side_max; i++) {
        if (1 <= i && i <= this.valid_total) {
          pages.push(i)
        }
      }
      // Номера страниц рядом с текущей страницей.
      for (let i = this.valid_current - this.options.central_max; i <= this.valid_current + this.options.central_max; i++) {
        if (1 <= i && i <= this.valid_total) {
          pages.push(i)
        }
      }
      // Номера страниц рядом с последней страницей.
      for (let i = this.valid_total - this.options.side_max + 1; i <= this.valid_total; i++) {
        if (1 <= i && i <= this.valid_total) {
          pages.push(i)
        }
      }
      // Номера уникальны.
      pages = pages.filter((element, index, array) => {return array.indexOf(element) === index})
      return pages
    },

    pagination: function() {
      var pagination = []
      // Добавление разделителя.
      for (var i = 0, l = this.pages.length; i < l; i++) {
        var page = this.pages[i]

        if (i > 0 && page - this.pages[i - 1] > 1) {
          pagination.push({
            is_separator: true
          })
        }
        pagination.push({
          is_separator: false,
          number: page,
          is_active: page == this.valid_current
        })
      }
      return pagination
    },

    prev: function() {
      if (this.valid_current > 1) return this.valid_current - 1
      return 1
    },

    next: function() {
      if (this.valid_current < this.valid_total) return this.valid_current + 1
      return this.valid_total
    },

    is_first_page: function() {
      if (this.options.is_first_last && this.valid_current > 1) {
        return true
      }
      return false
    },

    is_prev_page: function() {
      if (this.options.is_prev_next && this.valid_current > 1) {
        return true
      }
      return false
    },

    is_next_page: function() {
      if (this.options.is_prev_next && this.valid_current < this.valid_total) {
        return true
      }
      return false
    },

    is_last_page: function() {
      if (this.options.is_first_last && this.valid_current < this.valid_total) {
        return true
      }
      return false
    },
  },

  methods: {
  },

  template: `
    <div class="vue-zagination" v-if="!options.is_hide_one || valid_total > 1">
      <a
        href=""
        v-if="is_first_page"
        class="page"
        @click.prevent="$emit('zagination_click', 1)"
      ><<</a>
      <a
        href=""
        v-if="is_prev_page"
        class="page"
        @click.prevent="$emit('zagination_click', prev)"
      ><</a>
      <template v-for="item in pagination">
        <span v-if="item.is_separator" class="separator">…</span>
        <span v-else-if="item.is_active" class="page active">{{ item.number }}</span>
        <a
          v-else
          href=""
          class="page"
          @click.prevent="$emit('zagination_click', item.number)"
        >{{ item.number }}</a>
      </template>
      <a
        href=""
        v-if="is_next_page"
        class="page"
        @click.prevent="$emit('zagination_click', next)"
      >></a>
      <a
        href=""
        v-if="is_last_page"
        class="page"
        @click.prevent="$emit('zagination_click', valid_total)"
      >>></a>
    </div>
  `,
}

export default vue_zagination
