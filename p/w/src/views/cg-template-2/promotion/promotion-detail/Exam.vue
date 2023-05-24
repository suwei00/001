<script setup lang="ts" >
import { inject, computed, ref } from 'vue';
import { useDetail } from './useDetail'
import { CgButton, CgContainer, CgContainerHead, CgRadio, CgIcon } from '@/components/cg-template-2'
import CgDialog from '@/components/cg-template-2/cg-dialog/index.vue'
import { useAppStore } from '@/store-pinia'
import { storeToRefs } from 'pinia';
import { useRequest } from 'vue-request'
import APIs from '@/http/blue-apis';
import dayjs from 'dayjs'
import { useCountDown } from '@vant/use';
import { LogInAndRegister } from '@/utils/logIn';

const flag = inject('flag') as string;
const id = inject('id') as string;
const { isLogin } = storeToRefs(useAppStore())

const { banner, details, data } = useDetail(id, flag);
const rule1 = computed(() => details.value[0] || '')
const rules = computed(() => details.value.slice(1) || '')
// 活动是否开始
const isStart = computed(() => data.value?.config.start_time ? dayjs().isAfter(dayjs(data.value?.config.start_time)) : true)
// 活动是否结束
const isTheEnd = computed(() => data.value?.config.end_time ? dayjs().isAfter(dayjs(data.value?.config.end_time)) : false)

// 申请状态
const { data: applyStatusData, run: getApplyStatus } = useRequest(() => APIs.checkExamApplyStatus({ id }), { ready: ref(isLogin) })
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
    LogInAndRegister('LogIn')
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
  <div class="promotion-detail">
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="details">
      <app-image :src="rule1" is-google-cloud />
      <p class="btn-tips">{{ btnTips }}</p>
      <CgButton @click="handleApply" :disabled="btnDisabled" style="margin-bottom: 30px;" center width="300">{{
        btnText
      }}</CgButton>
      <app-image v-for="r in rules" :src="r" :key="r" is-google-cloud />
    </div>

    <!-- 答题弹窗 -->
    <CgDialog v-show="showExamPopup">
      <CgContainer radius="12" width="800">
        <template #content>
          <CgContainerHead height="48">
            <template #center>
              <span class="title">SIÊU TRÍ TUỆ</span>
            </template>
            <template #right>
              <CgIcon v-show="!isFinish" width="20" class="pointer" name="i_grey_close"
                @click="showExamPopup = false" />
            </template>
          </CgContainerHead>
          <div class="body">
            <template v-if="!isFinish">
              <!-- 问题 -->
              <div class="question">
                <label>Câu Hỏi {{ questionNo }} : </label><span>{{ question }}</span>
              </div>
              <!-- 答案 -->
              <div class="answers">
                <div class="answers-item" v-for="item, index in answers" :key="item.id"
                  @click="chooseAnswer(item, index)">
                  <cg-icon :name="chooseIndex === index ? 'i_radio_a' : 'i_radio'" class='i_r' :width="15"
                    :height="15" />
                  <span class="letter">{{ letters[index] }}.</span>
                  {{ item.answer }}
                </div>
              </div>
              <!-- 答题按钮 -->
              <CgButton style="margin-bottom: 15px;" width="300" center :disabled="getResultBtnDisabled"
                @click="getResultHandler">{{
                  getResultBtnText
                }}</CgButton>
              <!-- 答题倒计时 -->
              <p class="count-down">Thời Gian Còn Lại : <span class="yellow">{{ current.seconds }}</span> Giây</p>
              <!-- 提示语 -->
              <p class="result">{{ statusText }}</p>
              <template v-if="resultStatus === 2">
                <!-- 正确答案 -->
                <p class="true-answer">Đáp Án Chính Xác : <span class="yellow">Tuỳ Chọn {{ trueAnswer }}</span></p>
                <!-- 错题解析 -->
                <p class="true-answer">
                  Phân Tích Sai： <span>{{ errorParing }}</span>
                </p>
              </template>
              <!-- 状态栏 -->
              <div class="status">
                <div>
                  <!-- 题目总数 -->
                  <label>Tổng Số Câu : </label>
                  <span class="yellow">{{ questionNo }}/{{ questionTotal }}</span>
                </div>
                <div>
                  <!-- 答对题数 -->
                  <label>Đáp Án Đúng : </label>
                  <span class="yellow">{{ trueNum }}</span>
                </div>
                <div>
                  <!-- 累计奖金 -->
                  <label>Tiền Thưởng Hiện Tại : </label>
                  <span class="yellow">{{ bonus }}</span>
                </div>
              </div>
            </template>

            <!-- 答题结束是否有奖金 -->
            <template v-else>
              <template v-if="haveBonus">
                <!-- 有奖金 -->
                <div class="final">
                  <app-image class="block" src="/promotion/good.png" />
                  <p class="bonus">Bạn Nhận Được <span>{{ bonus }}K !</span></p>
                </div>
                <p style="margin-top: 30px;" class="result">Chúc Mừng Bạn, Đã Trả Lời Đúng {{ trueNum }} Câu!</p>
              </template>
              <template v-else>
                <!-- 无奖金 -->
                <div class="final">
                  <app-image class="block" src="/promotion/nogood.png" />
                </div>
                <p class="result">Rất Đáng Tiếc, Tiếp Tục Cố Gắng Vào Lần Sau!</p>
              </template>
              <CgButton style="margin:30px auto 39px auto;" width="300" center @click="closeExamPopup">Xác Nhận
              </CgButton>
            </template>
          </div>
        </template>
      </CgContainer>
    </CgDialog>
  </div>
</template>

<style lang="scss" scoped>
.promotion-detail {
  width: 100%;
  padding-bottom: 81px;
  color: var(--cg-color-grey1);
  font-size: var(--cg-font-15);

  .banner {
    margin: 0 auto;
    max-width: 1920px;
    min-width: 1200px;
    height: 550px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
  }

  .details {
    width: 1200px;
    margin: 0 auto;

    img {
      display: block;
      margin-bottom: 30px;
    }

    .btn-tips {
      text-align: center;
      margin-bottom: 10px;
      font: var(--cg-font-text6);
    }
  }

  .title {
    font: var(--cg-font-text2);
  }

  .body {
    padding: 30px 40px;

    .question {
      margin-bottom: 33px;

      label {
        color: var(--cg-color-blue12);
      }
    }

    .answers {
      width: 100%;
      margin-bottom: 30px;

      .answers-item {
        display: flex;
        width: 720px;
        padding: 10px 55px;
        border-radius: var(--cg-border-input-radius);
        cursor: pointer;

        &:nth-of-type(2n+1) {
          background: var(--cg-color-white5);
        }

        .letter {
          margin-right: 5px;
        }

        .i_r {
          margin-right: 10px;
          flex-shrink: 0;
        }
      }
    }

    .count-down {
      text-align: center;
      margin-bottom: 15px;
    }

    .result {
      text-align: center;
      font: var(--cg-font-text2);
      color: var(--cg-color-blue12);
      margin-bottom: 15px;
    }

    .true-answer {
      width: 100%;
      padding-left: 55px;
      margin-bottom: 15px;
    }

    .status {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 55px;
      height: 38px;
      background-color: var(--cg-color-white5);
    }

    .final {
      margin-bottom: 30px;
      position: relative;
      width: 573px;
      margin: 0 auto;

      .bonus {
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        font-size: var(--cg-font-17);
        font-weight: 700;
        color: var(--cg-color-orang2);

        span {
          font-size: var(--cg-font-24);
        }
      }
    }
  }

  .yellow {
    color: var(--cg-color-orang1);
  }
}
</style>