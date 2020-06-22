<template lang="pug">
.Movie
  header-title 
    .title {{'电影'}}
  ul.film-ul
    router-link(to="/movie/hot" tag="li" class="left") 正在热映
    router-link(to="/movie/future" tag="li" class="center") 即将上映
    router-link(to="/movie/classic" tag="li" class="right") 经典影片
  .movie-content
    keep-alive
      router-view 
  tab-bar 
</template>
 
<script>
import HeaderTitle from "components/HeaderTitle";
import TabBar from "components/TabBar";
export default {
  name: "Movie",
  components: {
    HeaderTitle,
    TabBar
  },
  data() {
    return {};
  },
  activated() {},
  methods: {}
};
</script>
 
<style lang="sass" scoped>
@import '~styles/_color.sass'
.Movie
  padding: 170px 0 80px 0
  .film-ul
    position: fixed
    top: 80px
    left: 0
    width: 100%
    color: $color-white
    display: flex
    justify-content: space-around
    align-items: center
    height: 90px
    background-color: $color-red
    li
      font-size: 28px
      padding-bottom: 10px
    .router-link-active
      border-bottom: 2px solid white
</style>