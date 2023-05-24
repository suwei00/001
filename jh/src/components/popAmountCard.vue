<script setup lang='ts' name='financePopup'>
import closeImg from '~/assets/images/home/closeMes.png?preset=full'
const { type, id } = defineProps<{ type: 'deposit' | 'withdraw'; id: string }>()

// 是否弹窗提醒 true 要提示 false 不用提示
const popSetAmount = ref(true)
const checked = ref(false)
const popupRef = ref()

// close// 银行卡充值提现一个月不再提示
const closePop = () => {
  if (checked.value)
    readFinancePopup({ id })

  popupRef.value.remove()
}
const closePops = () => {
  popupRef.value.remove()
}
</script>

<template>
  
  <div ref="popupRef" class="pop_activity">
    <div class="pop_content">
      <van-popup v-model:show="popSetAmount" class="emergency_pop" round :close-on-click-overlay="false">
        <div class="close_icon">
          <bgImage :image="closeImg" class="close_img" @click="closePops" />
        </div>
        <div class="pop_title flex ai-c jc-c">
          温馨提示
        </div>
        <div class="bannerWarp">
          
          <div v-if="type === 'deposit'" class="text_content ">
            <p class="suo">
              1.为了更快为您核实上分，请您充值尾数<span class="num_bluec">1-9</span>的金额（例100<span
                class="num_bluec"
              >6</span>、4888<span class="num_bluec">9</span>)。<br>
            </p>
            <p class="suo">
              2.请您先进行转账成功后再提交本页面充值订单，转账金额一定要和提交金额保持一致！
            </p>
          </div>
          
          <div v-else-if="type === 'withdraw'" class="text_content withdraw_cont">
            <p>
              为了提现能更快到账，请您提现尾数<span class="num_bluec">1-9</span>的金额（例10<span class="num_bluec">3</span>、100<span class="num_bluec">5</span>)。
            </p>
          </div>
          <div class="check_box">
            <van-checkbox v-model="checked" :icon-size="15" checked-color="#597DF8" shape="square">
              本月不再提示
            </van-checkbox>
          </div>
        </div>
        <div class="flex_btn flex jc-c ai-c">
          <div class="addmore_btn" @click="closePop">
            我知道了
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/styles/banner_swiper.scss';

.flex_btn {
    background: #FFFFFF;
    margin-top: -2px;
}
.withdraw_cont{
    padding-top: 20px !important;
}
.num_bluec {
    color: #4F73F6;
}

.check_box {
    text-align: center;

    :deep(.van-checkbox) {
        justify-content: center;
    }
}

.pop_content {
    .van-popup {
        width: 260px;
        height: 216px;
        padding: 0 10px 10px 10px;
    }

    ::v-deep(.van-popup) {
        // background: #000 !important;
        background-color: transparent !important;
    }

    .bannerWarp {
        width: 260px;
        height: 145px;
        background: #ffffff;
        padding: 15px 11px 0 11px;

        .text_content {
            height: 105px;
            text-align: left;
            padding: 0;
            font-family: PingFangSC-Regular, PingFang SC;
        }

        .bannerSwipe {
            &:deep(.van-swipe__indicators) {
                bottom: 4.5px
            }

        }

    }

}
</style>

