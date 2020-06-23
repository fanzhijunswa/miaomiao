<template lang="pug">
.Movie
  header-title 
    .title {{'电影'}}
  van-tabs(@click="$router.push($event)")
    van-tab(title="正在热映" name="hot") 
    van-tab(title="即将上映" name="future") 
    van-tab(title="经典影片" name="classic")
    van-tab(title="标签 3") 
  .movie-content
    keep-alive
      router-view(v-if="$route.meta.keepAlive") 
    router-view(v-if="!$route.meta.keepAlive") 
  tab-bar 
</template>
 
<script>
import { Tabs, Tab } from 'vant'
import HeaderTitle from "components/HeaderTitle";
import TabBar from "components/TabBar";
export default {
  name: "Movie",
  components: {
    HeaderTitle,
    TabBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
  },
  data() {
    return {};
  },
  created () {
    
  },
  activated() {},
  methods: {

  }
};
</script>
 
<style lang="sass" scoped>
@import '~styles/_color.sass'
.Movie
  padding: 80px 0
  .van-tabs
    width: 100%
    position: fixed
    z-index: 999998
  .movie-content
    padding: 88px 30px 0
  
</style>