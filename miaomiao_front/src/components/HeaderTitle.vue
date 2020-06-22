<template lang="pug">
header
  slot 
    .title {{'喵喵电影'}}
</template>
 
<script>
export default {
  name: "HeaderTitle",
  components: {},
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
  justify-content: center
  align-items: center
  color: white
  font-size: 20px
</style>