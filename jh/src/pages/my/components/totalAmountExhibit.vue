<script lang="ts" setup>
// hooks
import amountHooks from '~/hooks/amountHooks'
import bgImage from '~/components/bgImage.vue'

// 背景图
import bgSrc1 from '~/assets/images/my/greyWallet.png?preset=full'
import bgSrc2 from '~/assets/images/my/grayLocking.png?preset=full'
import bgSrc3 from '~/assets/images/my/grayBalance.png?preset=full'

const { centerAmount, freezeAmount } = amountHooks()
</script>

<template>
  <div class="totalAmountExhibitWarp">
    <dl>
      <dt>
        <div class="title">
          <bgImage :image="bgSrc1" />
          <span>中心钱包</span>
        </div>
        <div class="value">
          {{ reserveDecimal(centerAmount) }}
        </div>
      </dt>
      <dt>
        <div class="title">
          <bgImage :image="bgSrc3" />
          <span>余额宝</span>
        </div>
        <div class="value">
          {{ reserveDecimal(centerAmount) }}
        </div>
      </dt>
      <dt>
        <div class="title">
          <bgImage :image="bgSrc2" />
          <span>锁定钱包</span>
        </div>
        <div class="value">
          {{ reserveDecimal(freezeAmount) }}
        </div>
      </dt>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
.totalAmountExhibitWarp {
  width: 100%;
  height: 61px;
  display: flex;
  align-items: center;

  dl {
    width: 100%;
    display: flex;
    align-items: center;

    dt {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #515151;
        height: 18px;

        span {
          line-height: 13px;
        }

       img{
          width: 14px;
          height: 12px;
          margin-right: 4px;
        }
      }

      .value {
        font-size: 16px;
        font-weight: 800;
        color: #4080FF;
        line-height: 22px;
        height: 22px;
        margin-top: 3px;
      }
    }

    dd {
      width: 1px;
      height: 20px;
      background: #EEEEEE;
    }
  }
}
</style>
