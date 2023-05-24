<script setup lang='ts' name="deposit-tutorial">
import bankTransfer from '@images/personal/deposit/tutorial/bank-transfer.jpg?preset=full'
import usdt from '@images/personal/deposit/tutorial/usdt.png?preset=full'
import okpay from '@images/personal/deposit/tutorial/okpay.jpg?preset=full'
import gopay from '@images/personal/deposit/tutorial/gopay.jpg?preset=full'
import alipay from '@images/personal/deposit/tutorial/alipay-bank.jpg?preset=full'
import wechat from '@images/personal/deposit/tutorial/wechat-bank.jpg?preset=full'
import topay from '@images/personal/deposit/tutorial/topay.png?preset=full'

const { payList } = defineProps<{
  payList: {
    label: string
    value: string
    img: any[]
  }[]
}>()
const { isOpen, close } = usePersonalDialog()

// 充值方式
let currentId = $ref('')
let defaultId = $ref('')
// 充值子通道
let defaultSubId = $ref('')
const { data: channels, run: runGetChannels } = $(useRequest(
  () => getChannels(currentId),
  {
    manual: true,
    refreshDeps: [$$(currentId)],
    refreshDepsAction: () => {
      runGetChannels()
    },
    onSuccess(res) {
      defaultSubId = res[0].id
    },
  }))
const open = (id: string) => {
  isOpen.value = true
  currentId = id
  defaultId = id
}

// 充值子通道
const currentSubId = $ref('')
const subTypes = $computed(() => {
  return channels ? channels.map(item => ({ label: item.name, value: item.id })) : [{ label: '', value: '' }]
})

// 展示的教程
const tutorialImg = $computed(() => {
  if (currentId === '45')
    return bankTransfer

  if (currentId === '25') {
    if (currentSubId === '18')
      return okpay

    else if (currentSubId === '2')
      return gopay

    else if (currentSubId === '23')
      return topay

    else return usdt
  }
  if (currentId === '2')
    return alipay
  if (currentId === '1')
    return wechat
})

// 关闭选项卡
const selectRef: { [text: string]: any } = {
  s1: ref(),
  s2: ref(),
}
const hideSelect = (index: string | boolean) => {
  selectRef.s1.value.hide()
  selectRef.s2.value.hide()

  Boolean(index) && selectRef[`s${index}`].value.open()
}

defineExpose({
  open,
})
</script>

<template>
  <div v-if="isOpen" class="deposit-tutorial" @click.stop="hideSelect(false)">
    <div class="body">
      <div class="title" mb-21px>
        <h3>充值教程</h3>
        <div class="img">
          <img src="@icons/personal/finance/close-icon.svg" alt="" @click.stop="close">
        </div>
      </div>
      <!-- 选项 -->
      <nav>
        <div class="option">
          <label>充值方式</label>
          <deposit-select
            :ref="selectRef.s1" v-model="currentId" :default-id="defaultId" index="1" :options="payList"
            @open-select="hideSelect"
          />
        </div>
        <div class="option">
          <label>充值子通道</label>
          <deposit-select
            :ref="selectRef.s2" v-model="currentSubId" is-sub :default-id="defaultSubId" index="2"
            :options="subTypes" @open-select="hideSelect"
          />
        </div>
      </nav>
      <div class="tutorial">
        <el-scrollbar always max-height="538px">
          <img :src="getSupportImage(tutorialImg ?? [])" alt="">
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.deposit-tutorial {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 0%, 30%);
  z-index: 2000;
  color: #333333;
  font-size: 15px;
}

.body {
  width: 840px;
  height: 690px;
  background: #FFFFFF;
  box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 32px 35px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 18px;
      font-family: $jl-font;
      font-weight: bold;
    }

    .img {
      padding: 5px;
      cursor: pointer;

      img {
        width: 14px;
        height: 14px;
      }

    }
  }
}

nav {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .option {
    display: flex;
    align-items: center;
    position: relative;

    label {
      text-align: left;
      margin-right: 16px;
    }

    select {
      width: 280px;
      padding: 10px 15px 11px;
      border: 1px solid #C5C5C5;
      border-radius: 6px;

      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
    }

    .arrow {
      rotate: -90deg;
      position: absolute;
      right: 20px;
      width: 6.91px;
      height: 12px;
    }
  }
}

.tutorial {
  width: 100%;
  height: 538px;
  margin-top: 12px;
}
</style>
