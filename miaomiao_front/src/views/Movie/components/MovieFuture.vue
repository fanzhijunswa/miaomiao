<template lang="pug">
.movie-content
</template>
 
<script>
import { getMovieList } from '@/api/movie'
export default {
  name: "movie-content",
  components: {

  },
  data() {
    return {};
  },
  async created () {
    console.log(await getMovieList({ film_tid: 1 }))
  },
  methods: {}
};
</script>
 
<style lang="sass" scoped>
.movie-content
</style>