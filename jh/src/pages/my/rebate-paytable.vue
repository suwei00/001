<script lang="ts" setup>
import { CGCPOddsFormatter, filterOptions } from './static/data'
import Header from '~/components/Header.vue'
import arrowDownBgSrc from '~/assets/images/public/down.png?preset=full'

const { openLoading, closeLoading } = useLoading()
const selectPopVisivle = ref(false)
const visible = ref(false)
const renderList = ref([
  {
    name: '快3',
    value: '1',
    id: '1',
    type: 'k3',
  },
  {
    name: 'PK10',
    value: '2',
    id: '8',
    type: 'pk10',
  },
  {
    name: '时时彩',
    value: '3',
    id: '14',
    type: 'ssc',
  },
  {
    name: '六合彩',
    value: '6',
    id: '33',
    type: 'lhc',
  },
  {
    name: '11选5',
    value: '4',
    id: '19',
    type: 'll5',
  },
  {
    name: '幸运28',
    value: '5',
    id: '27',
    type: 'luck28',
  },
])

const selfRebateObj: any = ref({
  k3: '0',
  pk10: '0',
  ssc: '0',
  ll5: '0',
  luck28: '0',
  lhc: '0',
})
const selectTextId = ref(renderList.value[0].id)
const selectText = ref(renderList.value[0].name)
let selectType = $ref(renderList.value[0].type)
const selfRebate: any = computed(() => {
  switch (selectType) {
    case 'k3':
    case 'pk10':
    case 'ssc':
    case 'll5':
    case 'luck28':
    case 'lhc':
      return ((selfRebateObj.value[selectType] ?? 0) * 100).toFixed()
    default:
      return 0
  }
})

const open = () => {
  visible.value = !visible.value
  selectPopVisivle.value = !selectPopVisivle.value
}
const rebateList: any = ref({ type: [], column: [] })

const getList = (ids: string) => {
  openLoading()
  memberRebateScaleRequest().then((res: any) => {
    if (res.status)
      selfRebateObj.value = res.data
  })

  getLotteryOdds({ id: ids })
    .then((ress: any) => {
      const res = ress.data
      // 拼名字
      if (selectType === 'lhc') {
        let prefixName
        for (let i = 0; i < res.length; i++) {
          if (!res[i].fn) {
            prefixName = i === 0 ? res[i].name : res[i - 1].fn ? res[i].name : `${prefixName}-${res[i].name}`
            continue
          }
          res[i].name = res[i].name === prefixName ? res[i].name : `${prefixName}-${res[i].name}`
        }
      }
      else {
        const nameObj = { name: '', l: '' }
        for (let i = 0; i < res.length; i++) {
          if (res[i].odds === '0' && res[i].level.slice(0, 3) !== nameObj.l) {
            nameObj.name = res[i].name
            nameObj.l = res[i].level
            continue
          }
          if (res[i].level.slice(0, 3) === nameObj.l)
            res[i].name = res[i].name === nameObj.name ? res[i].name : `${nameObj.name}-${res[i].name}`
        }
      }
      const data = res.filter((item: any) => item.fn && item.fn)
      /* 🧩拆分玩法🧩 */
      if (selectType === 'pk10') {
        // 冠亚和
        CGCPOddsFormatter(data, 'gyh', 1, 'guanyahe')
        // 冠亚和值
        CGCPOddsFormatter(data, 'gyhz', 1, 'guanyahezhi')
        // 双面盘-大小单双龙虎
        CGCPOddsFormatter(data, 'first', 2, '双面盘-大小单双龙虎')
      }
      else if (selectType === 'll5') {
        // 趣味型-定单双
        CGCPOddsFormatter(data, 'dds', 1, 'dingdanshuang')
        // 趣味型-猜中位
        CGCPOddsFormatter(data, 'czw', 1, 'caizhongwei')
      }
      else if (selectType === 'ssc') {
        // 两面-大小单双质合
        CGCPOddsFormatter(data, 'lmzh', 2, '两面-大小单双质合')
        // 龙虎斗-龙虎和
        CGCPOddsFormatter(data, 'lhdwq', 1, 'longhudou')
        // 猜豹子
        CGCPOddsFormatter(data, 'baozi', 2, '猜豹子')
      }
      else if (selectType === 'lhc') {
        // 连码-三中二
        CGCPOddsFormatter(data, 'win32', 1, 'lmWin32')
        // 连码-二中特
        CGCPOddsFormatter(data, 'winte2', 1, 'lmWinte2')
        // 生肖-合肖中
        CGCPOddsFormatter(data, 'hxz', 1, 'hexiaozhong')
        // 生肖-合肖不中
        CGCPOddsFormatter(data, 'hxbz', 1, 'hexiaobuzhong')
        // 生肖-二肖连
        CGCPOddsFormatter(data, 'exl', 1, 'erlianxiao')
        // 生肖-三肖连
        CGCPOddsFormatter(data, 'sxl', 1, 'sanlianxiao')
        // 生肖-四肖连
        CGCPOddsFormatter(data, 'fxl', 1, 'silianxiao')
        // 尾数-特码头尾
        const fnIndex = data.findIndex((d: any) => d.fn === 'tmtw')
        if (fnIndex > -1) {
          data.splice(fnIndex + 1, 0, { name: '尾数-特码头尾-0头', level: '000', odds: data[fnIndex].odds.split(',')[0], fn: 'wtf' })
          data.splice(fnIndex + 2, 0, { name: '尾数-特码头尾-非0头', level: '000', odds: data[fnIndex].odds.split(',')[1], fn: 'wtf' })
          data.splice(fnIndex + 3, 0, { name: '尾数-特码头尾-0尾', level: '000', odds: data[fnIndex].odds.split(',')[5], fn: 'wtf' })
          data.splice(fnIndex + 4, 0, { name: '尾数-特码头尾-非0尾', level: '000', odds: data[fnIndex].odds.split(',')[6], fn: 'wtf' })
        }
        // 尾数-尾数连
        CGCPOddsFormatter(data, 'ewl', 1, 'erweilian')
        CGCPOddsFormatter(data, 'swl', 1, 'sanweilian')
        CGCPOddsFormatter(data, 'fwl', 1, 'siweilian')
      }

      rebateList.value.type = data.filter((d: any) => filterOptions.findIndex((f: any) => f === d.fn) === -1)
    })
    .catch((err) => { console.warn(err) })
    .finally(() => {
      closeLoading()
    })
}

const titNum = computed(() => {
  try {
    const originArr = () => {
      const arr = []
      if (selfRebate.value) {
        const t = Math.floor((selfRebate.value - 900) / 1)
        arr.push('9.00')
        for (let i = 1; i <= t; i++) {
          const selfNum = i + 900
          const isss = reserveDecimal(selfNum / 100, true, 3)
          arr.push(isss)
        }
      }
      return arr.reverse()
    }

    const oldArr = originArr()
    const newRebateList: any = []

    oldArr.forEach((item: any) => {
      const rebateItem: any = [item]
      rebateList.value.type.forEach((item2: any) => {
        rebateItem.push(`赔率${reserveDecimal(item2.odds * item / 10, true, 3)}`)
      })

      newRebateList.push({ odds: rebateItem })
    })

    return newRebateList
  }
  catch (error) {
    return []
  }
})

const selectItem = (item: any) => {
  selectTextId.value = item.id
  selectText.value = item.name
  selectType = item.type
  visible.value = !visible.value
  selectPopVisivle.value = !selectPopVisivle.value
  getList(selectTextId.value)
}
getList(selectTextId.value)
</script>

<template>
  <div class="transitionWarps">
    <Header title="返点赔率表">
      <template #headRight>
        <div class="headRight">
          <div class="showSelect" @click="open()">
            <span>{{ selectText }}</span>
            <bgImage :image="arrowDownBgSrc" :class="{ visibleShow: visible }" />
          </div>
          <slot name="headRight" />
        </div>
      </template>
    </Header>
    <div class="tableWarp">
      <div class="tableSide">
        <div class="tableSideHead">
          <p class="tableSideHeada">
            返点
          </p>
          <p class="tableSideHeab">
            玩法
          </p>
        </div>
        <ul>
          <li v-for="(t, i) in rebateList.type" :key="i">
            {{ t.name }}
          </li>
        </ul>
      </div>
      <div class="tableMainWarp">
        <div class="tableMain">
          <ul v-for="(col, index) in titNum" :key="index">
            <li v-for="(odd, i) in col.odds" :key="i">
              <span>{{ odd }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <van-popup v-model:show="selectPopVisivle" position="bottom">
    <div class="popContent">
      <ul>
        <li v-for="(item, index) in renderList" :key="index" @click="selectItem(item)">
          {{ item.name }}
        </li>
      </ul>
      <div class="cancelBut" @click="selectPopVisivle = false">
        取消
      </div>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.transitionWarps {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F5F5F9;
  color: #535353;
  font-size: 11px;

  .tableWarp {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    scroll-behavior: smooth;

    // 不显示滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    .tableSide {
      width: 135px;
      position: absolute;
      left: 0;
      top: 0;
      background: #FFFFFF;
      box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
      padding: 0 7px;

      .tableSideHead {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #E5E5E5;
        padding: 3px 0;
        font-size: 14px;
        color: #414655;
        line-height: 14px;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          margin: auto;
          width: 100%;
          height: 1px;
          // 旋转
          transform: rotate(19deg);
          background-color: #F3F3F3;
        }

        .tableSideHeada {
          width: 100%;
          height: 22px;
          padding-right: 4px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .tableSideHeab {
          width: 100%;
          height: 22px;
          padding-left: 4px;
          display: flex;
          align-items: center;
        }
      }

      ul {
        width: 100%;

        li {
          width: 100%;
          height:36px;
          line-height:36px;
          text-align: center;
          border-bottom: 1px solid #F3F3F3;

          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }

    .tableMainWarp {
      width: 100%;
      padding: 0 9px 0 143px;
      overflow-x: auto;
      background-color: #fff;

      // 不显示滚动条
      &::-webkit-scrollbar {
        display: none;
      }

      .tableMain {
        display: flex;

        ul {
          li {
            display: flex;
            flex-shrink: 0;
            width: 115px;
            height: 36px;
            word-break: break-all;
            white-space: normal;
            text-align: center;
            border-bottom: 1px solid #F3F3F3;
            align-items: center;

            label {
              flex-shrink: 0;
              width: 115px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              border-bottom: 1px solid #F3F3F3;

            }
          }

        }
      }
    }
  }

}

.popContent {
  text-align: center;
  font-family: PingFangSC-Regular, PingFang SC;

  ul {
    padding: 0 8px;

    li {
      min-height: 45px;
      line-height: 45px;
      font-weight: 400;
      color: #000000;
      line-height: 45px;
      border-bottom: 1px solid #F3F3F3;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .cancelBut {
    font-weight: 400;
    color: #000000;
    line-height: 50px;
    border-top: 5px solid #F8F8F7;
  }

  .ret_list {
    padding: 0 22px;
  }
}

.headRight {
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;

  .showSelect {
    display: flex;
    align-items: center;

    span {
      line-height: 16px;
      display: block;
      min-width: 50px;
      text-align: right;
    }

   img{
      width: 13px;
      height: 7px;
      margin-left: 4px;
      // 旋转动画
      transition: transform 0.3s;
      transform-origin: center;

      &.visibleShow {
        transform: rotate(180deg);
      }
    }
  }
}

.tableMain {
  display: flex;

  >ul {
    li:nth-of-type(1) {
      height: 50px !important;
      line-height: 50px !important;
    }
  }
}
</style>

