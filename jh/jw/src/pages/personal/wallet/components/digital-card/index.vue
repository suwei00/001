<script setup lang='ts' name="digital-card">
// 数字货币卡片组件
import digitalImg from '@images/personal/wallet/digital-card.png?preset=full'
import digitalIconImg from '@images/personal/wallet/digital-icon.png?preset=full'
import type { F } from 'ts-toolbelt'
import type { ArrElement } from '~/api/type'
type itemProps = ArrElement<Awaited<F.Return<typeof getDigitalList>>>
interface Props {
  data: itemProps
}
const { data } = defineProps<Props>()
// 别名
const alias = $computed(() => data?.wallet_alias)
// 地址
const addr = $computed(() => data?.wallet_address)
// 协议
const walletAgreements = $computed(() => data?.wallet_agreements)
</script>

<template>
  <div :style="getBackgroundImgObj(digitalImg)" class="digital-card">
    <div class="header">
      <div class="name-box">
        <jl-image :src="digitalIconImg" w-40px h-40px />
        <div class="user-box">
          <span class="username">{{ alias }}</span>
          <span class="bank-name">{{ walletAgreements }}</span>
        </div>
      </div>
      <span class="type">数字货币</span>
    </div>
    <div class="addr">
      {{ addr }}
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
.digital-card {
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
  position: relative;
  justify-content: space-between;

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
        align-items: center;

        .username {
          font-size: 15px;
          font-family: $jl-font;
          line-height: 20px;
          height: 20px;
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

  .addr {
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
