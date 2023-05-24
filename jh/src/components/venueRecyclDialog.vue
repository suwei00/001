<script lang="ts" setup>
import bg1 from '~/assets/images/my/time.gif'

const { oneKeyRecycleLoading } = storeToRefs(useUserInfoStore())
const { oneKeyRecycleLoadingClose } = useUserInfoStore()

const onConfirm = () => {
  oneKeyRecycleLoadingClose()
}
</script>

<template>
  <van-overlay :show="oneKeyRecycleLoading" class="dialogWarp">
    <div class="wrapper">
      <div class="content">
        <div class="body">
          <p>场馆钱包回收中，请勿离开此页面</p>
          <img loading="lazy" :src="bg1">
        </div>
      </div>
      <div class="foot">
        <button class="confirm" @click="onConfirm()">
          确定
        </button>
      </div>
    </div>
  </van-overlay>
</template>

  <style lang="scss" scoped>
  .dialogWarp {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);

    .wrapper {
      width: 260px;
      min-height: 135px;
      background: rgba(242, 242, 242, 1);
      border-radius: 14px;
      backdrop-filter: blur(19px);
      display: flex;
      flex-direction: column;

      .content {
        flex: 1;
        width: 100%;
        height: 100%;
        padding: 20px 20px 0 20px;

        .body {
          width: 100%;
          min-height: 21px;
          line-height: 21px;
          font-size: 13px;
          display: flex;
          flex-direction: column;
          align-items: center;
          p{
            padding-bottom: 6px;
          }
          img {
            width: 39px;
          }
        }
      }

      .foot {
        width: 100%;
        height: 42px;
        border-top: 1px solid rgba(60, 60, 67, 0.36);
        display: flex;
        overflow: hidden;

        button {
          width: 100%;
          font-size: 15px;
          color: #858585;

          &.confirm {
            color: #597EF7;
          }
        }
      }
    }
  }
  </style>

