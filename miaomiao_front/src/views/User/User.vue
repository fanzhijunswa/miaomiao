<template lang="pug">
.user
    header-title 
        .title {{'个人中心'}}
    .content
        van-button(type="primary" @click="loginOut") 退出登录
    tab-bar
</template>
 
<script>
import HeaderTitle from "components/HeaderTitle"
import TabBar from "components/TabBar"
import { mapGetters, mapMutations } from 'vuex'
export default {
 name: 'user',
 components: {
   HeaderTitle,
   TabBar
 },
 data () {
 return {
 
 }
 },
 computed: {
   ...mapGetters(['name'])
 },
  methods: {
    ...mapMutations(['removeUserInfo']),
    loginOut () {
        this.removeUserInfo()
        this.$router.push('/home')
    }
  }
}
</script>
 
<style lang="sass" scoped>
.user
  padding: 80px 0
</style>