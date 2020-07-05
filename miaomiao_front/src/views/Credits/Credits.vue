<template lang="pug">
.credit
    header-title(:leftandRight="1" :color="$route.query.color")
        .left(slot="left" @click="$router.go(-1)")
            i(class="iconfont icon-fanhui4")
        .title {{$route.query.title}}
        .right(slot="right")
            i(class="iconfont icon-gengduo")
    .cell-group
        .cell(v-for="(item,index) in [director,author,actor]" :key="index" @click="changeChooseList(index)")
            .up
                .left(v-if="index === 0") {{ '导演' }}
                .left(v-if="index === 1") {{ '编剧' }}
                .left(v-if="index === 2") {{ '演员' }}
                .right
                    i(:class="['iconfont',chooseList.includes(index) ? 'icon-zhankai' : 'icon-zhankai1']")
            ul.down(v-if="chooseList.includes(index)")
                li(v-for="({id,name,user_image,birthday,constellation,introduce,job,birthplace}) in item" :key="id" v-if="!!name")
                    .li-up
                        .li-left   
                            img(:src="!!user_image ? user_image : '//p0.meituan.net/moviemachine/b99384cf1eacb139fde0509af424af6623037.png@160w_224h_1e_1c'")
                        .li-right
                            h2.name {{ name }}
                            .job {{ job | actorFilter }}
                            .birthday {{ birthday | birthdayFilter }}
                            .birthplace {{ birthplace | actorFilter }}
                            .constellation {{ constellation }}
                    .li-down
                        .introduce 介绍: {{ introduce }}

</template>
 
<script>
import { Cell, CellGroup } from "vant";
import { getMovieStar } from "api/Movie";
import HeaderTitle from "components/HeaderTitle";
import TabBar from "components/TabBar";
export default {
  name: "credit",
  components: {
    HeaderTitle,
    TabBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      movieStar: [],
      flag: false,
      chooseList: []
    };
  },
  computed: {
      director () {
          if (!this.movieStar.director) return []
          return this.movieStar.director
      },
      author () {
          if (!this.movieStar.author) return []
          return this.movieStar.author
      },
      actor () {
          if (!this.movieStar.actor) return []
          return this.movieStar.actor
      }
    },
  filters: {
    birthdayFilter(item) {
      try {
        let newStr = item.replace(/-/g, (...[, $1]) => {
          switch ($1) {
            case 4:
              return "年";
            case 7:
              return "月";
          }
        });
        return newStr + "日";
      } catch (e) {
          return item
      }
    }
  },
  async created() {
    await this.getData();
    console.log(this.movieStar);
  },
  methods: {
    changeChooseList(index) {
      const i = this.chooseList.findIndex(item => item === index);
      i === -1 ? this.chooseList.push(index) : this.chooseList.splice(i, 1);
    },
    getData() {
      return Promise.all([this.getMovieStar()]);
    },
    getMovieStar() {
      return new Promise(async (resolve, reject) => {
        try {
          this.movieStar = await getMovieStar(this.$route.params.id);
          resolve();
        } catch (e) {
          reject("电影详情获取失败");
        }
      });
    }
  }
};
</script>
 
<style lang="sass" scoped>
.credit
    padding: 80px 0 0  
    .cell-group
        width: 100%
        .cell
            width: 100%
            display: flex
            flex-direction: column
            padding: 20px 20px
            justify-content: center
            border-bottom: 2px solid #F5F5F5
            .up
                display: flex
                height: 100px
                justify-content: space-between
                align-items: center
            .down
                overflow: hidden
                li
                    border-bottom: 2px solid #CCC
                    padding: 30px
                    // margin-bottom: 30px
                    .li-up
                        display: flex
                        .li-left
                            flex: 3
                            margin-right: 20px
                            img
                                width: 250px
                                height: 250px
                        .li-right
                            flex: 5
                            line-height: 1.5
                            .name
                                overflow: hidden
                                text-overflow:ellipsis
                                white-space: nowrap
                            .job,.birthday,.constellation,.birthplace
                                @extend .name
                                font-size: 30px
                                opacity: .6

                    .li-down
                        margin-top: 20px
                        .introduce
                            font-size: 30px
                            line-height: 1.5
</style>