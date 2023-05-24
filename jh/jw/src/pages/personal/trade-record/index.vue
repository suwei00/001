<script setup lang='ts' name="trade-record">
import type { F, L } from 'ts-toolbelt'

const appStore = useAppStore()
const userStore = useUserStore()
const { realName } = $(storeToRefs(userStore))
const flag = ref<L.Head<F.Parameters<typeof getTradeRecord>>['flag']>(271)
const date_flag = ref<L.Head<F.Parameters<typeof getTradeRecord>>['date_flag']>('1')
const { data: tableData, total, page, page_size, search, loading }
  = usePage((page, page_size) =>
    () =>
      getTradeRecord({ page: page.value, page_size: page_size.value, flag: flag.value, date_flag: date_flag.value }),
  {
    loadingKeep: 1000,
    debounceInterval: 300,
    refreshDeps: [flag, date_flag],
    resetPageDeps: [flag, date_flag],
  })

// 真实姓名弹窗可见性
let realNameVisible = $ref(false)
// 处理提现点击事件
const handleClick = () => {
  if (!realName)
    return realNameVisible = true

  router.push('/personal/deposit')
}
</script>

<template>
  <div class="trade-record">
    <personal-title title="交易记录">
      <template #desc>
        <div>
          最多仅支持查询到上个月的交易记录，如有任何问题，请联系<a class="online-service-link" @click="appStore.openService">在线客服</a>。
        </div>
      </template>
    </personal-title>
    <div class="form">
      <div class="form-line">
        <div class="form-item">
          <label>交易类型</label>
          <el-select v-model="flag" style="width:230px">
            <el-option v-for="item in tradeTypeList" :key="item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="form-line">
        <div class="form-item">
          <label>交易时间</label>
          <jl-switch v-model="date_flag" :list="dateList" />
        </div>
        <div class="search-box">
          <jl-button :loading="loading" w-100px lh-42px h-42px @click="search">
            查询
          </jl-button>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table v-loading="loading" :data="tableData" v-bind="{ ...elTableCss, ...vLoading }" stripe w-full>
        <el-table-column align="center" prop="bet_time" label="交易时间" :width="180">
          <template #default="{ row: { created_at } }">
            {{ formatTime((+created_at)) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bill_no" label="订单编号" :width="220" />
        <el-table-column align="center" prop="flag" label="交易类型" :width="120">
          <template #default="{ row: { flag: f, transfer_type } }">
            {{ flag === 275 ? getRebateType(transfer_type) : getTradeType(f) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易金额" :width="120">
          <template #default="{ row: { amount } }">
            {{ toThousandsFloat(amount) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="state" label="交易状态" :width="130">
          <template #default="{ row: { state } }">
            <span :class="getTradeStateClass(state)">{{ getTradeState(state) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易备注">
          <template #default="{ row: { channel, remark } }">
            <span>{{ flag === 271 ? channel : remark }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <personal-empty desc="暂无数据" />
          <button v-show="flag === 271" class="go-deposit" @click="handleClick">
            立即充值
          </button>
        </template>
      </el-table>
      <jl-pagination v-model:page-size="page_size" v-model:current-page="page" mt-20px :total="total" />
    </div>

    <!-- 未绑定真实姓名弹窗 -->
    <realname-modal v-if="realNameVisible" v-model="realNameVisible" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.trade-record {
  @include pageCard;
  .go-deposit{
    width: 200px;
    height: 50px;
    line-height: 50px;
    background-color: #597EF7;
    border-radius: 6px;
    font-size: 18px;
    color: #fff;
    margin-top: 25px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
