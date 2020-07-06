<template lang="pug">
.movie-detail
    header-title(:leftandRight="1" :color="color")
        .left(slot="left" @click="$router.push('/movie')")
            i(class="iconfont icon-fanhui4")
        .title {{'电影详情'}}
        .right(slot="right")
            i(class="iconfont icon-gengduo")
    .content
        .opacity-content(ref="content")
        .real-content
            .real-content-up
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
                                .group
                                    i(class="iconfont icon-xiangkan")
                                    span 想看
                            .watched
                                .group
                                    i(class="iconfont icon-shoucang")
                                    span 看过
                .content-score-group
                    .up
                        img(src="@/assets/images/cat.png")
                        span 实时口碑
                    .down
                        .left
                            h1 {{ !!movieDetail.aggregateRating && movieDetail.aggregateRating[0]['ratingValue'] }}
                        .right 
                            .right-item-left
                                .star-group(v-for="(item,index) in movieDetail.star" :key="index")
                                    i(class="iconfont icon-start-copy" v-for="item in 5-index" :key="item")
                            .right-item-center
                                .score-progess(v-for="(item,index) in movieDetail.star" :key="index")
                                    van-progress(:percentage="item | scoreFilter" stroke-width="8" :show-pivot="false" :color="color")
                            .right-item-right
                                .score-list(v-for="(item,index) in movieDetail.star" :key="index") {{ item }}
                card
                    .left(slot="left") 简介
                    .right(slot="right") 
                        span 展开
                        i(class="iconfont icon-zhankai")
                    .introduce(slot="down") {{movieDetail.description}}
                card
                    .left(slot="left") 演职人员
                    .right(slot="right")
                        .group(@click="$router.push({path:`/credits/${$route.params.id}`,query:{color:color,title:movieDetail.name}})") 
                            span 全部
                            i(class="iconfont icon-zhankai1")
                    ul.pic-group(slot="pics")
                        li(v-for="({name,pid,cover}) in allStar" :key="name+pid" v-if="!!name")
                            .up
                                img(:src="!!cover && cover !== 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png' ? cover :'//p0.meituan.net/moviemachine/b99384cf1eacb139fde0509af424af6623037.png@160w_224h_1e_1c'") 
                            .down {{ name }} 
                card
                    .left(slot="left") 剧照
                    .right(slot="right")
                        .group
                            span 共{{moviePhoto.length}}张
                    ul.pic-group(class="movie-photo" slot="pics")
                        li(v-for="(cover,index) in moviePhoto" :key="cover")
                            .up
                                img(:src="!!cover && cover !== 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png' ? cover :'//p0.meituan.net/moviemachine/b99384cf1eacb139fde0509af424af6623037.png@160w_224h_1e_1c'") 
            .real-content-down
                comments(:comments="comments" v-if="!!getToken")
                no-token(v-else :color="color")
    tab-bar(:leftandRight="1" :color="color")
</template>
 
<script>
import _ from 'lodash'
import { NoToken } from '@/views/Error'
import Card from './components/Card'
import { Progress } from 'vant'
import Comments from '../comments'
import HeaderTitle from "components/HeaderTitle";
import TabBar from "components/TabBar";
import { mapGetters } from 'vuex'
import { getmovieDetail, getComments } from 'api/Movie'
export default {
 name: 'movie-detail',
 components: {
    Card,
    HeaderTitle,
    TabBar,
    Comments,
    NoToken,
    [Progress.name]: Progress
 },
 filters: {
     actorFilter2 (item) {
        if (!item) return ''
        const nameList = item.map(i => i.name)
        return nameList.slice(0, 3).join('、')
     },
     scoreFilter (item) {
         if (!item) return 0
         return +(/(.+)%$/.exec(item)[1])
     }
 },
 data () {
    return {
        movieDetail: {
        },
        comments: [],
        color: '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)
    }
 },
 computed: {
     ...mapGetters(['getToken']),
     moviePhoto () {
         if (!this.movieDetail.moviePhoto) return []
         return this.movieDetail.moviePhoto.cover
     },
     allStar () {
         if (!this.movieDetail.movieStar) return []
         const { movieStar: { director, author, actor } } = this.movieDetail
         return [...director, ...author, ...actor].reduce((prev, next) => prev.some(item => item.name === next.name) ? prev : [...prev, next], [])
     }
 },
 async created() {
     try {
        await this.getData()
        console.log(this.comments)
     } catch (e) {
        console.warn(e)
     }
 },
 mounted () {
    this.$refs.content.style.backgroundColor = this.color
 },
  methods: {
      getData () {
          return Promise.all([this.getmovieDetail(), this.getComments()])
      },
      getComments () {
          return new Promise(async (resolve, reject) => {
              try {
                  this.comments = await getComments(this.$route.params.id)
                  resolve()
              } catch (e) {
                  reject('短评获取失败')
              }
          })
      },
      getmovieDetail () {
          return new Promise(async (resolve, reject) => {
              try {
                  this.movieDetail = await getmovieDetail(this.$route.params.id)
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
    .content
        min-height: 2000px
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
            height: 1000px
            position: absolute
            top: 0
            left: 0
            height: 100%
            z-index: 998
            .real-content-up
                width: 100%
                height: 100%
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
                        display: flex
                        flex-direction: column
                        h1
                            margin-bottom: 20px
                            color:#fff
                            display: -webkit-box   
                            -webkit-box-orient: vertical   
                            -webkit-line-clamp: 1 
                            overflow: hidden
                        .genre,.datePublished
                            margin-bottom: 10px
                            color: #222
                            font-size: 10px
                        .actor
                            margin-bottom: 10px
                            font-size: 10px
                            display: -webkit-box   
                            -webkit-box-orient: vertical   
                            -webkit-line-clamp: 2 
                            overflow: hidden
                        
                        .button
                            flex: 1
                            display: flex
                            .watched
                                border-radius: 10px
                                flex: 1
                                background: hsla(0,0%,100%,.35)
                                box-shadow: 0 0.02rem 0.08rem 0 rgba(0,0,0,.1)
                                .group
                                    width: 100%
                                    height: 100%
                                    display: flex
                                    justify-content: center
                                    align-items: center
                                    transform: scale(.7)
                                    i
                                        margin-right: 10px
                                        vertical-align: middle
                            .hop-watch
                                @extend .watched
                                margin-right: 30px
                .content-score-group
                    margin: 30px 0
                    width: 100%
                    border-radius: 10px 
                    background: rgba(0, 0, 0,.3 )
                    display: flex
                    flex-direction: column
                    padding: 20px 30px 50px
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
                        padding: 20px 0 50px
                        border-bottom: 2px solid #CCC
                        .left
                            flex: 3
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
                            display: flex
                            .right-item-left
                                .star-group
                                    transform: scale(0.7)
                                    height: 36px
                                    i
                                        color: #222
                                        font-size: 12px
                            .right-item-center
                                flex: 2
                                margin-right: 10px
                                .score-progess
                                    height: 36px
                                    width: 100%
                                    display: flex
                                    align-items: center
                                    .van-progress
                                        width: 100%
                            .right-item-right
                                flex: 1
                                display: flex
                                flex-direction: column
                                align-items: center
                                font-size: 12px
                                color: #222
                                .score-list
                                    transform: scale(.7)
            .real-content-down
                min-height: 300px
</style>