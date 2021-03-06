<script>
export default {
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageQueryKey: {
      type: String,
      default: 'page',
    },
    limitQueryKey: {
      type: String,
      default: 'limit',
    },
    firstPageData: {
      type: Object,
      default: null,
    },
    parseItems: {
      type: Function,
      default: data => data.data,
    },
    parseMeta: {
      type: Function,
      default: data => ({
        currentPage: data.meta.current_page,
        lastPage: data.meta.last_page,
      }),
    },
  },

  data() {
    return {
      state: 'success',
      error: null,
      items: [],
      meta: {
        currentPage: 0,
        lastPage: null,
      },
    }
  },

  computed: {
    hasMore() {
      return this.meta.lastPage && this.meta.currentPage < this.meta.lastPage
    },

    nextPage() {
      return this.meta.currentPage ? this.meta.currentPage + 1 : 1
    },

    url() {
      const delimiter = this.endpoint.includes('?') ? '&' : '?'
      return (
        this.endpoint +
        delimiter +
        [
          this.pageQueryKey + '=' + this.nextPage,
          this.limitQueryKey + '=' + this.limit,
        ].join('&')
      )
    },
  },

  mounted() {
    if (this.firstPageData) {
      this.items = this.parseItems(this.firstPageData)
      this.meta = this.parseMeta(this.firstPageData)
    }

    if (!this.items.length || !(this.meta && this.meta.lastPage)) {
      this.loadMore()
    }
  },

  methods: {
    loadMore() {
      this.state = 'loading'
      this.error = null

      return this.$axios
        .$get(this.url)
        .then(data => {
          this.items.push(...this.parseItems(data))
          this.meta = this.parseMeta(data)
          this.state = 'success'
        })
        .catch(error => {
          this.error = error
          this.state = 'error'
        })
    },
  },

  render() {
    return this.$scopedSlots.default({
      loadMore: this.loadMore,
      hasMore: this.hasMore,
      items: this.items,
      meta: this.meta,
      error: this.error,
      state: this.state,
    })
  },
}
</script>
