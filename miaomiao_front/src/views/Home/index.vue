<template lang="pug">
.Home
  HeaderTitle
    .title {{'首页'}}
  
  tab-bar
</template>
 
<script>
import HeaderTitle from "components/HeaderTitle";
import TabBar from "components/TabBar";
export default {
  name: "Home",
  components: {
    HeaderTitle,
    TabBar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
 
<style lang="sass" scoped>
.Home
  padding: 80px 0
</style>