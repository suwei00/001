<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash'
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
import { useUserInfoStore } from '~/store/userInfo'
const { token } = storeToRefs(useUserInfoStore())

const urlBase = `${isDev() ? 'https://jlcs001.com' : location.origin}/upload`
const route = useRoute()
const { id } = route.query
const { isShowHeader } = showHeader()
const titleImg = ref('')
const h5_content = ref([])// 表格后面的
const title = ref<string>('')// 标题
const isApply = ref<boolean>(false)// 活动状态
const amount = ref(0)// 昨日亏损金额

// 查看活动申请状态
const getApplyState = () => {
  if (id) {
    promoApplyStatusRequest({
      id: Number(id),
      flag: 'rescue',
    }).then((res: any) => {
      if (res.status)
        console.log(res.data)
      isApply.value = res.data
    })
  }
}

const tableData = ref([])
// 获取详情和查询前日输赢
const getDetail = () => {
  if (id) {
    promoDetailRequest({
      id: id.toString(),
      flag: 'rescue',
    }).then((res: any) => {
      let amountList: any = []

      if (res.status)
        titleImg.value = res.data.static.title_h5
      title.value = res.data.config.title
      h5_content.value = res.data.config.h5_content ?? []// 表格后面的
      tableData.value = cloneDeep(res.data.rules) ?? []
      amountList = res.data.rules.reverse()

      console.log(amountList)
      // 查询输赢
      if (!token.value)
        return
      getRescueProfitRequest().then((res2: any) => {
        if (res2.status)
          console.log(`*****查询前日输赢${res2.data}`)
        if (Number(res2.data) >= 0)
          return amount.value = 0
        if (amountList && amountList.length > 0) {
          // const resAmount = amountList.find((item: any) => item.lose_amount <= Math.abs(Number(res2.data)))
          amount.value = amountList.find((item: any) => item.lose_amount <= Math.abs(Number(res2.data)))?.bonus_amount || 0
          console.log(`*****${amount.value}`)
        }
        else { amount.value = 0 }
        console.log('金额：', amount.value)
      })
      getApplyState()
    })
  }
}
getDetail()
// 立即申请
const getNow = () => {
  if (id) {
    promoApplyRequest({
      id: id.toString(),
      flag: 'rescue',
      amount: amount.value,
      bonus_type: '1',
    }).then((res: any) => {
      if (res.status)
        Toast('申请成功')
    })
  }
}
</script>

<template>
  <div class="contentContainer">
    <Header v-if="isShowHeader" :key="title" :title="title" styles="color: #5D75A2;font-size: 17px;font-weight: 600;" />
    <div>
      <img loading="lazy" :src="`${urlBase}${titleImg}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
      <div class="content">
        <div class="tables">
          <div class="imgbox">
            <img loading="lazy" :src="`${urlBase}${h5_content[0]}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
          </div>

          <!-- <table cellspacing="0" width="100%">
            <tr>
              <th>昨日亏损金额</th>
              <th>赠送彩金</th>
              <th>流水限制</th>
            </tr>
            <tr v-for="({ lose_amount, bonus_amount, flow_multiple }, index) in tableData" :key="index">
              <td>{{ lose_amount }}</td>
              <td>{{ bonus_amount }}</td>
              <td>X{{ flow_multiple }}</td>
            </tr>
          </table> -->
          <van-button
            class="apply"
            :disabled="amount === 0"
            @click="getNow()"
          >
            立即申请
          </van-button>
        </div>
        <div class="imgbox">
          <img loading="lazy" :src="`${urlBase}${h5_content[1]}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .contentContainer{
        height: 100%;
        padding-bottom: 20px;
        overflow-y: scroll;
    }
.content{
    padding: 7px 15px ;
  .tables{
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 1px solid #DBE3FF;
    padding: 0 13px;
    margin-top: 8px;
    padding-bottom: 80px;
    border-radius: 8px;
    background-color: white;
    background-image: linear-gradient(rgba(224, 232, 254, 0.1), rgba(246, 248, 255, 0.1));
    .apply{
        position: absolute;
        width: 145px;
        height: 35px;
        border-radius: 16px;
        bottom: 22px;
        left: 50%;
        margin-left: -75px;
        font-size: 13px;
        font-weight: 500;
        color: white;
        background: linear-gradient(0deg, #5C79FF, #89A5FB);
    }
    tr{
      text-align: center;
      height: 50px;
    }
  }
 .imgbox{
    text-align: center;
    margin-top: 20px;
    img{
        width: 100%;
    }
 }
}
</style>

