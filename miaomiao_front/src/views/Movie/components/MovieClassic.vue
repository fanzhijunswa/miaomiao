<template lang="pug">
van-pull-refresh(v-model="isLoading" @refresh="onRefresh" success-text="刷新成功")
    van-list(v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad")
        .movie-classic
            ul.movie-classic-lit
                li.movie-classic-item(v-for="item in movieList")
                    .classic-item-left(@click="$router.push(`/movieDetail/${item.id}`)")
                        .classic-item-img
                            img(:src="item.cover")
                    .classic-item-right  
                        .classic-item-introduce
                            .classic-item-one
                                h6.classic-item-title {{ item.title }}
                            .classic-item-two
                                .classic-item-word 喵喵评分：
                                .classic-item-score {{ item.rate }}
                            .classic-item-three
                                .classic-item-word 类别:{{ item.detail[0]['genre'] | actorFilter }}
                                .classic-item-actor(v-for="") 
                            .classic-item-four
                                .classic-item-word 上映时间:
                                .classic-item-time {{ item.detail[0]['datePublished'] }}
                        .classic-item-play      
</template>
 
<script>
import { movieMixin } from '../mixins/movieMixin'
export default {
  name: "movie-classic",
  components: {

  },
  data() {
      return {
          tag: 0
      }
  },
  mixins: [movieMixin],
  filters: {
      evrFilter1 (item) {
          return String.prototype.toUpperCase.call(/(\w+)\d/.exec(item)[1])
      },
      evrFilter2 (item) {
          return String.prototype.toUpperCase.call(/\w+(\d\w+)/.exec(item)[1])
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