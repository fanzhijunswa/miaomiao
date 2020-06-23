<template lang="pug">
.movie-content
</template>
 
<script>
import { movieMixin } from '../mixins/movieMixin'
export default {
  name: "movie-content",
  mixins: [movieMixin],
  components: {

  },
  data() {
    return {
      film_tid: 1
    };
  },
  methods: {}
};
</script>
 
<style lang="sass" scoped>
.movie-content
</style>