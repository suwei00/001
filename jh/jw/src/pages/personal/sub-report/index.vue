<script setup lang='ts' name="sub-report">
import type { F, L } from 'ts-toolbelt'

let player_name = $ref('')
let parent_name = $ref('')
const ty = $ref<L.Head<F.Parameters<typeof getUnderReport>>['ty']>('1')
// 传递到弹窗子组件的参数
provide('ty', $$(ty))
provide('username', $$(player_name))

const { data: tableData, total, page, page_size, search, loading } = $(usePage((page, page_size) => () => getUnderReport({
  page: page.value,
  page_size: page_size.value,
  player_name,
  ty,
  is_online: '0',
  parent_name,
}), {
  loadingKeep: 1000,
  resetPageDeps: $$([ty, player_name, parent_name]),
  refreshDeps: $$([ty, parent_name]),
}))
// 金额弹窗
let amountModalVisible = $ref(false)
let modalTitle = $ref('')
let modalField = $ref('')
// 点击会员账号
const handleClickUsername = (val: string) => {
  player_name = ''
  parent_name = val
}
const handleSearch = () => {
  parent_name = ''
  search()
}
const handleItemClick = (data: { modalField: string ;modalTitle: string; u: string }) => {
  modalTitle = data.modalTitle
  modalField = data.modalField
  player_name = data.u ?? ''
  amountModalVisible = true
}
</script>

<template>
  <div class="sub-report">
    <personal-title title="下级报表" />
    <div class="form">
      <div class="form-line">
        <div class="form-item">
          <el-input v-model="player_name" clearable style="width:398px" placeholder="请输入您要查询的下级账号" />
        </div>
      </div>
      <div class="form-line">
        <div class="form-item">
          <jl-switch v-model="ty" :list="dateList" />
        </div>
        <div class="search-box">
          <jl-button :loading="loading" w-100px lh-42px h-42px @click="handleSearch">
            查询
          </jl-button>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table v-loading="loading" :data="tableData" v-bind="{ ...elTableCss, ...vLoading }" stripe w-full>
        <el-table-column align="center" prop="username" label="会员账号">
          <template #default="{ row: { username: u } }">
            <span
              class="username" color-color-primary-second underline cursor-pointer
              @click="handleClickUsername(u)"
            >{{ u }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="投注金额" :width="120">
          <template #default="{ row: { bet_amount, username: u } }">
            <span
              :class="getReportStatusClass(bet_amount)" underline cursor-pointer @click="handleItemClick({
                modalTitle: '投注金额',
                modalField: 'bet_amount',
                u,
              })"
            >{{
              toThousandsFloat(bet_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="游戏输赢" :width="120">
          <template #default="{ row: { company_net_amount, username: u } }">
            <span
              :class="getReportStatusClass(company_net_amount)" underline cursor-pointer @click="handleItemClick({
                modalTitle: '游戏输赢',
                modalField: 'net_amount',
                u,
              })"
            >{{
              toThousandsFloat(company_net_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="返点金额" :width="120">
          <template #default="{ row: { cg_rebate } }">
            <span>{{ toThousandsFloat(cg_rebate) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="返水金额" :width="120">
          <template #default="{ row: { rebate } }">
            <span>{{ toThousandsFloat(rebate) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动礼金" :width="120">
          <template #default="{ row: { dividend_amount } }">
            <span>{{ toThousandsFloat(dividend_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bet_mem_count" label="投注人数" :width="120" />
        <el-table-column align="center" prop="profit" label="下级盈利" :width="120">
          <template #default="{ row: { profit } }">
            <span>{{
              toThousandsFloat(profit) }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <personal-empty desc="暂无数据" />
        </template>
      </el-table>
      <jl-pagination v-model:page-size="page_size" v-model:current-page="page" mt-20px :total="total" />
    </div>
    <!-- 金额弹窗 -->
    <amount-modal v-if="amountModalVisible" v-model="amountModalVisible" :field="modalField" :title="modalTitle" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.sub-report {
  @include pageCard;
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
