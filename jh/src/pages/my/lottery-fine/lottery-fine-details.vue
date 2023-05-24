<script lang="ts" setup>
import dayjs from 'dayjs'
// component
import Header from '~/components/Header.vue'

import { translateText } from '~/utils/translateText'

const route = useRoute()
const record: any = route.query
const { pageType } = record
const title = computed(() => {
  switch (pageType) {
    case '1':
      return '注单详情'
    case '2':
      return '追号详情'
    default:
      return '注单详情'
  }
})
const listTitle = computed(() => {
  switch (pageType) {
    case '1':
      return '投注内容'
    case '2':
      return '已追记录'
    default:
      return '投注内容'
  }
})
const initRecord: any = ref({})
// const modelFilter = () => {
//   switch (String(initRecord.value.model)) {
//     case '1':
//       return '元'
//     case '2':
//       return '角'
//     case '3':
//       return '分'
//     case '4':
//       return '1元'
//     default:
//       return '元'
//   }
// }

const statusFilter = (item: any) => {
  const obj = {
    text: '状态：未中奖',
    color: '#000000',
  }

  switch (String(item.state)) {
    case '0':
      obj.text = '状态:待开奖'
      obj.color = '#000000'
      break
    case '1':
      obj.text = `奖金:${reserveDecimal(item.bonus)}元`
      obj.color = '#597EF7'
      break
    case '2':
      obj.text = '状态:未中奖'
      obj.color = '#000000'
      break
    case '3':
      obj.text = '状态:和'
      break
    case '4':
      obj.text = '状态:用户撤单'
      break
    case '5':
      obj.text = '状态:中奖撤单'
      break
    case '6':
      obj.text = '状态:进行中'
      break
    case '7':
      obj.text = '状态:已结束'
      break
    default:
      break
  }

  return obj
}

const init = () => {
  if (pageType === '2') {
    getLotteryBetDetailRequest({ id: record.id as string }).then((res: any) => {
      if (res.status)
        initRecord.value = res.data ?? {}

      console.log('getLotteryBetDetailRequest', res)
    })
  }
}
init()
const rederResult = (id: string, result: string) => {
  let _result = result
  if (id && id.includes('六合彩'))
    _result = result.slice(0, 17) + result.slice(17).replace(',', '+')

  return _result || ' - '
}
</script>

<template>
  <div class="detailsWarp">
    <Header :title="title" />
    <div class="detailsMainWarp">
      <div class="detailsMainT">
        <div class="detailsMainThead">
          <div class="lotteryName">
            {{ record.lott_id }}
          </div>
          <div class="lotteryIssue">
            第<span v-if="pageType === '1'">{{ record.issue }}</span><span v-else>{{ initRecord.f[0].issue }}</span>期
          </div>
          <div v-if="pageType === '1' " class="lotteryResult">
            {{ record.myAmount }}
          </div>
        </div>
        <ol v-if="pageType === '1'">
          <li>
            <span>投注时间</span>
            <span> {{ dayjs(record.created_at ? +record.created_at : 0).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </li>
          <li>
            <span>投注单号</span>
            <span>{{ record.uid }}</span>
          </li>
          <li>
            <span>投注金额</span>
            <span>{{ reserveDecimal(record.pay_amount) }}元</span>
          </li>
          <!-- <li>
            <span>模式</span>
            <span>{{ modelFilter() }}</span>
          </li> -->
          <li>
            <span>派送奖金</span>
            <span>{{ reserveDecimal(record.bonus) }}元</span>
          </li>
          <li>
            <span>开奖号码</span>
            <span>{{ rederResult(record.lott_id, record.result) }}</span>
          </li>
        </ol>
        <ol v-else>
          <li>
            <span>追号时间</span>
            <span>{{ dayjs(initRecord.created_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </li>
          <li>
            <span>追号单号</span>
            <span>{{ initRecord.uid }}</span>
          </li>
          <li>
            <span>投注内容</span>
            <div class="sdfsafdsa">
              <p>{{ translateText(initRecord.balls, initRecord.tester) }}</p>
              <p>{{ initRecord.tester === 'baozi' ? '猜豹子' : initRecord.play_name }}</p>
            </div>
          </li>
          <li>
            <span>追号进度</span>
            <span>{{ `已追${initRecord.done_issue}期/总${initRecord.total_issue}期` }}</span>
          </li>
          <li>
            <span>投注金额</span>
            <span>{{ reserveDecimal(initRecord.pay_amount) }}元</span>
          </li>
          <li>
            <span>派送奖金</span>
            <span>{{ reserveDecimal(initRecord.bonus) }}元</span>
          </li>
          <!-- <li>
            <span>模式</span>
            <span>{{ modelFilter() }}</span>
          </li> -->
          <li>
            <span>中奖即停</span>
            <span>{{ initRecord.stop === 1 ? '是' : '否' }}</span>
          </li>
        </ol>
      </div>
      <div class="detailsMainB">
        <div class="detailsMainBHead">
          {{ listTitle }}
        </div>
        <div v-if="pageType === '1'" class="betContent">
          <p>{{ translateText(record.balls, record.tester) }}</p>
          <p>{{ record.tester === 'baozi' ? '猜豹子' : record.play_id }}</p>
        </div>
        <div v-else class="chaseContent">
          <ul v-for="(item, index) in initRecord.f" :key="index">
            <li>
              <span>开奖号码：</span>
              <span>{{ rederResult(initRecord.lott_name, item.result) }}</span>
            </li>
            <li>
              <span>期号：</span>
              <span>{{ item.issue }}</span>
            </li>
            <li>
              <span>倍数：</span>
              <span>{{ initRecord.multiple }}</span>
            </li>
            <li>
              <div class="amountWarp">
                <span>金额：</span>
                <span>{{ reserveDecimal(item.pay_amount) }}元</span>
              </div>
              <div class="statusWarp" :style="`color:${statusFilter(item).color}`">
                {{ statusFilter(item).text }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detailsWarp {
  width: 100%;
  height: 100%;
  background: #F5F5F9;
  display: flex;
  flex-direction: column;

  .detailsMainWarp {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .detailsMainT {
      width: 100%;
      // min-height: 267px;
      background-color: #fff;
      margin-top: 10px;
      padding: 0 18px 8px 18px;

      .detailsMainThead {
        width: 100%;
        height: 70px;
        padding-top: 20px;
        position: relative;

        .lotteryName {
          width: 100%;
          text-align: center;
          height: 21px;
          font-size: 15px;
          font-weight: 800;
          line-height: 21px;
        }

        .lotteryIssue {
          width: 100%;
          text-align: center;
          height: 14px;
          font-size: 10px;
          color: #838383;
          line-height: 14px;
          margin-top: 3px;
        }

        .lotteryResult {
          position: absolute;
          right: 0;
          top: 35px;
          font-size: 15px;
          line-height: 21px;
          height: 21px;
        }
      }

      ol {
        width: 100%;

        li {
          width: 100%;
          min-height: 30px;
          line-height: 30px;
          display: flex;
          border-bottom: 1px solid #F1F1F1;
          flex-direction: row;
          justify-content: start;
          .sdfsafdsa {
            padding: 7px 0 ;
            flex: 1;
            overflow: hidden;
            p {
              line-height: 15px;
              word-wrap: break-word;
               word-break: normal;
            }
          }
          &:last-child {
            border-bottom: none;
          }
          span:last-child{
            flex: 1;
            word-wrap: break-word;
            word-break: normal;
            overflow: hidden;
          }
          span:first-child {
            width: 63px;
          }
        }
      }
    }

    .detailsMainB {
      width: 100%;
      min-height: 88px;
      background-color: #fff;
      margin-top: 5px;
      padding: 0 18px;

      .detailsMainBHead {
        width: 100%;
        min-height: 36px;
        line-height: 36px;
        border-bottom: 1px solid #F3F3F3;
        font-weight: 800;
      }

      .betContent {
        width: 100%;
        min-height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 0;
        p {
          width: 100%;
          // height: 15px;
          font-size: 11px;
          color: #606060;
          line-height: 15px;
          word-wrap: break-word;
          word-break: normal;
          overflow: hidden;
        }
      }

      .chaseContent {
        width: 100%;

        ul {
          width: 100%;
          min-height: 86px;
          padding: 7px 0;
          border-bottom: 1px solid #F3F3F3;

          &:last-child {
            border-bottom: none;
          }

          li {
            width: 100%;
            display: flex;

            &:nth-child(1) {
              height: 15px;
              font-size: 11px;
              font-weight: 800;
              line-height: 15px;
            }

            &:nth-child(2) {
              height: 14px;
              font-size: 10px;
              color: #838383;
              line-height: 14px;
              margin-top: 3px;
            }

            &:nth-child(3) {
              height: 15px;
              font-size: 11px;
              line-height: 15px;
              margin-top: 5px;
            }

            &:nth-child(4) {
              height: 20px;
              display: flex;
              align-items: center;
              font-size: 11px;
              line-height: 11px;
              justify-content: space-between;

              .statusWarp {
                font-size: 14px;
                line-height: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
