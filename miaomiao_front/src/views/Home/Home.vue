<template lang="pug">
.Home
    HeaderTitle
        .title {{'首页'}}
    .content
        van-swipe(class="my-swipe" :autoplay="3000" indicator-color="white")
            van-swipe-item(v-for="(image, index) in swipperList" :key="index")
                img(:src="image")
    tab-bar
</template>
 
<script>
import { getSwipper } from 'api/Home'
import HeaderTitle from "components/HeaderTitle";
import TabBar from "components/TabBar";
export default {
  name: "Home",
  components: {
    HeaderTitle,
    TabBar
  },
  data() {
    return {
        swipperList: []
    };
  },
  async created () {
      try {
          await this.getData()
          console.log(this.swipperList)
      } catch (e) {
          console.warn('轮播图获取失败')
      }
  },
  methods: {
      getData () {
          return Promise.all([this.getSwipper()])
      },
      getSwipper () {
          return new Promise(async (resolve, reject) => {
              const data = await getSwipper()
              this.swipperList = data.map(item => item.cover)
              resolve()
          })
      }
  }
};
</script>
 
<style lang="sass" scoped>
.Home
    padding: 80px 0
    .content
        .van-swipe
            height: 300px
            width: 100%
            img
                width: 100%
                height: 100%
                // object-fit: cover
</style>