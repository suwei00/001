<script setup lang='ts' name="bet-detail">
import type { F, L } from 'ts-toolbelt'

const appStore = useAppStore()
const { getGameNameById } = appStore
const { gameTypeList } = $(storeToRefs(appStore))
// 游戏类型，添加全部选项,去除CG彩票
const gameOptions = computed(() => [{ id: '', name: '全部' }, ...gameTypeList.slice(1)])
// 下级会员名
const player_name = $ref('')
// 投注状态
const flag = $ref<L.Head<F.Parameters<typeof getBetDetail>>['flag']>('')
const date_flag = $ref<L.Head<F.Parameters<typeof getBetDetail>>['date_flag']>('1')
// 游戏类型
const game_type = $ref<L.Head<F.Parameters<typeof getBetDetail>>['game_type']>('')
// 游戏场馆
let platform_id = $ref('')
// 所有的场馆钱包
const { data: platFormList } = $(useRequest(getPlatform))
// 当前游戏类型下的场馆钱包
const currenList = computed(() => {
  if (!platFormList?.length)
    return []
  return [{ id: '', name: '全部' }, ...platFormList.filter(item => item.game_type === game_type)]
})
const { data: tableData, search, page, page_size, total, loading } = usePage((page, page_size) =>
  () => getBetDetail({ page: page.value, player_name, page_size: page_size.value, date_flag, platform_id, game_type, flag }), {
  loadingKeep: 1000,
  refreshDeps: $$([date_flag, game_type, flag, platform_id]),
  resetPageDeps: $$([date_flag, game_type, flag, platform_id]),
})
// 游戏类型改变
const handleGameTypeChange = (val: number) => {
  platform_id = ''
}
</script>

<template>
  <div class="bet-detail">
    <personal-title title="投注明细" />
    <div class="form">
      <div class="form-line">
        <div class="form-item">
          <label>会员账号</label>
          <el-input v-model="player_name" style="width:230px" placeholder="请输入您要查询的下级账号" />
        </div>
        <div class="form-item">
          <label>投注状态</label>
          <el-select v-model="flag" style="width:234px">
            <el-option v-for="item in betStateList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="form-line">
        <div class="form-item">
          <label>游戏类型</label>
          <el-select v-model="game_type" style="width:230px" @change="handleGameTypeChange">
            <el-option v-for="item in gameOptions" :key="item.id" :label="item.name" :value="item.id!" />
          </el-select>
        </div>
        <div class="form-item">
          <label>游戏场馆</label>
          <el-select v-model="platform_id" style="width:234px">
            <el-option v-for="item in currenList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
      </div>
      <div class="form-line">
        <div class="form-item">
          <label>投注时间</label>
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
          <template #default="{ row: { name } }">
            <span class="username">{{ name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="投注时间" :width="100">
          <template #default="{ row: { bet_time } }">
            <div>
              <span>{{ format(bet_time, 'yyyy-MM-dd') }}</span><br>
              <span>{{ format(bet_time, 'HH:mm:ss') }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bill_no" label="投注单号" :width="180" />
        <el-table-column align="center" prop="api_types" label="游戏场馆" :width="120">
          <template #default="{ row: { api_types } }">
            {{ getGameNameById(api_types) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="game_name" label="游戏玩法" />
        <el-table-column align="center" label="投注内容">
          <!-- 真人2、体育6、电竞8 -->
          <template #default="{ row: { game_type: gameType, play_type, result } }">
            <div
              v-if="['2', '6', '8'].includes(gameType)"
              cursor-pointer style="color:#3678FE;"
              @click="betDetailPopup(play_type, result)"
            >
              查看详情
            </div>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="投注金额" :width="120">
          <template #default="{ row: { bet_amount } }">
            <span>{{ toThousandsFloat(bet_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="游戏输赢" :width="120">
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

.bet-detail {
  @include pageCard;
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
