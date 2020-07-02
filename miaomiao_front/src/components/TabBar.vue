<template lang="pug">
footer(ref="footer")
  ul.tab-bar
    router-link(tag="li" to="/")
      i(class="iconfont icon-shouye")
    router-link(tag="li" to="/movie")
      i(class="iconfont icon-dianying")
    router-link(tag="li" to="/") 
      i(class="iconfont icon-wode")
</template>
 
<script>
export default {
  name: "TabBar",
  components: {},
  props: {
     leftandRight: {
      type: Number,
      default: () => 0
    },
    color: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {};
  },
  mounted () {
    if (this.leftandRight) {
      this.$refs.footer.style.backgroundColor = this.color
    }
  },
  methods: {}
};
</script>
 
<style lang="sass" scoped>
@import '~styles/_color.sass'
footer
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  height: 80px
  background-color: $color-red
  z-index: 999999999
  .tab-bar
    height: 100%
    display: flex
    justify-content: space-around
    align-items: center
    li
      cursor: pointer
      color: #222
.router-link-active
  color: $color-white!important
</style>