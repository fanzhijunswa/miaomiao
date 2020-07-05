<template lang="pug">
.Movie
  header-title 
    .title {{'电影'}}
  van-tabs(@click="$router.push($event)")
    van-tab(v-for="({ename,cname,_id}) in tagList" :key="_id" :title="cname" :name="ename") 
  .movie-content
    router-view
  tab-bar 
</template>
 
<script>
import { Tabs, Tab } from 'vant'
import HeaderTitle from "components/HeaderTitle";
import TabBar from "components/TabBar";
import { getTag } from 'api/Movie'
export default {
  name: "Movie",
  components: {
    HeaderTitle,
    TabBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
  },
  data() {
    return {
        tagList: []
    };
  },
  async created () {
    await this.getData()
  },
  activated() {},
  methods: {
      getData () {
          return Promise.all([this.getTag()])
      },
      getTag() {
          return new Promise(async (resolve, reject) => {
              try {
                  this.tagList = await getTag()
                  resolve()
                } catch (e) {
                    reject('分类列表获取失败')
                }  
            })
        }
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