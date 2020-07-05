<template lang="pug">
.login-register-model
    .up
        i(class="iconfont icon-fanhui-copy-copy" @click="$router.go(-1)")
    .middle
        .middle-up
            .middle-img
                .img
                    img(src="../../assets/images/cat.png")
                .img-text 喵喵电影
            h1 {{ !type ? '请输入帐号' : type === 'login' ? '欢迎注册喵喵电影' : '欢迎登录喵喵电影' }}
        van-form
            .middle-down
                van-field(
                    v-if="!type"
                    v-model="allNumber"
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
                        label="手机号："
                        placeholder="手机号"
                        name="手机号"
                        :rules="[{ pattern: telPattern, message: '手机号格式错误' }]"
                    )
                template(v-if="type === 'login'")
                    van-field(
                        v-model="userInfo.name"
                        label="用户名："
                        name="用户名"
                        placeholder="用户名"
                        :rules="[{ pattern:namePattern, message: '用户名不能多于8位' }]"
                    )
                template(v-if="!!type")
                    van-field(
                        v-model="userInfo.pwd"
                        label="密码："
                        type="password"
                        name="密码"
                        placeholder="密码"
                        :rules="[{ pattern:pwdPattern, message: '密码由英文字母、数字、下划线组成' }]"
                    )
                template(v-if="type === 'login'")
                    van-field(
                        v-model="userInfo.pwdSure"
                        label="确认密码："
                        type="password"
                        name="确认密码"
                        placeholder="确认密码"
                        :rules="[{ validator:surePwdValidator, message: '两次密码输入不一致' }]"
                    )
                template(v-if="type === 'login'")
                    van-field(
                        label="邮箱："
                        v-model="userInfo.email"
                        name="邮箱"
                        placeholder="邮箱"
                        :rules="[{ pattern:emailPattern, message: '邮箱格式错误' }]"
                    )
            
    .down
        .button
            van-button(:loading="buttonLoading" loading-type="spinner" loading-text="玩命加载中" v-if="!type" round block type="info" native-type="submit" @click="nextType(type)") {{ '下一步' }}
            van-button(:loading="buttonLoading" loading-type="spinner" loading-text="玩命加载中" v-else-if="type === 'login'" round block type="info" @click="login" native-type="submit") {{'注册'}}
            van-button(:loading="buttonLoading" loading-type="spinner" loading-text="玩命加载中" v-else round block type="info" native-type="submit" @click="loginForm(type)") {{ '登录' }}
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
     allNumber: '',
     userInfo: {
         tel: '13147944665',
         pwd: 'junge1998925',
         name: 'xxxxx',
         email: '2456080907@qq.com',
         pwdSure: 'junge1998925'
     },
     type: '',
     key: '',
     buttonLoading: false
 }
 },
  methods: {
      async nextType () {
        const data = await getUserTest(this.allNumber)
        this.type = data.type
        this.key = data.key
      },
      async login () {
        this.buttonLoading = true
        await this.$sleep()
        const data = await loginUser(this.userInfo)
        this.buttonLoading = false
        this.setUserInfo(data)
        this.$notify({ type: 'success', message: '登录成功' })
        await this.$sleep()
        // this.$router.push(this.$route.query.redirect === '/login' || !this.$route.query.redirect ? '/userInfo' : this.$route.query.redirect)
      },
     
      surePwdValidator (val) {
          return new RegExp('^' + this.userInfo.pwd + '$').test(this.userInfo.pwdSure)
      },
      ...mapMutations(['setUserInfo']),
      async loginForm (type) {  
        try {
            this.buttonLoading = true
            await this.$sleep()
            const userInfo = await registerUser({ user: this.allNumber, pwd: this.userInfo.pwd, userKey: this.key })
            this.buttonLoading = false
            this.setUserInfo(userInfo)
            this.$notify({ type: 'success', message: '登录成功' });
            await this.$sleep()
            this.$router.push(this.$route.query.redirect === '/login' || !this.$route.query.redirect ? '/home' : this.$route.query.redirect)
        } catch (e) {
            this.buttonLoading = false
            this.$notify({ type: 'danger', message: '账号或密码错误' });
        }
    }
  },
  computed: {
      ...mapGetters(['getUserInfo']),
      telPattern () {
          return /^1[3579]\d{9}$/
      },
      pwdPattern () {
          return /^\w{6,12}$/
      },
      namePattern () {
          return /^[\w\u4e00-\u9fa5]{1,8}$/
      },
      emailPattern () {
          return /^\w+@[a-zA-Z0-9]+\.com$/
      }
  }
}
</script>
 
<style lang="sass" scoped>
.login-register-model
    padding: 80px
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