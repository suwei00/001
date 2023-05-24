<script lang="ts" setup>
// component
import TotalAmountExhibit from './totalAmountExhibit.vue'
import VenueAmountExhibit from './venueAmountExhibit.vue'
import amountHooks from '~/hooks/amountHooks'
import bgImage from '~/components/bgImage.vue'
import RefreshAmount from '~/components/refreshAmount.vue'
// 背景图
import bgSrc1 from '~/assets/images/my/recycle.png?preset=full'
import bgSrc2 from '~/assets/images/my/oddDown.png?preset=full'
import bgSrc3 from '~/assets/images/my/oddUp.png?preset=full'

interface Props {
  type?: number // 1: 钱包样式 2: 其他样式
  transferIn?: boolean // 是否显示转入按钮 false 不显示 true 显示
  isOnPut?: boolean// 是否显示展开
}
withDefaults(defineProps<Props>(), {
  type: 2,
  transferIn: false,
  isOnPut: true,
})
const { oneKeyRecycle } = amountHooks()
const putVisible = ref(false)
const onPut = () => {
  putVisible.value = !putVisible.value
}
</script>

<template>
  <div class="amountExhibitWarp">
    <div class="mainWarp">
      <div class="head">
        <div class="headL">
          <span>钱包金额</span>
          <RefreshAmount refresh-type="2" />
        </div>
        <div class="headR" @click="oneKeyRecycle()">
          <bgImage :image="bgSrc1" />
          <span>一键回收</span>
        </div>
      </div>
      <TotalAmountExhibit />
      <div class="putVisibleHide" :class="{ putVisibleShow: putVisible || !isOnPut }">
        <VenueAmountExhibit :type="type" :transfer-in="transferIn" />
      </div>
    </div>
    <div v-show="isOnPut" class="putWarp" @click="onPut()">
      <span v-show="!putVisible">展开</span>
      <span v-show="putVisible">收起</span>
      <bgImage v-show="!putVisible" :image="bgSrc2" />
      <bgImage v-show="putVisible" :image="bgSrc3" />
    </div>

    <VenueRecyclDialog />
  </div>
</template>

<style lang="scss" scoped>
.amountExhibitWarp {
  width: 100%;
  margin-top: 10px;
  color: #000000;
  background-color: #fff;

  .mainWarp {
    width: 100%;
    padding: 0 18px;

    .head {
      width: 100%;
      height: 35px;
      border-bottom: 1px solid #FAFAFA;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .headL {
        display: flex;
        align-items: center;

        span {
          margin-right: 8px;
        }
      }

      .headR {
        display: flex;
        align-items: center;

        span {
          margin-left: 5px;
          color: #2674FF;
          font-size: 12px;
        }

       img{
          width: 15px;
          height: 13px;
        }
      }
    }
  }

  .putWarp {
    width: 100%;
    height: 33px;
    border-top: 1px solid #EFEFEF;
    color: #5E76A2;
    display: flex;
    justify-content: center;
    align-items: center;

   img{
      width: 12px;
      height: 16px;
      margin-left: 4px;
    }
  }
}

.putVisibleHide {
  width: 100%;
  max-height: 64px;
  overflow: hidden;
  transition: max-height 0.4s;
}

.putVisibleShow {
  max-height: 500px;
}
</style>
