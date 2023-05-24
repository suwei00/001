<script setup lang='ts' name="future-detail">
import type { F, L } from 'ts-toolbelt'
import futureDetailCom from './future-detail-com.vue'

// 下级会员名
let username = $ref('')
// 查询范围
const ty = $ref(2)
// 投注状态
const betState = [
  { label: '全部', value: '' },
  { label: '中奖撤单', value: '5' },
  { label: '进行中', value: '6' },
  { label: '已结束', value: '7' },
]
const flag = $ref<L.Head<F.Parameters<typeof getBetDetail>>['flag']>('')
const date_flag = $ref<'0' | '1' | '3' | '7' | '30' | '60'>('0')

const { data: tableData, search, page, page_size, total, loading } = usePage((page, page_size) =>
  () => getFutureBetList({ id: 0, ty, page: page.value, page_size: page_size.value, day: date_flag, state: flag, username }), {
  loadingKeep: 1000,
  refreshDeps: $$([date_flag, flag]),
  resetPageDeps: $$([date_flag, flag]),
})
// 查询
const handleSearch = () => {
  search()
  username = ''
}

// 打开详情
const detailRef = ref()
const openDetail = (id: string) => {
  detailRef.value.open(id)
}
</script>

<template>
  <div class="future-detail">
    <div class="form">
      <div class="form-line">
        <div class="form-item">
          <label>会员账号</label>
          <el-input v-model="username" style="width:230px" placeholder="请输入您要查询的下级账号" />
        </div>
        <div class="form-item">
          <label>投注状态</label>
          <el-select v-model="flag" style="width:233px">
            <el-option v-for="item in betState" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="form-line">
        <div class="form-item">
          <label>投注时间</label>
          <jl-switch v-model="date_flag" :list="cpDateList" />
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
        <el-table-column align="center" label="会员账号">
          <template #default="{ row: { username: name } }">
            <span
              class="username"
            >{{ name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="流水号" :width="180" />
        <el-table-column align="center" prop="lott_id" label="彩种" />
        <el-table-column align="center" label="已追/总期数" :width="76">
          <template #default="{ row: { done_issue, total_issue } }">
            <span>{{ `${done_issue}/${total_issue}` }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总金额">
          <template #default="{ row: { pay_amount } }">
            <span>{{ toThousandsFloat(pay_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="派奖金额">
          <template #default="{ row: { bonus } }">
            <span :class="getReportStatusClass(bonus)">{{ toThousandsFloat(bonus) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="追号时间" :width="110">
          <template #default="{ row: { created_at } }">
            <span>{{ format((+created_at), 'yyyy-MM-dd') }}</span><br>
            <span>{{ format((+created_at), 'HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="详情">
          <template #default="{ row: { id } }">
            <span class="color-color-primary-second" cursor-pointer underline @click="openDetail(id)">详情</span>
          </template>
        </el-table-column>
        <!-- 无数据 -->
        <template #empty>
          <personal-empty desc="暂无数据" />
        </template>
      </el-table>
      <jl-pagination v-model:page-size="page_size" v-model:current-page="page" mt-20px :total="total" />

      <!-- 详情 -->
      <future-detail-com ref="detailRef" />
    </div>
  </div>
</template>

    <style lang="scss" scoped>
    @use '~/pages/personal/index.scss' as *;

    // .future-detail {
    //   @include pageCard;
    // }
    </style>

    <route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
    </route>

