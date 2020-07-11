<template lang="pug">
.film-review
    .up-title 评论
    .film-review-all
        .film-item(v-for="item in 100" :key="item") {{ item }}
    .film-review-box
        .fixed-left
            .fixed-img
                img(:src="getUserInfo.cover")
            .fixed-input
                textarea(placeholder="请输入...")
        .fixed-right
            .button(@click="sendFilmReview")
                button 发送
</template>
 
<script>
import { mapGetters } from 'vuex'
import { sendFilmReview } from 'api/FilmReview'
export default {
 name: 'filmReview',
 components: {},
 data () {
 return {
 
 }
 },
 computed: {
     ...mapGetters(['getUserInfo'])
 },
  methods: {
      async sendFilmReview () {
          await sendFilmReview()
      }
  }
}
</script>
 
<style lang="sass" scoped>
@import '~styles/_color.sass'
.film-review 
    padding: 20px 40px 170px
    display: flex
    flex-direction: column
    height: 100%
    .film-review-all
        overflow-y: auto
        .film-item
            padding: 40px 0 
            display: flex
            border-bottom: 2px solid #fefe
    .film-review-box
        width: 100%
        min-height: 90px
        padding: 0 40px
        border-top: 2px solid #CCC
        position: fixed
        bottom: 80px
        left: 0
        display: flex
        .fixed-left
            flex: 8
            display: flex
            align-items: center
            .fixed-img
                width: 70px
                height: 70px
                border-radius: 50%
                overflow: hidden
                margin-right: 20px
                img
                    width: 100%
                    height: 100%
            .fixed-input
                width: 100%
                height: 100%
                overflow: hidden
                textarea
                    width: 100%
                    height: 100%
                    border: 0
                    display: flex
                    padding-top: 20px
                input::-webkit-input-placeholder
                    font-size: 28px
        .fixed-right
            flex: 3
            display: flex
            padding: 8px 0
            .button
                width: 80%
                height: 100%
                border-radius: 8px
                overflow: hidden
                button
                    width: 100%
                    height: 100%
                    border: 0
                    background-color: $color-green
                    color: white

</style>