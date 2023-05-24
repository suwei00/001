<script setup lang='ts' name="bank-card">
// 银行卡卡片组件
import bankImg from '@images/personal/wallet/bank-card.png?preset=full'
import bankIconImg from '@images/personal/wallet/bank-icon.png?preset=full'
import type { F } from 'ts-toolbelt'
import type { ArrElement } from '~/api/type'
type itemProps = ArrElement<Awaited<F.Return<typeof getMyBankList>>>
interface Props {
  data: itemProps
}
const { data } = defineProps<Props>()
// 获取银行卡列表
const { data: bankList } = $(useRequest(() => getBankList('010')))
// 银行卡名称
const bankName = $computed(() => {
  if (!bankList?.length || !data?.bank_id)
    return ''
  return get(find(bankList, { id: +data.bank_id }), 'name', '')
})
const bankCard = $computed(() => data?.bank_card)
</script>

<template>
  <div :style="getBackgroundImgObj(bankImg)" class="bank-card">
    <div class="header">
      <div class="name-box">
        <jl-image :src="bankIconImg" w-40px h-40px />
        <div class="user-box">
          <span class="username">{{ data.realname }}</span>
          <transition appear>
            <span v-if="bankName" class="bank-name">{{ bankName }}</span>
          </transition>
        </div>
      </div>
      <span class="type">银行卡</span>
    </div>
    <div class="bank-no">
      {{ bankCard }}
    </div>
    <transition>
      <div v-if="data.state !== 1" class="disabled-box">
        <i class="i-personal-wallet-disabled" w-30px h-30px />
        <span>暂时停用</span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@include fade;

.bank-card {
  width: 320px;
  height: 136px;
  border-radius: 6px;
  box-shadow: $jl-box-shadow;
  padding: 17px 25px 13px 20px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;

    .name-box {
      display: flex;

      .user-box {
        padding-left: 9px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .username {
          font-size: 15px;
          font-family: $jl-font;
          line-height: 20px;
        }

        .bank-name {
          font-size: 13px;
          line-height: 20px;
        }
      }
    }

    .type {
      font-size: 18px;
      font-family: $jl-font;
      font-weight: bold;
      line-height: 25px;
    }
  }

  .bank-no {
    color: #fff;
    font-size: 26px;
    font-family: $jl-font;
    line-height: 37px;
    padding-left: 10px;
    text-align: left;
  }

  .disabled-box {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: not-allowed;
    border-radius: 6px;
    user-select: none;

    span {
      padding-left: 8px;
      font-size: 15px;
      font-family: $jl-font;
      font-weight: bold;

    }
  }
}
</style>
