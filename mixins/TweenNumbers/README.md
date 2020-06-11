TweenNumbers
=================

This mixin is used to smoothly animate numbers.

## Usage

```html
<template>
  <span>{{ tweened.donated }} donated by {{ tweened.donors }} donors</span>
</template>

<script>
import TweenNumbers from '~/mixins/TweenNumbers'

export default {
  mixins: [TweenNumbers],

  props: {
    donors: Number,
  },

  data() {
    return {
      donated: 1000,
    }
  },

  tweenNumbers: {
    donors: true,
    donated: { duration: 500 },
  },
}
</script>
```

## Props

| Prop           	| Type   | Default | Description                           |
|----------------	|------- |-------- |-------------------------------------- |
| duration       	| Number | 500     | Duration of animation in milliseconds |
