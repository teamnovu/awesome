export default {
  data() {
    return {
      tweened: {
        _intervals: {},
      },
    }
  },

  created() {
    const numbersToTween = this.$options.tweenNumbers

    if (numbersToTween && typeof numbersToTween === 'object') {
      Object.keys(numbersToTween).forEach(key => {
        this.$set(this.tweened, key, this[key])

        this.$watch(key, newVal => {
          const duration =
            typeof numbersToTween[key] === 'object' &&
            numbersToTween[key].duration
              ? numbersToTween[key].duration
              : undefined
          this.tweenNumber(key, newVal, duration)
        })
      })
    }
  },

  methods: {
    tweenNumber(key, to, duration = 500) {
      clearInterval(this.tweened._intervals[key])

      const MS_STEPS = 20

      let timeLeft = duration
      this.tweened._intervals[key] = setInterval(() => {
        if (timeLeft <= 0 || to === this.tweened[key]) {
          return clearInterval(this.tweened._intervals[key])
        }

        const delta =
          to > this.tweened[key]
            ? Math.ceil(((to - this.tweened[key]) / timeLeft) * MS_STEPS)
            : Math.floor(((to - this.tweened[key]) / timeLeft) * MS_STEPS)

        this.tweened[key] += delta

        timeLeft = timeLeft - MS_STEPS
      }, MS_STEPS)
    },
  },
}
