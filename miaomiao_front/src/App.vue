<template lang="pug">
.container
    keep-alive(include="User")
        router-view 
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style lang='sass' scoped>
@import '~styles/_color.sass'
</style>
