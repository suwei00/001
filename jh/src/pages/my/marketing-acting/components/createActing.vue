<script lang="ts" setup>
import { Toast } from 'vant'
import CustomizeSelect from '~/components/customizeSelect.vue'
import useRouterBack from '~/hooks/routerBackHooks'

const emit = defineEmits(['goToTab'])

const { goTo } = useRouterBack()
const { openLoading, closeLoading } = useLoading()

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

const oldParams = {
  zr: '',
  qp: '',
  ty: '',
  dj: '',
  dz: '',
  by: '',
  k3: '',
  pk10: '',
  ssc: '',
  luck28: '',
  ll5: '',
  lhc: '',
}

const rebateRatio = ref(oldRebateRatio)
const params: any = ref(oldParams)
const loading = ref(false)
const disabled = computed(() => {
  return !(Object.values(params.value).every(item => item))
})

const accMul = (arg1: any, arg2: any): any => {
  if (arg1 && arg2) {
    let m = 0
    const s1 = arg1.toString()
    const s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    }
    catch (e) {}
    try {
      m += s2.split('.')[1].length
    }
    catch (e) {}
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / 10 ** m
  }
}

const goPaytable = () => {
  goTo('/my/rebate-paytable')
}

const createOptions = (max_rebate: number, min_rebate = 0, grand = 0.05, decimal = 2, symbol = '%') => {
  const options: any = []
  const new_max_rebate = accMul(max_rebate, 100)
  const new_min_rebate = min_rebate ? accMul(min_rebate, 100) : min_rebate
  const new_grand = accMul(grand, 100)
  for (let i = new_min_rebate; i <= new_max_rebate; i += new_grand) {
    options.push({
      // 保留两位小数
      label: `${reserveDecimal(i / 100, false, decimal)}${symbol}`,
      value: reserveDecimal(i / 100, false, decimal),
    })
  }
  options.reverse()
  return options
}

const init = () => {
  openLoading()
  memberRebateScaleRequest().then((res: any) => {
    if (res.status) {
      rebateRatio.value = res.data ?? oldRebateRatio
      console.log(rebateRatio.value)
      params.value = {
        zr: reserveDecimal(rebateRatio.value.zr, false),
        qp: reserveDecimal(rebateRatio.value.qp, false),
        ty: reserveDecimal(rebateRatio.value.ty, false),
        dj: reserveDecimal(rebateRatio.value.dj, false),
        dz: reserveDecimal(rebateRatio.value.dz, false),
        by: reserveDecimal(rebateRatio.value.by, false),

        k3: rebateRatio.value.k3,
        pk10: rebateRatio.value.pk10,
        ssc: rebateRatio.value.ssc,
        luck28: rebateRatio.value.luck28,
        ll5: rebateRatio.value.ll5,
        lhc: rebateRatio.value.lhc,
      }
    }
    closeLoading()
  })
}

const onCreate = () => {
  loading.value = true
  createMemberLinkRequest(params.value).then((res: any) => {
    if (res.status) {
      emit('goToTab')
      Toast('添加成功')
    }

    console.log(res, 'bbbbbbb')
  }).finally(() => {
    loading.value = false
  })
}

init()
</script>

<template>
  <div class="createActingWarp">
    <div class="rebateRatioMain">
      <ol>
        <li>
          <p class="hint">
            请先为下级代理设置返水比例
          </p>
        </li>
        <li>
          <label>真人</label>
          <CustomizeSelect
            v-model="params.zr"
            type="1" :list="createOptions(Number(rebateRatio.zr))"
            placeholder="请选择返水比例"
          />
        </li>
        <li>
          <label>体育</label>
          <CustomizeSelect
            v-model="params.ty"
            type="1" :list="createOptions(Number(rebateRatio.ty))"
            placeholder="请选择返水比例"
          />
        </li>
        <li>
          <label>棋牌</label>
          <CustomizeSelect
            v-model="params.qp"
            type="1" :list="createOptions(Number(rebateRatio.qp))"
            placeholder="请选择返水比例"
          />
        </li>
        <li>
          <label>电子</label>
          <CustomizeSelect
            v-model="params.dz"
            type="1" :list="createOptions(Number(rebateRatio.dz))"
            placeholder="请选择返水比例"
          />
        </li>
        <li>
          <label>捕鱼</label>
          <CustomizeSelect
            v-model="params.by"
            type="1" :list="createOptions(Number(rebateRatio.by))"
            placeholder="请选择返水比例"
          />
        </li>
        <li>
          <label>电竞</label>
          <CustomizeSelect
            v-model="params.dj"
            type="1" :list="createOptions(Number(rebateRatio.dj))"
            placeholder="请选择返水比例"
          />
        </li>
      </ol>
      <ol>
        <li>
          <p class="hint">
            请先为下级代理设置彩票返点，<span @click="goPaytable()">查看返点赔率表</span>
          </p>
        </li>
        <li>
          <label>快3</label>
          <CustomizeSelect
            v-model="params.k3"
            type="1" :list="createOptions(Number(rebateRatio.k3), 9, 0.01, 2, '')"
            placeholder="请选择彩票返点"
          />
        </li>
        <li>
          <label>PK10</label>
          <CustomizeSelect
            v-model="params.pk10"
            type="1" :list="createOptions(Number(rebateRatio.pk10), 9, 0.01, 2, '')"
            placeholder="请选择彩票返点"
          />
        </li>
        <li>
          <label>时时彩</label>
          <CustomizeSelect
            v-model="params.ssc"
            type="1" :list="createOptions(Number(rebateRatio.ssc), 9, 0.01, 2, '')"
            placeholder="请选择彩票返点"
          />
        </li>
        <li>
          <label>六合彩</label>
          <CustomizeSelect
            v-model="params.lhc"
            type="1" :list="createOptions(Number(rebateRatio.lhc), 9, 0.01, 2, '')"
            placeholder="请选择彩票返点"
          />
        </li>
        <li>
          <label>11选5</label>
          <CustomizeSelect
            v-model="params.ll5"
            type="1" :list="createOptions(Number(rebateRatio.ll5), 9, 0.01, 2, '')"
            placeholder="请选择彩票返点"
          />
        </li>
        <li>
          <label>幸运28</label>
          <CustomizeSelect
            v-model="params.luck28"
            type="1" :list="createOptions(Number(rebateRatio.luck28), 9, 0.01, 2, '')"
            placeholder="请选择彩票返点"
          />
        </li>
      </ol>
    </div>
    <div class="submitWarp">
      <van-button
        class="customizeConfirm" oading-type="spinner" loading-text="加载中..." :disabled="disabled" :loading="loading"
        @click="onCreate()"
      >
        生成邀请码
      </van-button>
      <ul class="warmHint">
        <li>
          <p>※ 温馨提示：</p>
        </li>
        <li>
          <span>1、</span>
          <p>不同的返点赔率不同，返点越高赔率越高。</p>
        </li>
        <li>
          <span>2、</span>
          <p>代理可获得的佣金等于代理自身返点与下级返点的差值，如代理自身返点6，下级返点4，代理可获得下级投注金额的2%，即下级下注100元，代理可获得2元。</p>
        </li>
        <li>
          <span>3、</span>
          <p class="f_color">
            下级返点值设得越低，下级的赔率就越低，建议给下级设置的返点不要过低。
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.z_label){
  font-size: 11px !important;
font-weight: 400 !important;
color: #828282 !important;
}
.createActingWarp {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .rebateRatioMain {
    width: 100%;
    color: #000000;

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
        label{
          display: block;
          width: 100px;
        }

        .hint {
          width: 100%;
          line-height: 10px;
          font-size:12px;
-webkit-transform:scale(0.84);
transform-origin: 0 18px;
          span {
            color: #4F73F6;
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .submitWarp {
    width: 100%;
    padding: 25px 18px 45px 18px;

    .warmHint {
      width: 100%;
      padding-top: 25px;
      font-size: 11px;
      line-height: 15px;
      color: #848484;

      .f_color{
        color: #FF0000;
      }
      li {
        display: flex;
        // padding-bottom: 10px;
      }
    }
  }
}
</style>
