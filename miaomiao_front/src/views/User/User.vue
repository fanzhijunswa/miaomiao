<template lang="pug">
.user 
    header-title 
        .title {{'个人中心'}}
    .content
        van-cell-group
            van-cell(title="头像" @click="popFlag = !popFlag")
                .cover-cell-right(slot="default")
                    .cover-cell
                        .cover
                            span(v-if="!newUserInfo.cover" ref="span") {{ getUserInfo.name | coverFilter }}
                            img(v-else ref="image" :src="newUserInfo.cover")
                        .cover-right
                            i(class="iconfont icon-zhankai1")
            van-cell(title="昵称" @click="$router.push({path:'/editUser',query:{type:'name',value: !!newUserInfo.name ? newUserInfo : getUserInfo }})")
                .cover-cell-right(slot="default")
                    .cover-cell
                        span {{ newUserInfo.name }}
                        .cover-right
                            i(class="iconfont icon-zhankai1")
            van-cell(title="性别" @click="sexFlag = !sexFlag")
                .cover-cell-right(slot="default")
                    .cover-cell
                        span {{ newUserInfo.sex | sexFilter }}
                        .cover-right
                            i(class="iconfont icon-zhankai1")
            van-cell(title="出生年月" @click="$router.push({path:'/editUser',query:{type:'birthday',value: !!newUserInfo.birthday ? newUserInfo : getUserInfo}})")
                .cover-cell-right(slot="default")
                    .cover-cell
                        span {{ newUserInfo.birthday | birthdayFilter}}
                        .cover-right
                            i(class="iconfont icon-zhankai1")
            van-cell(title="个性签名" @click="$router.push({path:'/editUser',query:{type:'introduce',value:!!newUserInfo.introduce ? newUserInfo : getUserInfo}})")
                .cover-cell-right(slot="default")
                    .cover-cell
                        span {{ !!newUserInfo.introduce ? newUserInfo.introduce  :'快来介绍下自己吧~'}}
                        .cover-right
                            i(class="iconfont icon-zhankai1")
        van-button(type="primary" @click="mySave") 保存修改
    van-popup(v-model="popFlag" position="bottom" :style="{ height: '30%' }")
        van-cell-group
            van-cell(@click="$refs.upload.click()")
                span 从相册中选择
            van-cell(@click="(newUserInfo.cover = '',popFlag = false)")
                span 恢复默认头像
                input(type="file" ref="upload" style="display:none" @change="fileChange")
            van-cell(@click="popFlag = false")
                span 取消
    van-popup(v-model="sexFlag" position="bottom" :style="{ height: '30%' }")
        van-cell-group
            van-cell(@click="(newUserInfo.sex = 1,sexFlag = false)")
                span 男
            van-cell(@click="(newUserInfo.sex = 0,sexFlag = false)")
                span 女
            van-cell 
                span(@click="sexFlag = false") 取消
        //- van-button(type="primary" @click="loginOut") 退出登录
    tab-bar
</template>
 
<script>
import _ from 'lodash'
import HeaderTitle from "components/HeaderTitle"
import TabBar from "components/TabBar"
import { mapGetters, mapMutations } from 'vuex'
import { editUser } from 'api/User'
export default {
 name: 'User',
 components: {
   HeaderTitle,
   TabBar
 },
 data () {
 return {
     popFlag: false,
     showPic: true,
     sexFlag: false,
     newUserInfo: {
         _id: '',
         cover: '',
         name: '',
         birthday: '',
         sex: '',
         introduce: ''
     }
 }
 },
 filters: {
     sexFilter(val) {
         return val ? '男' : '女'
     },
     coverFilter (val) {
        switch (typeof val) {
            case 'string': return val.toUpperCase().slice(0, 1)
            case 'number': return val.slice(0, 1)
            default: return val
        }
     }
 },
 mounted() {
     let { name, sex, cover, birthday, introduce, _id } = this.getUserInfo
     _.forEach({ name, sex, cover, birthday, introduce, _id }, (v, k) => { this.newUserInfo[k] = v })
    console.log(this.getUserInfo)
    console.log(this.newUserInfo)
 },
 activated () {
     const { value = '', type = '' } = this.$route.query
    switch (true) {
        case !value || !type : return false
        case type === 'birthday': this.newUserInfo[type] = +value; break;
        default: this.newUserInfo[type] = value
    }    
 },
 computed: {
   ...mapGetters(['getUserInfo', 'getToken'])
 },
  methods: {
    ...mapMutations(['removeUserInfo', 'setUserInfo']),
    async mySave () {
        let formData = new FormData()
        _.forEach(this.newUserInfo, (v, k) => { (v !== this.getUserInfo[k] || k === '_id') && formData.append(k, v) })
        this.setUserInfo({ ...await editUser(formData), token: this.getToken })
    },
    changeSex () {
        this.$nextTick(() => {
            this.newUserInfo.sex = '女'
        })
    },
    fileChange ({ target: { files: [fileObj] } }) {
        if (!/image\/((png)|(jpeg))/.test(fileObj.type)) {
            this.popFlag = false
            this.$toast.fail('文件格式错误');
            return false
        }
        const reader = new FileReader()
        reader.readAsDataURL(fileObj)
        reader.onloadend = ({ target: { result } }) => {
            this.showPic = true
            this.newUserInfo.cover = fileObj
            this.$nextTick(() => {
                this.$refs.image.src = result
                this.popFlag = false
            })
        }
    },
    loginOut () {
        this.removeUserInfo()
        this.$router.push('/home')
    }
  }
}
</script>
 
<style lang="sass" scoped>
.user
    padding: 120px 0
    height: 100vh
    background-color: #F3F3F3
    .content
        &>.van-cell-group
            &>.van-cell
                line-height: 100px
                align-items: center
                .van-cell__value
                    display: flex
                    justify-content: flex-end
                    .cover-cell
                        display: flex
                        justify-content: center
                        align-items: center
                        .cover
                            width: 120px
                            height: 120px
                            border: 2px solid #CCC
                            border-radius: 50%
                            display: flex
                            justify-content: center
                            align-items: center
                            margin-right: 20px
                            overflow: hidden
                            span
                                font-size: 40px
                            img
                                width: 100%
                                height: 100%
                        .cover-right
                            i
                                font-size: 40px
.van-popup
    border-radius: 20px
    .van-cell
        line-height: 70px
        .van-cell__value
            text-align: center
        
</style>