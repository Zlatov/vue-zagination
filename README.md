# VueZagination

## Install

`yarn add vue-zagination`

## Usage

JS entry point:

```js
import vue_zagination from 'vue-zagination';
import 'vue-zagination/dist/vue-zagination.css'
Vue.component("zagination", vue_zagination)
```

Your vue-component template:

```html
  …
  <zagination
    :current="current"
    :total="total"
    @zagination_click="custom_handler"
  ></zagination>
  …
```

Where `custom_handler` is the pagination click handler, for example:

```js
  …
  methods: {

    custom_handler: function(page) {
      this.pagination.current = page
      this.$ajax_get_page_data()
      // or something you want
    },
    …
  },
  …
```
