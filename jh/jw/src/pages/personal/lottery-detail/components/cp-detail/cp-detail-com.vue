<script setup lang='ts' name="cp-detail-com">
let detailId = $ref('')
let isOpen = $ref(false)
const open = (id: string) => {
  detailId = id
  isOpen = true
}
const close = () => { isOpen = false }

const { data } = useRequest(
  () => getLotteryBetDetail({ id: detailId }),
  {
    ready: $$(isOpen),
  },
)

defineExpose({
  open,
})
</script>

<template>
  <div v-if="isOpen" class="cp-detail-com" @click.self="close">
    <div class="body">
      <div class="title">
        <div class="left">
          <h5>注单详情</h5>
        </div>
        <div class="right" @click="close">
          <img src="@icons/personal/finance/close-icon.svg" alt="">
        </div>
      </div>
      <!-- 详情 -->
      <div class="wrapper">
        <h6>{{ data?.lott_name }}</h6>
        <div class="detail">
          <div class="item">
            <label>期号：</label><span>{{ data?.issue }}</span>
          </div>
          <div class="item">
            <label>投注时间：</label><span>{{ formatTime((data ? +data?.created_at * 1000 : 0)) }}</span>
          </div>
          <div class="item">
            <label>开奖号码：</label><span>{{ data?.result }}</span>
          </div>
          <div class="item">
            <label>投注总金额：</label><span>{{ toThousandsFloat(data?.pay_amount ?? 0) }}</span>
          </div>
          <div class="item">
            <label>总奖金：</label><span>{{ toThousandsFloat(data?.bonus ?? 0) }}</span>
          </div>
          <div class="item">
            <label>投注单号：</label><span>{{ data?.id }}</span>
          </div>
        </div>
      </div>
      <!-- 玩法详情 -->
      <table>
        <tr>
          <th>玩法</th>
          <th w-250px>
            投注内容
          </th>
          <th>注数</th>
          <th>倍数</th>
          <th>投注金额</th>
          <th>模式</th>
          <th w-150px>
            奖金
          </th>
          <th>状态</th>
        </tr>
        <tr>
          <td>{{ data?.play_name }}</td>
          <td>{{ data?.balls }}</td>
          <td>{{ data?.bet_times }}</td>
          <td>{{ data?.multiple }}</td>
          <td>{{ toThousandsFloat(data?.pay_amount ?? 0) }}</td>
          <td>{{ getCpModel(data?.model ?? 0) }}</td>
          <td :class="getReportStatusClass(data?.bonus ?? 0)">
            {{ toThousandsFloat(data?.bonus ?? 0) }}
          </td>
          <td>{{ getCpState(data?.state ?? 0) }}</td>
        </tr>
      </table>
      <span flex items-center>
        <i class="i-common-tip" mr-5px />
        温馨提示：您当前排查时{{ data?.username }}的官方快3第{{ data?.issue }}期注单详情。</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.cp-detail-com {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 0%, 0.3);
  z-index: 2000;
  color: #333;
  font-size: 13px;
}

.body {
  width: 990px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
  padding: 20px 20px 22px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);

  .title {
    text-align: left;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    h5 {
      font-size: 18px;
      font-family: $jl-font;
      font-weight: 600;
    }

    .right {
      cursor: pointer;
      padding: 5px;

      img {
        width: 14px;
        height: 14px;
      }
    }
  }
}

.wrapper {
  width: 950px;
  border: 1px solid #F8FAFB;
  padding-top: 11px;
  padding-left: 18px;
  padding-bottom: 11px;
  text-align: left;

  h6 {
    font-family: $jl-font;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .detail {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      width: 33%;

      &:nth-of-type(5) {
        width: 66%;
      }

      label {
        width: 84px;
      }
    }
  }
}

table {
  width: 950px;
  text-align: center;
  margin-bottom: 11px;

  th {
    background: #F8FAFB;
    font-family: $jl-font;
    font-weight: 600;
    padding: 11px 0;
  }

  td {
    padding: 11px 0;
  }
}
</style>
