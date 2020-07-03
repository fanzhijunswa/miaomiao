<template lang="pug">
.login-register-model
    .up
        i(class="iconfont icon-fanhui-copy-copy" @click="$router.go(-1)")
    .middle
        .middle-up
            .middle-img
                .img
                    img(src="../../../assets/images/cat.png")
                .img-text 喵喵电影
            h1 {{ !type ? '请输入帐号' : type === 'login' ? '欢迎注册喵喵电影' : '欢迎登录喵喵电影' }}
        .middle-down
            van-form(validate-first)
                van-field(
                    v-if="!type"
                    v-model="userInfo.tel"
                    name="用户名/手机号/邮箱"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                    @focus="$refs['icon-register'].style.display = 'block'"
                    placeholder="用户名/手机号/邮箱"
                )
                    template(#right-icon)
                        .icon(v-show="!!userInfo.tel" @click="userInfo.tel = ''" ref="icon-register")
                            i(class="iconfont icon-icon_empty")
                template(v-if="type === 'login'")
                    van-field(
                        v-model="userInfo.tel"
                        placeholder="手机号"
                        name="pattern"
                        :rules="[{ pattern, message: '手机号格式错误' }]"
                    )
                template(v-if="type === 'login'")
                    van-field(
                        v-model="userInfo.name"
                        name="用户名"
                        placeholder="用户名"
                    )
                template(v-if="!!type")
                    van-field(
                        v-model="userInfo.pwd"
                        type="password"
                        name="pwdPattern"
                        placeholder="密码"
                        :rules="[{ pwdPattern, message: '请输入正确内容' }]"
                    )
                template(v-if="type === 'login'")
                    van-field(
                        v-model="userInfo.pwdSure"
                        type="password"
                        name="确认密码"
                        placeholder="确认密码"
                    )
                template(v-if="type === 'login'")
                    van-field(
                        v-model="userInfo.email"
                        name="邮箱"
                        placeholder="邮箱"
                    )
            
    .down
        .button
            van-button(round block type="info" native-type="submit" @click="loginForm(type)") {{ !type ? '下一步' : type === 'login' ? '注册' : '登录' }}
</template>
 
<script>
import { mapMutations, mapGetters } from 'vuex'
import _ from 'lodash'
import { getUserTest, registerUser, loginUser } from 'api/User'
export default {
 name: 'login',
 components: {
     
 },
 data () {
 return {
     userInfo: {
         tel: '小明',
         pwd: 'junge1998925',
         name: '小明',
         email: '',
         bidthday: '',
         pwdSure: ''
     },
     type: '',
     key: ''
 }
 },
  methods: {
      ...mapMutations(['setUserInfo']),
      async loginForm (type) {
          if (!type) {
              this.type = _.get(await getUserTest(this.userInfo.tel), 'type')
              this.key = _.get(await getUserTest(this.userInfo.tel), 'key')
          }
          if (type === 'login') {
              console.log(await loginUser(this.userInfo))
          }
          if (type === 'register') {
              try {
                const userInfo = await registerUser({ user: this.userInfo.tel, pwd: this.userInfo.pwd, userKey: this.key })
                this.setUserInfo(userInfo)
                this.$notify({ type: 'success', message: '登录成功' });
                this.$router.push(this.$route.query.redirect === '/login' || !this.$route.query.redirect ? '/home' : this.$route.query.redirect)
              } catch (e) {
                this.$notify({ type: 'danger', message: '账号或密码错误' });
              }
          }
    }
  },
  computed: {
      ...mapGetters(['getUserInfo']),
      pattern () {
          return /^1[3579]\d{9}$/
      },
      pwdPattern () {
          return /\d+/
      }
  }
}
</script>
 
<style lang="sass" scoped>
.login-register-model
    .up
        i
            font-weight: 700
    .middle
        padding-top: 100px
        margin-bottom: 50px
        .middle-up
            .middle-img
                display: flex
                margin-bottom: 30px 
                .img
                    animation-name: shaky-slow
                    animation-duration: 3s
                    animation-iteration-count: infinite
                    animation-timing-function: ease-in-out
                    animation-delay: 0s
                    animation-play-state: running
                    img
                        width: 100px
                        height: 100px
                        margin-right: 20px
                .img-text
                    font-size: 40px
                    line-height: 100px
                    font-family: "STXinwei Yahei", Times, serif
            h1
                font-size: 60px
                color: #333
                font-family: "Microsoft Yahei", Times, serif
        .middle-down
            padding-top: 100px
            .van-cell
                margin-bottom: 30px
                background-color: #F6F6F6
                border-radius: 12px
                height: 120px
                display: flex
                align-items: center
                font-family: "Microsoft Yahei", Times, serif
                font-weight: 700
                ::v-deep input
                    font-size: 40px
                    &::placeholder 
                        font-weight: 400
            .icon
                i
                    color: #B4B4B4
                    font-weight: 400
                    font-size: 45px
    .down
        .van-button
            border-radius: 12px
            height: 100px
@keyframes shaky-slow
    10%, 90%
        transform: translate3d(-1px, 0, 0)
    20%, 80%
        transform: translate3d(+2px, 0, 0)
    30%, 70%
        transform: translate3d(-4px, 0, 0)
    40%, 60%
        transform: translate3d(+4px, 0, 0)
    50%
        transform: translate3d(-4px, 0, 0)
</style>