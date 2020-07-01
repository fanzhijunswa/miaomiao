<template lang="pug">
.movie-detail
    header-title(:leftandRight="1" :color="color")
        .left(slot="left" @click="$router.go(-1)")
            i(class="iconfont icon-fanhui4")
        .title {{'电影详情'}}
        .right(slot="right")
            i(class="iconfont icon-gengduo")
    .content
        .opacity-content(ref="content")
        .real-content
            .content-detail-group
                .left
                    img(:src="movieDetail.image")
                .right
                    h1 {{ movieDetail.name }}
                    .genre {{ movieDetail.genre | actorFilter }}
                    .actor {{ movieDetail.actor | actorFilter2 }}
                    .datePublished {{ movieDetail.datePublished + '上映' }}
                    .button
                        .hop-watch
                        .watched
            .content-score-group
                .up
                    img(src="@/assets/images/cat.png")
                    span 实时口碑
                .down
                    .left
                        h1 {{ !!movieDetail.aggregateRating && movieDetail.aggregateRating[0]['ratingValue'] }}
                    .right 
                        van-progress(percentage="50")
            .content-description-group
            .content-actor-group
    tab-bar(:leftandRight="1" :color="color")
</template>
 
<script>
import _ from 'lodash'
import { Progress } from 'vant'
import HeaderTitle from "components/HeaderTitle";
import TabBar from "components/TabBar";
import { getmovieDetail } from 'api/movie'
export default {
 name: 'movie-detail',
 components: {
    HeaderTitle,
    TabBar,
    Progress
 },
 filters: {
     actorFilter2 (item) {
        if (!item) return ''
        const nameList = item.map(i => i.name)
        return nameList.slice(0, 3).join('、')
     }
 },
 data () {
 return {
     movieDetail: {},
     color: '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)
 }
 },
 async created() {
     try {
        await this.getData()
        console.log(this.movieDetail)
     } catch (e) {
        console.warn(e)
     }
 },
 mounted () {
    this.$refs.content.style.backgroundColor = this.color
 },
  methods: {
      getData () {
          return Promise.all([this.getmovieDetail()])
      },
      getmovieDetail () {
          return new Promise(async (resolve, reject) => {
              try {
                  this.movieDetail = _.get(await getmovieDetail(this.$route.params.id), 0)
                  resolve()
              } catch (e) {
                  reject('电影详情获取失败')
              }
          })
      }
  }
}
</script>
 
<style lang="sass" scoped>
.left,.right
    i
        font-size: 40px
.movie-detail
    padding: 80px 0 
    height: 100vh
    .content
        height: 100%
        position: relative
        .opacity-content
            width: 100%
            height: 100%
            position: absolute
            left: 0
            top: 0
            opacity: 0.5
            z-index: 998
        .real-content
            width: 100%
            position: absolute
            top: 0
            left: 0
            height: 100%
            z-index: 998
            padding: 30px
            .content-detail-group
                display: flex
                .left
                    flex: 2
                    margin-right: 20px
                    img
                        width: 100%
                        height: 100%
                .right
                    flex: 5
                    h1
                        color:#fff
                        margin-bottom: 15px
                        display: -webkit-box   
                        -webkit-box-orient: vertical   
                        -webkit-line-clamp: 2 
                        overflow: hidden
                    .genre
                        color: #222
                        margin-bottom: 15px
                    .actor
                        margin-bottom: 15px
                        display: -webkit-box   
                        -webkit-box-orient: vertical   
                        -webkit-line-clamp: 2 
                        overflow: hidden
            .content-score-group
                margin: 30px 0
                width: 100%
                border-radius: 10px 
                background: rgba(0, 0, 0,.3 )
                display: flex
                flex-direction: column
                padding: 20px
                .up
                    margin-bottom: 50px
                    img
                        width: 40px
                        height: 40px
                        vertical-align: middle
                        margin-right: 15px
                    span
                        color: white
                        font-size: 20px
                .down
                    display: flex
                    .left
                        flex: 4
                        display: flex
                        justify-content: center
                        align-items: center
                        margin-right: 20px
                        h1 
                            font-size: 70px
                            color: #FEB312
                    .right
                        flex: 5
                        justify-content: flex-start

</style>