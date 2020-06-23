import { getMovieList } from '@/api/movie'
export const movieMixin = {
  data() {
    return {
        current: 0,
        finished: false,
        movieClassicList: [],
        isLoading: false,
        loading: false
    };
  },
  async created () {
    console.log(await getMovieList({ film_tid: this.film_tid, current: this.current }))
  },
  methods: {
      // 上拉加载
    async onLoad () {
        await this.getMovieList()
        this.loading = false
    },
    // 下拉刷新
    async onRefresh () {
        this.current = 0
        this.finished = false
        await this.getMovieList()
        this.isLoading = false
    },
    getMovieList () {
        return new Promise(async (resolve, reject) => {
            try {
                await this.$sleep()
                const list = await getMovieList({ film_tid: this.film_tid, current: this.current })
                this.finished = list.length !== 10
                this.movieClassicList = [...(!this.current ? [] : this.movieClassicList), ...list]
                this.current++
                resolve()
            } catch (e) {
                reject('电影列表获取失败')
            }
        })
    }
  }
}