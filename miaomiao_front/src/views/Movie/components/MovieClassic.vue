<template lang="pug">
van-pull-refresh(v-model="isLoading" @refresh="onRefresh" success-text="刷新成功")
    van-list(v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad")
        .movie-classic
            ul.movie-classic-lit
                li.movie-classic-item(v-for="item in movieClassicList")
                    .classic-item-left
                        .classic-item-img
                            img(:src="item.film_img")
                    .classic-item-right  
                        .classic-item-introduce
                            .classic-item-one
                                h6.classic-item-title {{ item.film_title }}
                                .classic-item-evr(v-if="!!item.film_evr")
                                    .classic-evr-left {{ item.film_evr | evrFilter1 }}
                                    .classic-evr-right {{ item.film_evr | evrFilter2 }}
                            .classic-item-two
                                .classic-item-word 喵喵评分：
                                .classic-item-score {{ item.film_score }}
                            .classic-item-three
                                .classic-item-word 主演:{{ item.film_actor | actorFilter }}
                                .classic-item-actor(v-for="") 
                            .classic-item-four
                                .classic-item-word 上映时间:
                                .classic-item-time {{ item.film_time }}
                        .classic-item-play      
</template>
 
<script>
import { getMovieList } from '@/api/movie'
export default {
  name: "movie-classic",
  components: {

  },
  filters: {
      evrFilter1 (item) {
          return String.prototype.toUpperCase.call(/(\w+)\d/.exec(item)[1])
      },
      evrFilter2 (item) {
          return String.prototype.toUpperCase.call(/\w+(\d\w+)/.exec(item)[1])
      },
      actorFilter (item) {
          return item.length ? item.join('、') : '未知'
      }
  },
  data() {
    return {
        current: 0,
        finished: false,
        movieClassicList: [],
        isLoading: false,
        loading: false
    };
  },
  methods: {
      // 上拉加载
    async onLoad () {
        await this.getData()
        this.loading = false
    },
    activated() {
        console.log(12)
    },
    // 下拉刷新
    async onRefresh () {
        this.current = 0
        this.finished = false
        await this.getMovieList()
        this.isLoading = false
    },
    getData () {
        return Promise.all([this.getMovieList()]).catch(e => console.warn(e))
    },
    getMovieList () {
        return new Promise(async (resolve, reject) => {
            try {
                await this.$sleep()
                const list = await getMovieList({ film_tid: 2, current: this.current })
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
};
</script>
 
<style lang="sass" scoped>
@import '~styles/_color.sass'
.movie-classic
  .movie-classic-item
    height: 270px
    display: flex
    .classic-item-left
        display: flex
        flex: 2
        margin-right: 30px
        .classic-item-img
            flex: 1
            margin-top: 30px
            border-radius: 10px
            overflow: hidden
            img
                width: 100%
                height: 90%
    .classic-item-right
        height: 100%
        padding: 30px 0
        flex: 7
        display: flex
        border-bottom: 1px solid #CCC
        .classic-item-introduce
            flex: 8
            .classic-item-one
                display: flex
                margin-bottom: 20px
                .classic-item-title
                    margin-right: 20px
                    display: flex
                    font-size: 30px
                    color: #222
                    align-items: center
                .classic-item-evr
                    display: flex
                    height: 38px
                    line-height: 38px
                    transform: scale(0.9)
                    .classic-evr-left
                        font-size: 12px
                        height: 100%
                        border-radius:  10px 0 0 10px
                        padding: 0 10px
                        border: 2px solid #CCC
                        border-right: 0
                        color: gray
                    .classic-evr-right
                        font-size: 12px
                        border-radius: 0 10px 10px 0
                        padding: 0 10px
                        border-left: 0
                        background-color: gray
                        color: white
            .classic-item-two
                display: flex
                margin-bottom: 15px
                .classic-item-score
                    line-height: 42px
                    color: #FEB312
            .classic-item-two
                margin-bottom: 15px
                .classic-item-word
                    line-height: 42px
            .classic-item-four
                margin-top: 15px
                display: flex
                .classic-item-word
                    line-height: 42px
                .classic-item-time
                    line-height: 42px
                    
        .classic-item-play      
            
</style>