<script setup lang='ts' name="trade-detail">
import type { F, L } from 'ts-toolbelt'

const stateOptions = [
  { value: '0', label: '全部' },
  { value: '1', label: '成功' },
  { value: '2', label: '失败' },
  { value: '3', label: '待确认' },
]

const flag = $ref<L.Head<F.Parameters<typeof getTradeDetail>>['flag']>(271)
const date_flag = $ref<L.Head<F.Parameters<typeof getTradeDetail>>['date_flag']>('1')
// 充值提现时多一个状态字段
const status = $ref('0')
// 下级会员名
const player_name = $ref('')
const { data: tableData, search, page, page_size, total, loading } = usePage((page, page_size) =>
  () => getTradeDetail({ page: page.value, page_size: page_size.value, date_flag, flag, player_name, status }), {
  refreshDeps: $$([date_flag, flag]),
  resetPageDeps: $$([date_flag, flag]),
  loadingKeep: 1000,
})
</script>

<template>
  <div class="trade-detail">
    <personal-title title="交易明细" />
    <div class="form">
      <div class="form-line">
        <div class="form-item">
          <label>会员账号</label>
          <el-input v-model="player_name" placeholder="请输入您要查询的下级账号" style="width:230px" />
        </div>
        <div class="form-item">
          <label>交易类型</label>
          <el-select v-model="flag" style="width:234px" @change="() => { status = '0' }">
            <el-option v-for="item in tradeTypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <!-- 充值提现时展示 -->
        <div v-show="flag === 271 || flag === 272" class="form-item">
          <label>状态</label>
          <el-select v-model="status" style="width:150px">
            <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
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
        <el-table-column align="center" label="会员账号">
          <template #default="{ row: { username: u } }">
            <span
              class="username"
            >{{ u }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="parent_name" label="直属上级" :width="130" />
        <el-table-column align="center" label="交易时间" :width="180">
          <template #default="{ row: { created_at } }">
            {{ formatTime((+created_at)) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bill_no" label="订单编号" :width="130" />
        <el-table-column align="center" prop="flag" label="交易类型">
          <template #default="{ row: { flag: f, ty } }">
            {{ flag === 275 ? getRebateType(ty) : getTradeType(f) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易金额" :width="130">
          <template #default="{ row: { amount } }">
            {{ toThousandsFloat(amount) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易状态">
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
        </template>
      </el-table>
    </div>
    <jl-pagination v-model:page-size="page_size" v-model:current-page="page" mt-20px :total="total" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.trade-detail {
  @include pageCard;

  .pagination-wrapper {
    display: flex;
    justify-content: center;
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
