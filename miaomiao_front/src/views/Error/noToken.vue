<template lang="pug">
.no-token
    .opacity-token(ref="opacity-token")
    .real-token
        .icon
            i(class="iconfont icon-suotou")
        .login
            h2 请登录后查看哦，喵~
            .button(@click="$router.push('/userInfo')") 登录
</template>
 
<script>
export default {
 name: 'no-token',
 props: {
    color: {
        type: String,
        default: () => ''
    }
 },
 components: {},
 data () {
 return {
     
 }
 },
 mounted () {
    //  this.$refs['opacity-token'].style.backgroundColor = this.color
 },
  methods: {}
}
</script>
 
<style lang="sass" scoped>
@import '~styles/_color.sass'
.no-token
    height: 400px
    position: relative
    
    .opacity-token
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 999998
        background: url('http://www.jq22.com/demo/circleMagic201710082042/dest/img/bg.jpg') center center no-repeat
        filter: blur(10px)
        background-size: cover
    .real-token
        padding: 80px 0
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 999999
        display: flex
        flex-direction: column
        align-items: center
        .login
            display: flex
            align-items: center
            .button
                border-radius: 8px
                padding: 18px
                font-size: 14px
                background-color: $color-green
                color: white
            h2
                color: white
                font-weight: 400
                margin-right: 20px
        .icon
            margin-bottom: 20px
            i
                font-size: 80px
                color: #666


</style>