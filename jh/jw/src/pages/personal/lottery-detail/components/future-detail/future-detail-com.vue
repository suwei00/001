<script setup lang='ts' name="future-detail-com">
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
  <div v-if="isOpen" class="future-detail-com" @click.self="close">
    <div class="body">
      <div class="title">
        <div class="left">
          <h5>{{ data?.lott_name }}</h5>
        </div>
        <div class="right" @click="close">
          <img src="@icons/personal/finance/close-icon.svg" alt="">
        </div>
      </div>
      <!-- 详情 -->
      <div class="wrapper">
        <div class="detail">
          <div class="item">
            <label>起始期号：</label><span>{{ data?.f[0].issue }}</span>
          </div>
          <div class="item">
            <label>追号时间：</label><span>{{ formatTime((data ? +data?.created_at : 0)) }}</span>
          </div>
          <div class="item">
            <label>追号方案金额：</label><span>{{ toThousandsFloat(data?.pay_amount ?? 0) }} 元</span>
          </div>
          <div class="item">
            <label>进度：</label><span>{{ `已追${data?.done_issue}期/总${data?.total_issue}期` }}</span>
          </div>
          <!-- <div class="item">
            <label>已追号金额：</label><span>{{ toThousandsFloat(data?.pay_amount ?? 0) }}</span>
          </div> -->
          <div class="item">
            <label>追号编号：</label><span>{{ data?.id }}</span>
          </div>
          <div class="item">
            <label>终止追号条件：</label><span>{{ data?.stop === 1 ? '中奖即停' : '一键撤单' }}</span>
          </div>
          <div class="item">
            <label>已获奖金：</label>
            <span :class="getReportStatusClass(data?.bonus ?? 0)">
              {{ toThousandsFloat(data?.bonus ?? 0) }}
            </span>
          </div>
        </div>
      </div>
      <!-- 玩法详情 -->
      <div class="base">
        <h5>追号方案</h5>
        <table>
          <tr>
            <th>玩法</th>
            <th>投注内容</th>
            <th>注数</th>
            <th>倍数</th>
            <th>模式</th>
          </tr>
          <tr>
            <td>{{ data?.play_name }}</td>
            <td>
              <el-popover
                placement="top-start"
                :width="300"
                :trigger="data?.balls && data?.balls.length > 30 ? 'hover' : 'focus'"
                :content="formatBalls(data?.balls ?? '')"
              >
                <template #reference>
                  <p max-w-250px text-ellipsis overflow-hidden mx-auto my-0>
                    {{ data?.balls && data?.balls.length > 30 ? `${formatBalls(data?.balls.slice(0, 30))}...` : formatBalls(data?.balls ?? '') }}
                  </p>
                </template>
              </el-popover>
            </td>
            <td>{{ data?.bet_times }}</td>
            <td>{{ data?.multiple }}</td>
            <td>{{ getCpModel(data?.model ?? 0) }}</td>
          </tr>
        </table>
      </div>
      <div class="table-box">
        <table>
          <tr>
            <th>期号</th>
            <th>追号倍数</th>
            <th>投注金额</th>
            <th>当期开奖号码</th>
            <th>状态</th>
            <th>奖金</th>
          </tr>
          <tr v-for="(f, i) in data?.f" :key="i">
            <td>{{ f.issue }}</td>
            <td>{{ f.times }}</td>
            <td>{{ toThousandsFloat(f.pay_amount) }}</td>
            <td>{{ f.result }}</td>
            <td>{{ getCpState(f.state) }}</td>
            <td :class="getReportStatusClass(f.bonus)">
              {{ toThousandsFloat(f.bonus) }}
            </td>
          </tr>
        </table>
      </div>

      <span flex justify-center>共
        <span style="color:#597EF7" ml-5px mr-5px>{{ data?.f.length }}</span>
        条记录</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.future-detail-com {
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
  top: 15%;
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

  .detail {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      width: 33%;

      label {
        width: 94px;
      }
    }
  }
}

.base {
  width: 950px;
  height: 111px;
  background: #ECF3FC;
  display: flex;
  align-items: center;
  justify-content: center;

  h5 {
    font-family: $jl-font;
    font-weight: 600;
    margin-right: 20px;
  }

  table {
    width: 590px;
    background-color: #fff;

    tr {
      border: 1px solid #DAE8F2;
    }

    th,
    td {
      padding: 9px 0;
    }
  }
}

.table-box {
  height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  margin-bottom: 10px;

  table {
    width: 950px;
    text-align: center;
    margin-bottom: 11px;

    th {
      background: #F8FAFB;
      font-family: $jl-font;
      font-weight: 600;
      padding: 11px 0;
      position: sticky;
      top: 0;
    }

    td {
      padding: 11px 0;
    }
  }
}
</style>

