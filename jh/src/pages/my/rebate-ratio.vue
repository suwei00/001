<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'

const oldRebateRatio = {
  zr: 0,
  qp: 0,
  ty: 0,
  dj: 0,
  dz: 0,
  by: 0,
  k3: 0,
  pk10: 0,
  ssc: 0,
  luck28: 0,
  ll5: 0,
  lhc: 0,
}
const rebateRatio = ref(oldRebateRatio)

const init = (resolve: any = undefined, type: any = undefined) => {
  memberRebateScaleRequest().then((res: any) => {
    if (res.status)
      rebateRatio.value = res.data ?? oldRebateRatio
  }).finally(() => {
    resolve && resolve({ noPass: false })
  })
}
</script>

<template>
  <div class="rebateRatioWarp">
    <Header title="返水比例" />
    <div class="rebateRatioMain">
      <CustomizePullDownUp
        :pull-up="false" :list="[]" :first-down-load="true" :is-no-data="false"
        @init="init"
      >
        <template #bSContent>
          <ol>
            <li>
              <span>真人</span>
              <span>{{ rebateRatio.zr }}%</span>
            </li>
            <li>
              <span>体育</span>
              <span>{{ rebateRatio.ty }}%</span>
            </li>
            <li>
              <span>棋牌</span>
              <span>{{ rebateRatio.qp }}%</span>
            </li>
            <li>
              <span>电子</span>
              <span>{{ rebateRatio.dz }}%</span>
            </li>
            <li>
              <span>捕鱼</span>
              <span>{{ rebateRatio.by }}%</span>
            </li>
            <li>
              <span>电竞</span>
              <span>{{ rebateRatio.dj }}%</span>
            </li>
          </ol>
          <ol>
            <li>
              <p>彩票返点</p>
            </li>
            <li>
              <span>快3</span>
              <span>{{ rebateRatio.k3 }}</span>
            </li>
            <li>
              <span>PK10</span>
              <span>{{ rebateRatio.pk10 }}</span>
            </li>
            <li>
              <span>时时彩</span>
              <span>{{ rebateRatio.ssc }}</span>
            </li>
            <li>
              <span>六合彩</span>
              <span>{{ rebateRatio.lhc }}</span>
            </li>
            <li>
              <span>11选5</span>
              <span>{{ rebateRatio.ll5 }}</span>
            </li>
            <li>
              <span>幸运28</span>
              <span>{{ rebateRatio.luck28 }}</span>
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rebateRatioWarp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #F5F5F9;
  color: #000000;

  .rebateRatioMain {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-top: 1px solid #E5E5E5;

    ol {
      width: 100%;
      padding: 0 18px;
      background-color: #fff;
      margin-top: 5px;

      &:first-child {
        margin-top: 0;
      }

      li {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #F3F3F3;
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
          width: 100%;
          text-align: center;
          font-size: 13px;
          font-weight: 800;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
