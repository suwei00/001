<script lang="ts" setup>
import dayjs from 'dayjs'
import copyimg from '~/assets/images/my/trade/copyimg.png?preset=full'
import { handleCopy } from '~/utils/help'
import useRouterBack from '~/hooks/routerBackHooks'

const route = useRoute()
const records = {
  username: route.query.username ?? '',
  created_at: route.query.created_at ?? '',
  amount: route.query.amount ?? '0.00',
  flag: route.query.flag ?? '',
  channel: route.query.channel ?? '',
  status: route.query.status ?? '',
  bill_no: route.query.bill_no ?? '',
  record: JSON.parse(route.query.record as any),
  remark: route.query.remark ?? '',
}

const { goBack } = useRouterBack()

const stateFilter = (item: any) => {
  const obj = {
    color: '#597EF7',
  }

  switch (records.status) {
    case '失败':
      obj.color = '#FC646C'
      break
    case '成功':
      break
    case '待确认':
      obj.color = '#000000'
      break
  }
  return obj
}

const onLeft = () => {
  goBack(records.record)
  console.log(records.record, 'records<<<<<<')
}
</script>

<template>
  <div class=" cent-bg ">
    <Header title="交易详情" :is-on-left="true" @on-left="onLeft()" />
    <div class=" bet_detail cent-top">
      <h4 class="">
        ¥{{ reserveDecimal(records.amount as string) }}
      </h4>
      <ul>
        <li v-if=" records.username !== ''" class="flex jc-c jc-sb">
          <p class="bet_tit">
            账号
          </p>
          <p class="bet_text">
            {{ records.username }}
          </p>
        </li>
        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            交易类型
          </p>
          <p class="bet_text">
            {{ records.flag }}
          </p>
        </li>
        <li v-if="records.flag !== '红利'" class="flex jc-c jc-sb">
          <p class="bet_tit">
            交易方式
          </p>
          <p class="bet_text">
            {{ records.channel }}
          </p>
        </li>
        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            状态
          </p>
          <p class="bet_text bt_weig" :style="`color:${stateFilter(records).color}`">
            {{ records.status }}
          </p>
        </li>
        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            交易时间
          </p>
          <p class="bet_text">
            {{ dayjs(records.created_at ? +records.created_at : 0).format('YYYY-MM-DD HH:mm:ss') }}
          </p>
        </li>
        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            订单编码
          </p>
          <p class="bet_text flex ai-c">
            <bgImage :image="copyimg" class="copy_img" @click="handleCopy(records.bill_no)" />
            <span>{{ records.bill_no }}</span>
          </p>
        </li>

        <li v-if=" records.remark !== ''" class="flex jc-c jc-sb border-no">
          <p class="bet_tit">
            交易备注
          </p>
          <p class="bet_text">
            {{ records.remark }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bet_detail {
    padding: 18px 18px 0 18px;

    h4 {
        font-size: 15px;
        font-weight: 800;
        color: #000000;
        line-height: 21px;
        text-align: center;
        margin-bottom: 20px;

    }

    ul {
        li {
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            border-bottom: 1px solid #F1F1F1;

            .bet_text {
                margin-left: 15px;
            }

            .bet_mon {
                font-weight: 800;
                color: #597EF7;
                line-height: 17px;
            }

            .copy_img {
                width: 14px;
                height: 14px;
                vertical-align: middle;
                margin-right: 5px;
            }

            .bt_weig {
                font-weight: 800;
            }
        }
    }
}
</style>

