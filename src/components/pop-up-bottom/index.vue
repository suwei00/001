<script lang="ts" setup>
import close from '../../assets/image/my/close.png?preset=full'

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  content: '',
  popType: '',
})
const emit = defineEmits(['update:modelValue'])
const gid = $(useRouteQuery('gid', ''))
const route = useRoute()
const records = {
  state: route.query.state ?? '', // state// 该用户在该群的角色 1 普通成员 2 管理员 3 退群 4 群主
  getFrequency: route.query.frequency ?? 0,
  getwordlimit: route.query.word_limit ?? 100,
}

const { setFrequency, setWordLimit, setMyVip } = useUserStore()
const { setVipId } = (storeToRefs(useUserStore()))
const user = useUserStore()

interface Props {
  modelValue: boolean
  title?: string
  content?: string
  popType: string// ShowVip:vip弹窗  setSpeak：发言频率设置  setNumber：发言字数设置
}

const typeTitle: any = { ShowVip: 'VIP等级', setSpeak: '发言频率设置', setNumber: '发言字数设置' }
const closeUrl = getSupportImage(close)

const onCancel = () => {
  emit('update:modelValue', false)
}

const setTimeOf = $ref(records.getFrequency.toString() ?? '10')// 每多少秒内
const setWordsNum = $ref(records.getwordlimit.toString() ?? '100')// 发言字数设置
let vipList: any = $ref([])
// vip设置
const getLevelList = () => {
  getLevelListRequest().then((res: any) => {
    if (res)
      vipList = res
  })
}
getLevelList()
// 设置VIP等级
const addVip = (id: number) => {
  getLevelUpdateRequest({ level: id }).then((res: any) => {
    if (res) {
      setMyVip(id)
      showToast('操作成功')
      sessionStorage.setItem('setVipId', id.toString())
      emit('update:modelValue', false)
    }
  })
}

// 发言频率
const confirmSpeak = () => {
  if (records.state === '2')
    return showToast('您暂无权限，请联系群主修改')

  GroupUpdateFrequencyRequest({ gid, frequency: setTimeOf }).then((res: any) => {
    if (res) {
      setFrequency(setTimeOf)
      showToast('操作成功')
      sessionStorage.setItem('frequency', setTimeOf)
      emit('update:modelValue', false)
    }
  })
}

// 发言字数
const confirmNumber = () => {
  if (records.state === '2')
    return showToast('您暂无权限，请联系群主修改')

  GroupUpdatewordlimitRequest({ gid, word_limit: setWordsNum }).then((res: any) => {
    if (res) {
      setWordLimit(setWordsNum)
      showToast('操作成功')
      sessionStorage.setItem('wordLimit', setWordsNum)
      emit('update:modelValue', false)
    }
  })
}
</script>

<template>
  <!-- 公共底部弹窗  -->
  <div class="pub_popup">
    <van-popup :show="modelValue" position="bottom" :overlay="true" round @click-overlay="onCancel">
      <div class="pop_title flex jc-sb ai-c">
        <div class="tit_cont">
          {{ typeTitle[popType] }}
        </div>
        <div class="close_icon flex ai-c" @click="onCancel">
          <img class="img" :src="closeUrl">
        </div>
      </div>

      <div class="popup_conent ">
        <!-- vip等级弹窗 -->
        <div v-if="popType === 'ShowVip'" class="vip_contet flex jc-c ai-c fdr-r fw-w">
          <button
            v-for="(item, index) in vipList" :key="index" class="vip_item" :disabled="setVipId > item.level"
            :class="{ activeItem: setVipId.toString() === item.level.toString(), grayItem: setVipId > item.level }"
            @click="addVip(item.level)"
          >
            {{ item.name }}
          </button>
        </div>
        <!-- 发言频率设置 -->
        <div v-if="popType === 'setSpeak'" class="set_input pub_btn">
          <div class="languageSet">
            每
            <van-stepper v-model.number="setTimeOf" step="1" input-width="36px" min="0" />
            秒内可发言1次
          </div>
          <div class="set_tag">
            当有一个值为0时，则不限制发言频率（管理员不受限制）
          </div>

          <van-button type="primary" block @click="confirmSpeak">
            确定
          </van-button>
        </div>
        <!--  发言字数设置 -->
        <div v-if="popType === 'setNumber'" class="set_input pub_btn">
          <div class="languageSet">
            发言字数设置
            <van-stepper v-model.number="setWordsNum" step="1" input-width="36px" min="0" />
          </div>

          <div class="set_tag">
            只对普通成员生效，管理员不受限制
          </div>
          <van-button type="primary" block @click="confirmNumber">
            确定
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.pub_popup {

  height: 300px;
  width: 100%;

  .pop_title {
    height: 45px;
    background: linear-gradient(135deg, $color-blue-1 0%, $color-blue-2 100%);
    border-radius: 8px 8px 0px 0px;
    padding: 0 18px;

    .tit_cont {
      font-size: $size14;
      font-weight: 400;
      color: $color-white-1;
    }

    .close_icon {
      width: 20px;
      height: 50px;
      color: $color-white-1;

      img {
        height: 20px;
        width: 20px;
      }
    }
  }

  .popup_conent {
    min-height: 113px;

    .vip_contet {
      padding: 18px 0 10px 0;

      .vip_item {
        width: 95px;
        height: 32px;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid $color-blue-1;
        font-size: $size14;
        font-weight: 600;
        color: $color-blue-1;
        text-align: center;
        line-height: 32px;
        margin-bottom: 12px;
        margin-left: 12px;
        background-color: $color-white-1;

        &:nth-child(1),
        &:nth-child(4) {
          margin-left: 0px;
        }
      }

      .activeItem {
        color: $color-white-1;
        background-color: $color-blue-1;
      }

      .grayItem {
        background: $color-gray-5;
        color: $color-white-1;
        border: 1px solid $color-gray-5;
        // pointer-events: none;
      }
    }

    .set_input {
      text-align: center;
      padding: 18px 20px 20px 20px;

      .languageSet {
        font-size: $size14;
        font-weight: 400;
        color: $color-gray-2;

      }

      .set_tag {
        font-size: $size13;
        font-weight: 400;
        color: $color-gray-3;
        line-height: 15px;
        margin: 18px 0 20px 0;

      }
    }

    .set_input {
      text-align: center;
      padding: 18px 20px 20px 20px;

      .languageSet {
        font-size: $size14;
        font-weight: 400;
        color: $color-gray-2;

      }

      .set_tag {
        font-size: $size13;
        font-weight: 400;
        color: $color-gray-3;
        line-height: 15px;
        margin: 18px 0 20px 0;

      }
    }

    :deep(.van-stepper) {
      border: 1px solid $color-blue-3;
      border-radius: 3px;

      button {
        background: linear-gradient(180deg, #FFFFFF 0%, #F5F8FF 100%);
        border-radius: 0px 3px 3px 0px;
      }

    }

    :deep(.van-stepper__input) {
      margin: 0;
      background: #FFFFFF;
      box-shadow: inset 0px 2px 3px 1px rgba(0, 0, 0, 0.16);
    }

    :deep(.van-button) {
      height: 40px;
      background: $color-blue-1;
      // border-radius: 6px 6px 6px 6px;
      border: 1px solid $color-gray-5;

    }
  }
}
</style>
