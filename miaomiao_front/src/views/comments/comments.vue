<template lang="pug">
.comments
    .up-title 讨论
    .comments-all
        .comments-item(v-for="({_id,name}) in comments.slice(0,1)" :key="_id")
            .comments-item-left
                .cover
                    img
            .comments-item-right
                .name {{ name }}
                .score
                .content
                .down
                    .down-left
                        .time
                    .down-right
                        .favorite
                        .discuss
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
    components: {},
    created () {
        console.log(this.comments)
    },
    data () {
        return {}
    },
    methods: {}
}
</script>
 
<style lang="sass" scoped>
.comments
    padding: 0 40px
    border-top-left-radius: 25px
    border-top-right-radius: 25px
    height: 100%
    overflow: hidden
    background-color: white
    .up-title
        padding: 40px 0 
</style>