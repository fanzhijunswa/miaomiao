<template lang="pug">
.card
    .discription-group
        .up
            slot(name="left")
            slot(name="right")
        .down
            slot(name="down")
            slot(name="pics")
</template>
 
<script>
export default {
 name: 'card',
 components: {},
 data () {
 return {
 
 }
 },
  methods: {}
}
</script>
 
<style lang="sass" scoped>
.card
    margin-bottom: 30px
    .discription-group
        &>.up
            display: flex
            justify-content: space-between
            margin-bottom: 15px
            .left
                color: white
            .right
                display: flex
                color: #666
                font-size: 12px
                transform: scale(.9)
        .introduce
            line-height: 1.5
            transform: scale(.9)
        .pic-group
            margin-top: 30px
            width: 100%
            display: flex
            overflow-x: scroll
            overflow-y: hidden            
            &::-webkit-scrollbar
                display: none
            li
                min-width: 180px
                margin-right: 30px
                min-height: 300px
                overflow: hidden
                .up
                    width: 100%
                    height: 70%
                    img
                        width: 100%
                        height: 100%
                .down
                    height: 30%
                    display: flex
                    align-items: center
                    text-align: center
                    color: white
                    font-size: 12px
                    line-height: 1.5
</style>