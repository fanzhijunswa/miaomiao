<template lang="pug">
.user
  header-title 
    .title {{'个人中心'}}
  tab-bar
</template>
 
<script>
import HeaderTitle from "components/HeaderTitle"
import TabBar from "components/TabBar"
import { mapGetters } from 'vuex'
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
  methods: {}
}
</script>
 
<style lang="sass" scoped>
.user
  padding: 80px 0
</style>