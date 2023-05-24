<script setup lang='ts' name="wallet-transfer">
// 场馆钱包到中心钱包互转组件
import toImg from '@images/personal/wallet-transfer/to.png?preset=full'
import type { GlobalComponents } from 'vue'
const props = defineProps<{ rightVal: string; leftVal: string }>()
const emit = defineEmits<{
  (e: 'update:leftVal', value: string): void
  (e: 'update:rightVal', value: string): void
}>()
let { leftVal, rightVal } = $(useVModels(props, emit))
const appStore = useAppStore()
const { platList } = $(storeToRefs(appStore))
// 是否所有场馆钱包均维护
const isAllDisable = $computed(() => platList.every(p => p.enable === false))

// 中心钱包id，前端自定义的
const CENTER_WALLET_ID = '0000'
// 中心钱包
const centerWallet = [{
  wallet_id: CENTER_WALLET_ID,
  wallet_name: '中心钱包',
  maintained: 1,
  enable: true,
}]
// TODO: 去重，浆糊代码，去重后的场馆钱包列表
const validPlatList = $computed<any[]>(() => {
  if (!platList)
    return []
  return [...centerWallet, ...platList]
})

// 左侧钱包列表
const leftOptions = $computed(() => {
  if (isAllDisable)
    return centerWallet
  if (!rightVal)
    return []
  // 右侧选中了中心钱包
  return rightVal === CENTER_WALLET_ID ? validPlatList.slice(1) : validPlatList
})
// 右侧钱包列表
const rightOptions = $computed(() => {
  if (!leftVal)
    return []
  // 左侧选中了中心钱包
  return leftVal === CENTER_WALLET_ID ? validPlatList.slice(1) : validPlatList
})

const handleLeftChange: InstanceType<GlobalComponents['ElSelect']>['onChange'] = (val) => {
  //  如果左边没有选中中心钱包，右边就选中中心钱包
  if (val && val !== CENTER_WALLET_ID)
    rightVal = CENTER_WALLET_ID
}
const handleRightChange: InstanceType<GlobalComponents['ElSelect']>['onChange'] = (val) => {
  console.log('🚀 ~ file: index.vue ~ line 56 ~ val', val)
  //  如果右边没有选中中心钱包，左边就选中中心钱包
  if (val && val !== CENTER_WALLET_ID)
    leftVal = CENTER_WALLET_ID
}

// 设置初始值
onMounted(() => {
  leftVal = validPlatList[0].wallet_id
  nextTick(() => {
    rightVal = rightOptions.find((item: any) => item.maintained === 1).wallet_id
  })
})
</script>

<template>
  <h6 class="tips">
    场馆内钱包不支持互转
  </h6>
  <div class="wallet-transfer">
    <el-select v-model="leftVal" style="width:230px" placeholder="请选择场馆钱包" @change="handleLeftChange">
      <el-option
        v-for="item in leftOptions.length ? leftOptions : validPlatList"
        v-show="item.enable" :key="item.wallet_id"
        v-model="leftVal" :disabled="item?.maintained !== 1" :label="item.wallet_name" :value="item.wallet_id"
      />
    </el-select>
    <jl-image :src="toImg" w-20px h-20px mx-16px />
    <el-select
      v-model="rightVal" :disabled="isAllDisable" style="width:230px"
      :placeholder="isAllDisable ? '场馆钱包维护中···' : '请选择场馆钱包'" @change="handleRightChange"
    >
      <el-option
        v-for="item in rightOptions.length ? rightOptions : validPlatList"
        v-show="item.enable"
        :key="item.wallet_id" v-model="leftVal" :label="item.wallet_name" :value="item.wallet_id"
      />
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.tips {
  font-size: 13px;
  font-family: $jl-font;
  font-weight: 400;
  color: #94A6B7;
  padding-top: 17px;
}

.wallet-transfer {
  padding-top: 19px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

}
</style>

