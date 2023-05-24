<script setup lang='ts'>
import PromotionHeader from './components/promotion-header.vue'
import { inject, computed, ref, } from 'vue';
import { useDetail } from './useDetail'
import { CgButton, CgContainer, CgContainerHead, CgRadio, CgIcon, CgScrollBar } from '@/components/cg-template-2'
import CgDialog from '@/components/cg-template-2/cg-dialog/index'
import { useAppStore } from '@/store-pinia'
import { storeToRefs } from 'pinia';
import { useRequest } from 'vue-request'
import APIs from '@/http/blue-apis';
import dayjs from 'dayjs'
import { useCountDown } from '@vant/use';
import { useRouter } from 'vue-router'

const router = useRouter()
const flag = inject('flag') as string;
const id = inject('id') as string;
const { isLogin, isApp } = storeToRefs(useAppStore())

const { banner, details, data, title } = useDetail(id, flag);
const rule1 = computed(() => details.value[0] || '')
const rules = computed(() => details.value.slice(1) || '')
// 活动是否开始
const isStart = computed(() => data.value?.config.start_time ? dayjs().isAfter(dayjs(data.value?.config.start_time)) : true)
// 活动是否结束
const isTheEnd = computed(() => data.value?.config.end_time ? dayjs().isAfter(dayjs(data.value?.config.end_time)) : false)

// 申请状态
const { data: applyStatusData, run: getApplyStatus } = useRequest(() => APIs.checkExamApplyStatus({ id }), { ready: isLogin })
const isNotEnough = computed(() => applyStatusData.value?.apply_status === 1) // 未达标
const isOnExam = computed(() => applyStatusData.value?.apply_status === 3) // 参与中
const isFinishExam = computed(() => applyStatusData.value?.apply_status === 4) // 已完成
const depositAmount = computed(() => applyStatusData.value?.deposit) // 会员本周充值金额
const btnTips = computed(() => {
  if (!isLogin.value) {
    return ''
  }
  if (!isStart.value) {
    return 'Hoạt Động KM Tạm Thời Chưa Diễn Ra' // 活动未开始
  }
  if (isTheEnd.value) {
    return 'Hoạt Động Đã Kết Thúc' // 活动已结束
  }
  if (isFinishExam.value) {
    return 'Quý Khách Vui Lòng Truy Cập Tiếp Vào Tuần Sau' // 已参与
  }
  if (isNotEnough.value) {
    return `Nạp Tiền Tích Luỹ Tuần Này: ${depositAmount.value} K` // 本周累计充值
  }
  else {
    return 'Đã Đủ Điều Kiện Tham Gia' // 已满足参与条件
  }
})

// 按钮置灰
const btnDisabled = computed(() => {
  if (!isLogin.value) return false

  if (!applyStatusData.value) return true

  if (isTheEnd.value || !isStart.value || isNotEnough.value || isFinishExam.value) return true
})
// 按钮文字
const btnText = computed(() => {
  if (!isLogin.value) {
    return 'ĐĂNG NHẬP NGAY' // 立即登录
  }
  if (isFinishExam.value) {
    return 'ĐÃ THAM GIA' // 已参与
  } else {
    return 'THAM GIA NGAY' //立即参与
  }
})

// 参与活动
const { run: runGetPromotionApply } = useRequest(() => APIs.getPromotionApply({ id, amount: 1, lv: 1, flag, bonus_type: 1 }), {
  manual: true,
  onSuccess() {
    runGetPromoExam()
  },
})
const handleApply = () => {
  if (!isLogin.value) {
    if (isApp.value) {
      window.open('yiyappnative://event?type=login', '_self');
      return
    }
    router.push('/entry/login')
    return;
  }

  if (isOnExam.value) {
    runGetPromoExam()
    return
  }
  runGetPromotionApply()
}

// 答题弹窗
const showExamPopup = ref(false)
// 是否答题结束
const isFinish = ref(false)
const haveBonus = ref(true)
// 答题倒计时
const { current, start, pause, reset } = useCountDown({
  time: 0,
  onFinish() {
    answer_id.value = ''
    chooseIndex.value = null
    runGetExamResult()
  }
});
// 答题状态提示语
const textArr = [
  'Đáp Đúng Càng Nhiều, Tiền Thưởng Càng Cao, Siêu Trí Tuệ Chính Là Bạn!', // 首题
  'Chúc Mừng Bạn, Đã Trả Lời Đúng, Tiếp Tục Cố Gắng!', // 正确
  'Rất Đáng Tiếc, Bạn Đã Trả Lời Sai, Tiếp Tục Cố Gắng!', // 错误
  'Đáp Đúng Càng Nhiều, Tiền Thưởng Càng Cao, Siêu Trí Tuệ Chính Là Bạn!' // 错误之后进入下一题
]
const resultStatus = ref(0)
const statusText = computed(() => textArr[resultStatus.value])

// 获取题目接口
const ques_id = ref('') // 问题id
const answer_id = ref('') // 答案id
const trueNum = ref(0) // 答对题数
const bonus = ref(0) // 获得的奖金
const { data: examData, run: runGetPromoExam, loading: getExamLoading } = useRequest(() => APIs.getPromoExamNext({ id }), {
  manual: true,
  onSuccess(res) {
    showExamPopup.value = true
    ques_id.value = res.next_ques_id
    trueNum.value = res.true_num
    bonus.value = res.bonus
    answer_id.value = ''
    chooseIndex.value = null
    resultStatus.value = resultStatus.value === 1 ? 1 : 0
    reset(res.next_finish_at * 1000 - new Date().getTime())
    start()
  }
})
const question = computed(() => examData.value?.next_ques) // 题目
const questionNo = computed(() => examData.value?.no) // 题目序号
const answers = computed(() => examData.value?.next_answer ?? []) // 答案
const questionTotal = computed(() => examData.value?.total) // 题目总数


//答题接口
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const trueAnswer = ref('') // 正确答案
const errorParing = ref('') // 错题解析
const { run: runGetExamResult, loading: getResultLoading } = useRequest(() => APIs.getPromoExam({ id, ques_id: ques_id.value, answer_id: answer_id.value }), {
  manual: true,
  onSuccess(res) {
    // 已完成
    if (res.apply_status === 4) {
      isFinish.value = true
      trueNum.value = res.true_num
      bonus.value = res.bonus
      haveBonus.value = res.bonus > 0
    } else if (res.state === 1) {
      resultStatus.value = 1
      runGetPromoExam()
    } else if (res.state === 2 || res.state === 3) {
      resultStatus.value = 2
      errorParing.value = res.error_paring
      trueAnswer.value = letters[answers.value?.findIndex((a) => a.id === res.true_answer.id) ?? 0]
    }
  }
})
const chooseIndex = ref<null | number>(null)
const chooseAnswer = (item: { id: string, answer: string }, index: number) => {
  if (resultStatus.value === 2) return
  chooseIndex.value = index
  answer_id.value = item.id
}
const getResultBtnDisabled = computed(() => {
  if (getResultLoading.value || getExamLoading.value) return true
  return resultStatus.value === 2 ? false : !answer_id.value
})
const getResultBtnText = computed(() => resultStatus.value === 2 ? 'Câu Hỏi Tiếp Theo' : 'Xác Nhận Đáp Án')
const getResultHandler = () => {
  if (resultStatus.value === 2) {
    runGetPromoExam()
    return
  }
  pause()
  runGetExamResult()
}

// 答题结束关闭弹窗
const closeExamPopup = () => {
  getApplyStatus()
  showExamPopup.value = false
}
</script>
<template>
  <div class='static-page'>
    <PromotionHeader :title="title" />
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="details">
      <app-image :src="rule1" is-google-cloud />
      <p class="btn-tips">{{ btnTips }}</p>
      <CgButton @click="handleApply" :disabled="btnDisabled"
        style="margin-top:var(--cg-px-32);margin-bottom:var(--cg-px-32);" center width="498">{{
          btnText
        }}</CgButton>
      <app-image v-for="r in rules" :src="r" :key="r" is-google-cloud />
    </div>

    <!-- 答题弹窗 -->
    <CgDialog v-if="showExamPopup">
      <CgContainer style="flex-shrink: 0;" border="0" :is-shadow="false" width="540">
        <CgContainerHead height="80">
          <template #center>
            <div class="dialog-head">
              <span class="title">SIÊU TRÍ TUỆ</span>
              <CgIcon v-show="!isFinish" class="close-icon" width="28" name="i_grey_close" @click="closeExamPopup" />
            </div>
          </template>
        </CgContainerHead>
        <div class="body">
          <template v-if="!isFinish">
            <p class="question">
              <label>Câu Hỏi {{ questionNo }} :</label><span>{{ question }}</span>
            </p>
            <div class="answers">
              <CgScrollBar>
                <div class="answer-item" v-for="item, i in answers" :key="i" @click="chooseAnswer(item, i)">
                  <cg-icon style="margin-right: var(--cg-px-10);flex-shrink: 0;" width="26"
                    :name="`i_radio${chooseIndex === i ? '_a' : ''}`" />
                  <span class="index">{{ letters[i] }}.</span>
                  <p class="answer">{{ item.answer }}</p>
                </div>
              </CgScrollBar>
            </div>
            <!-- 答题按钮 -->
            <CgButton small width="300" center :disabled="getResultBtnDisabled" @click="getResultHandler">
              {{ getResultBtnText }}
            </CgButton>
            <!-- 答题倒计时 -->
            <p class="count-down">Thời Gian Còn Lại : <span class="yellow">{{ current.seconds }}</span> Giây</p>
            <!-- 提示语 -->
            <p class="result">{{ statusText }}</p>
            <template v-if="resultStatus === 2">
              <!-- 正确答案 -->
              <p class="true-answer">Đáp Án Chính Xác : <span class="blue">Tuỳ Chọn {{ trueAnswer }}</span></p>
              <!-- 错题解析 -->
              <p class="true-answer">
                Phân Tích Sai： <span>{{ errorParing }}</span>
              </p>
            </template>
            <!-- 题目总数 -->
            <p class="true-answer">
              Tổng Số Câu : <span class="yellow">{{ questionNo }}/{{ questionTotal }}</span>
            </p>
            <!-- 答对题数 -->
            <p class="true-answer">
              Đáp Án Đúng : <span class="yellow">{{ trueNum }}</span>
            </p>
            <!-- 累计奖金 -->
            <p class="true-answer">
              Tiền Thưởng Hiện Tại : <span class="yellow">{{ bonus }}</span>
            </p>
          </template>

          <!-- 答题结束是否有奖金 -->
          <template v-else>
            <template v-if="haveBonus">
              <!-- 有奖金 -->
              <div class="final">
                <app-image class="block" src="/promotion/good.png" />
                <div class="bonus">Bạn Nhận Được <span>{{ bonus }}K !</span></div>
              </div>
              <p class="result">Chúc Mừng Bạn, Đã Trả Lời Đúng {{ trueNum }} Câu!</p>
            </template>
            <template v-else>
              <!-- 无奖金 -->
              <div class="final">
                <app-image class="block" src="/promotion/no-good.png" />
              </div>
              <p class="result">Rất Đáng Tiếc, Tiếp Tục Cố Gắng Vào Lần Sau!</p>
            </template>
            <CgButton style="margin-bottom: var(--cg-px-54);" width="300" small center @click="closeExamPopup">Xác Nhận
            </CgButton>
          </template>
        </div>
      </CgContainer>
    </CgDialog>
    <app-image style="width: 0;height: 0;position: absolute;bottom: 200px;" src="/promotion/good.png" />
    <app-image style="width: 0;height: 0;position: absolute;bottom: 200px;" src="/promotion/no-good.png" />
  </div>
</template>
<script lang='ts'>
export default {
  name: 'Exam'
}
</script>

<style lang='scss' scoped>
.static-page {
  .banner {
    width: 100%;
    height: 290px;
    background-size: cover;
    background-position: center;
  }

  .details {
    width: 686px;
    margin: 0 auto;

    .btn-tips {
      text-align: center;
      font: var(--cg-font-text4);
      margin-bottom: 18px;
    }

    img {
      width: 100%;
      display: block;
      margin-bottom: 24px;
    }
  }

  .dialog-head {
    width: 540px;
    display: flex;
    align-items: center;
    height: 80px;
    justify-content: center;
    position: relative;

    .close-icon {
      position: absolute;
      right: 20px;
    }
  }

  .body {
    font: var(--cg-font-text2);

    .question {
      width: 460px;
      margin: 20px auto;

      label {
        color: var(--cg-color-blue1);
      }
    }

    .answers {
      width: 100%;
      height: 328px;
      padding: 20px;
      background-color: var(--cg-color-blue16);
      margin-bottom: 20px;

      .answer-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 40px;
        font-size: 26px;

        .index {
          margin-right: 11px;
        }

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .count-down {
      text-align: center;
      margin: 20px auto;
    }

    .result {
      width: 460px;
      margin: 0 auto 20px;
      text-align: center;
      font: var(--cg-font-text7);
      color: var(--cg-color-blue1);
    }

    .true-answer {
      width: 460px;
      margin: 0 auto 20px;

      &:last-of-type {
        margin-bottom: 30px;
      }
    }

    .final {
      width: 494px;
      min-height: 250px;
      margin: 0 auto;
      padding-top: 50px;
      margin-bottom: 20px;
      position: relative;

      .bonus {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 130px;
        left: 50%;
        transform: translateX(-50%);
        font: var(--cg-font-text5);
        font-weight: 700;
        color: var(--cg-color-orange2);

        span {
          font-size: 42px;
        }
      }

      img {
        width: 100%;
      }
    }

    .result {
      margin-bottom: 40px;
    }
  }
}

.yellow {
  color: var(--cg-color-orange1);
}

.blue {
  color: var(--cg-color-blue1);
}
</style>