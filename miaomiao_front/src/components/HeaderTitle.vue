<template lang="pug">
header(ref="header")
  slot(name="left")
  slot 
    .title {{'喵喵电影'}}
  slot(name="right")
</template>
 
<script>
export default {
  name: "HeaderTitle",
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
  mounted () {
    if (this.leftandRight) {
      this.$refs.header.style['justify-content'] = 'space-between'
      this.$refs.header.style.backgroundColor = this.color
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
 
<style lang="sass" scoped>
@import '~styles/_color.sass' 
Header
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 80px
  background-color: $color-red
  display: flex
  padding: 0 20px
  justify-content: center
  align-items: center
  color: white
  font-size: 20px
  z-index: 999999
.title
  padding: 0 50px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>