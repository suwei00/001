<script setup lang='ts' name="bet-record">
import type { F, L } from 'ts-toolbelt'
import type { BetRecordReturnType } from '~/api/type'

const appStore = useAppStore()
// 获取游戏场馆名称
const flag = ref<L.Head<F.Parameters<typeof getBetRecord>>['flag']>('')
const platform_id = ref('')
const date_flag = ref<L.Head<F.Parameters<typeof getBetRecord>>['date_flag']>('1')
const { data: platFormRes } = $(useRequest(getPlatform))
// 添加 '全部' 下拉选项,去除cg彩票选项
const platFormList = computed(() => platFormRes ? [{ name: '全部', value: '', id: '' }, ...platFormRes.filter(item => item.id !== '8840968486572375835')] : [],
)
const { data: tableData, total, page, page_size, search, loading }
  = usePage<BetRecordReturnType['d']>((page, page_size) =>
    () =>
      getBetRecord({ page: page.value, page_size: page_size.value, flag: flag.value, date_flag: date_flag.value, platform_id: platform_id.value }),
  {
    refreshDeps: [flag, date_flag, platform_id],
    resetPageDeps: [flag, date_flag, platform_id],
  })
</script>

<template>
  <div class="bet-record">
    <personal-title title="投注记录">
      <template #desc>
        <div class="desc">
          每个游戏大厅的数据都会延迟一段时间，如有任何问题，请联系<a online-service-link @click="appStore.openService">在线客服</a>。
        </div>
      </template>
    </personal-title>
    <div class="form">
      <div class="form-line">
        <div class="form-item">
          <label>游戏场馆</label>
          <el-select v-model="platform_id" style="width:230px">
            <el-option v-for="item in platFormList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
        <div class="form-item bet-state">
          <label>投注状态</label>
          <el-select v-model="flag" style="width:230px">
            <el-option v-for="item in betStateList" :key="item.label" :label="item.label" :value="item.value" />
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
        <el-table-column align="center" prop="bet_time" label="投注时间" :width="180">
          <template #default="{ row: { bet_time } }">
            {{ formatTime(bet_time) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bill_no" label="投注单号" :width="180" />
        <el-table-column align="center" prop="api_types" label="游戏场馆" :width="120">
          <template #default="{ row: { api_types } }">
            {{ appStore.getGameNameById(api_types) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="game_name" label="游戏玩法" />
        <el-table-column align="center" label="投注金额" :width="100">
          <template #default="{ row: { bet_amount } }">
            {{ toThousandsFloat(bet_amount) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="net_amount" label="游戏输赢" :width="100">
          <template #default="{ row: { net_amount } }">
            <span :class="getReportStatusClass(net_amount)">{{ toThousandsFloat(net_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="flag" label="投注状态" :width="100">
          <template #default="{ row: { flag: f } }">
            <span>{{ getFlag(f) }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <personal-empty desc="暂无数据" />
        </template>
      </el-table>
      <jl-pagination v-model:page-size="page_size" v-model:current-page="page" mt-20px :total="total" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.bet-record {
  @include pageCard;

}
.bet-state{
  margin-left: 58px !important;
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
