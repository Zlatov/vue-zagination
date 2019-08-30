"use strict"

import './vue-zagination.scss'

let vue_zagination = {

  props: {
    current: [Number, Object],
    total: Number
  },

  data: function() {
    return {
      name: 'Zagination',
      options: {
        central_max: 2,
        side_max: 3,
      },
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
      console.log('pages s: ', pages)

      // Номера страниц рядом с текущей страницей.
      for (let i = this.valid_current - this.options.central_max; i <= this.valid_current + this.options.central_max; i++) {
        if (1 <= i && i <= this.valid_total) {
          pages.push(i)
        }
      }
      console.log('pages c: ', pages)

      // Номера страниц рядом с последней страницей.
      for (let i = this.valid_total - this.options.side_max + 1; i <= this.valid_total; i++) {
        if (1 <= i && i <= this.valid_total) {
          pages.push(i)
        }
      }
      console.log('pages f: ', pages)

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
  },

  template: `
    <div class="vue-zagination">
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
    </div>
  `,
}

export default vue_zagination
