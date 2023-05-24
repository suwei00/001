<script lang="ts" setup>
import { Toast } from 'vant'
import closeImg from '~/assets/images/home/closeMes.png?preset=full'
import { isRealName } from '~/utils/validate'
import useBackRouter from '~/hooks/routerBackHooks'
const appStore = useAppStore()
const { pop } = $(storeToRefs(appStore))
const { openLoading, closeLoading } = useLoading()
const { getMemberInfo } = useUserInfoStore()
const { closePop } = usePop()
const { goTo } = useBackRouter()
const params: any = ref({
  realname: '',
})
// close
const closePops = () => {
  closePop()
}

const errorText = ref('')
const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'realname':
      if (!isRealName(newVal) && params.value[name].length)
        errorText.value = '请正确输入真实姓名'
      else
        errorText.value = ''
      break
  }
}
const disabled = computed(() => {
  if (params.value.realname.length < 2)
    return true
  if (!isRealName(params.value.realname))
    return true
  return false
})
const onConfirm = () => {
  openLoading()
  bindAddressRequest(params.value).then((res: any) => {
    if (res.status && res.data) {
      Toast('提交成功')
      getMemberInfo()
      closePop()
      goTo('/my/recharge')
    }
    closeLoading()
  })
}
</script>

<template>
  
  <div v-if="pop" class="pop_activity">
    
    <div class="pop_content">
      <van-popup v-model:show="pop" class="emergency_pop" round @click-overlay="closePops">
        <div class="close_icon">
          <bgImage :image="closeImg" class="close_img" @click.stop="closePops" />
        </div>
        <div class="pop_title flex ai-c jc-c">
          温馨提示
        </div>
        <div class="bannerWarp">
          <div class="text_contents">
            充值前请先填写您的真实姓名，以便我们快速核实上分！
          </div>
          <div class="realInput" :class="errorText !== '' ? 'act_bor' : '' ">
            <CustomizeInput
              v-model="params.realname"
              placeholder="请输入您的真实姓名" :maxlength="30" input-type="realname"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'realname'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'realname') }"
            />
          </div>
          
          <div class="errorTips font_nine">
            <span>{{ errorText }}</span>
          </div>
          <div class="cg_zhu ">
            <div class="font_nine">
              注:为保障个人隐私安全，提交后无法修改，请确保无误！
            </div>
          </div>
        </div>
        <div class="flex_btn flex jc-c ai-c">
          <div class="btnvan">
            <van-button
              class="customizeSubmit" :disabled="disabled" loading-type="spinner"
              loading-text="加载中..." @click="onConfirm()"
            >
              确认填写
            </van-button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/styles/banner_swiper.scss';
// .font_nine{
//     transform-origin: 0 18px;
//     font-size: 9px;
// transform:scale(0.75);
// -ms-transform:scale(0.75);     /* IE 9 */
// -moz-transform:scale(0.75);     /* Firefox */
// -webkit-transform:scale(0.75); /* Safari 和 Chrome */
// -o-transform:scale(0.75);     /* Opera */
// width: 310px;
// }
.pop_content {
    .van-popup {
        width: 260px;
        // height: 193px;
        padding: 0 10px 10px 10px;
    }
    .pop_title {
      font-size: 13px;
    }
    ::v-deep(.van-popup) {
        // background: #000 !important;
        background-color: transparent !important;

    }
    .close_img {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 12px;
        height: 12px;
    }

    .flex_btn {
        background: #FFFFFF;
        margin-top: -2px;
    }

    .bannerWarp {
        width: 260px;
        height:160px;
        background: #ffffff;
        padding: 15px 10px 0 10px;

        .text_contents {
            text-align: center;
            height: 40px;
            font-size: 12px;
            line-height: 16px;
        }
        .realInput{
            height: 30px;
            border-radius: 6px;
            width: 100%;
            display: flex;
            align-items: center;
            padding: 0 10px;
            margin-top: 12px;
            border: 1px solid #979797;
        }
    }

    .btnvan {
        width: 114px;
        height: 32px;
    }

    .customizeSubmit {
        width: 114px;
        height: 32px;
        background: #597EF7;
        border-radius: 5px;

        &.van-button--default {
            background: #597EF7;
            border: 0;
            color: #fff;
            font-size: 16px;
            font-weight: 400;
        }

        &.van-button--disabled {
            opacity: 0.6;
        }

        &.van-button--normal {
            padding: 0;
        }

        &.van-button {
            border-radius: 5px !important;
        }
    }

    .cg_zhu {
        color: #000000;
        text-align: center;
        margin-top: 10px;
        line-height: 17px;
        font-size: 11px;
    }
    .act_bor{
      border: 1px solid #FF0000 !important;
    }
    .errorTips{
  font-weight: 400;
  color: #FF0000;
  line-height: 13px;
  margin: 5px 0 0 0;
  height: 13px;
  transform-origin: 0 18px;
  font-size: 11px;
}
}
</style>
