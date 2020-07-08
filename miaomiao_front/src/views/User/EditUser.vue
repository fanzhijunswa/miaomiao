<template lang="pug">
.edit-user
    header-title
        header-title(:leftandRight="1")
            .left(slot="left" @click="$router.go(-1)")
                i(class="iconfont icon-fanhui4")
            .title {{ getTitle }}
            .right(slot="right")
                .right-text(@click="$router.push({path:'/userInfo',query:{value: $route.query.type === 'birthday' ? newValue :value,type:$route.query.type}})") {{ '保存' }}
    template(v-if="$route.query.type === 'name'")
        .content
            van-field(ref="field" clearable v-model="value" :placeholder="`请输入${getTitle}`")
    template(v-else-if="$route.query.type === 'birthday'")
        .time-all
            .time-up
                .time-left 日期
                .time-right {{ value | valueFilter }}
            .time-down
                van-datetime-picker(
                    :min-date="minDate"
                    :max-date="maxDate"
                    v-model="value"
                    type="date")
    template(v-else)
        .introduce
            van-field(
                ref="text",
                v-model="value"
                rows="2"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit)

//-   h2 hahah
</template>
 
<script>
import { DatetimePicker } from 'vant'
import { mapGetters } from 'vuex'
import HeaderTitle from "components/HeaderTitle"
export default {
 name: 'edit-user',
 components: {
    HeaderTitle,
    [DatetimePicker.name]: DatetimePicker
 },
 created () {
     const { value, type } = this.$route.query
     switch (type) {
        case 'name': this.value = value[type]; break;
        case 'birthday': this.value = new Date(value[type]); break;
        case 'introduce': this.value = value[type]; break;
     }
 },
 filters: {
     valueFilter (val) {
        const year = val.getFullYear()
        const month = val.getMonth() + 1 < 10 ? '0' + (val.getMonth() + 1) : val.getMonth() + 1
        const day = val.getDate() < 10 ? '0' + val.getDate() : val.getDate()
        return `${year}-${month}-${day}`
     }
 },
 mounted() {
    this.$route.query.type === 'name' && this.$refs.field.focus()
    this.$route.query.type === 'introduce' && this.$refs.text.focus()
 },
 computed: {
     newValue () {
         return new Date(this.value).getTime()
     },
     ...mapGetters(["getUserInfo"]),
    minDate () {
        return new Date(1900, 1, 1)
    },
    maxDate () {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() 
        const day = date.getDate()
        return new Date(year, month, day)
    },
    getTitle () {
        if (!this.$route.query.type) return ''
        switch (this.$route.query.type) {
            case 'name': return '昵称'
            case 'sex': return '性别'
            case 'birthday': return '出生年月'
            case 'introduce': return '个性签名'
            default: return '错误'
        }
     }
 },
 data () {
 return {
    value: ''
 }
 },
  methods: {}
}
</script>
 
<style lang="sass" scoped>
.edit-user
    height: 100vh
    background-color: #F3F3F3
    padding: 120px 0 80px
    .time-all
        .time-up
            display: flex
            justify-content: space-between
        padding: 0 20px
        height: 100%
        display: flex
        flex-direction: column
        justify-content: space-between
        .time-down
            border-top-left-radius: 12px
            border-top-right-radius: 12px
            overflow: hidden
            ::v-deep .van-picker__toolbar
                display: none
</style>