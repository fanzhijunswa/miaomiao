<template lang="pug">
.login
    login-register-model

</template>
 
<script>
import LoginRegisterModel from './components/LoginRegisterModel'
export default {
 name: 'login',
 components: {
    LoginRegisterModel
 },
 data () {
 return {

 }
 },
  methods: {
      onSubmit () {}
  }
}
</script>
 
<style lang="sass" scoped>
.login
    padding: 60px
</style>