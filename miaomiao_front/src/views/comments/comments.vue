<template lang="pug">
.comments
    .up-title 讨论
    .comments-all
        .comments-item(v-for="({_id,name,avatar,score,content,public_time,favorite,type},index) in comments" :key="_id")
            .comments-item-left
                .cover
                    img(:src="avatar")
            .comments-item-right
                .name 
                    span {{ name }}
                    van-rate(v-show="star.length" v-model="star[index]" allow-half void-icon="star" void-color="#eee")
                .score 给这部电影打了 {{ score/10 }}分
                .content {{ content }}
                .down
                    .down-left
                        .time {{ !!public_time ? /(\d{2}-\d{2})$/.exec(public_time)[1] : '未知' }}
                    .down-right
                        .favorite 
                            i(class="iconfont icon-zan1")
                            span {{ favorite }}   
                        .discuss {{ !!type || '电波获取不到~' }}
</template>
 
<script>
export default {
    name: 'comments',
    props: {
    comments: {
        type: Array,
        default: () => []
        }
    },
    computed: {
        star () {
            if (!this.comments.length) return []
            return this.comments.map(item => item.score / 10)
        }
    },
    created () {
    },
    data () {
        return {}
    },
    methods: {
    }
    
}
</script>
 
<style lang="sass" scoped>
.comments
    padding: 0 40px 80px
    border-top-left-radius: 25px
    border-top-right-radius: 25px
    overflow: hidden
    background-color: white
    .up-title
        font-size: 28px
        padding: 40px 0 0
    .comments-all
        .comments-item
            padding: 40px 0 
            display: flex
            border-bottom: 2px solid #fefe
            .comments-item-left
                flex: 1
                .cover
                    width: 80px
                    height: 80px
                    border-radius: 50%
                    overflow: hidden
            .comments-item-right
                flex: 5   
                .name
                    display: flex
                    align-items: center
                    span
                        font-size: 12px 
                        margin-right: 40px
                    .van-rate
                        ::v-deep .van-rate__icon
                            font-size: 28px!important
                .score
                    font-size: 12px
                    color: #666
                    margin: 15px 0
                .content
                    color: #333
                    font-size: 30px
                    line-height: 45px
                .down
                    margin-top: 15px
                    display: flex
                    color: #666
                    justify-content: space-between
                    .time
                        font-size:12px
                    .down-right
                        width: 250px
                        justify-content: space-between
                        display: flex
                        .favorite,.discuss
                            font-size: 12px
                            vertical-align: bottom
                        .favorite
                            line-height: 32px
                            span
                                font-size: 12px
                            i
                                vertical-align: bottom
</style>