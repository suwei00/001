<script setup lang='ts' name="cp-detail">
// 下级会员名
let username = $ref('')
// 查询范围
const ty = $ref(1)
// 投注状态
const betState = [
  { label: '全部', value: '' },
  { label: '待开奖', value: '0' },
  { label: '已中奖', value: '1' },
  { label: '未中奖', value: '2' },
  { label: '已撤单', value: '4' },
  { label: '和', value: '3' },
]
const flag = $ref('')
const date_flag = $ref<'0' | '1' | '3' | '7' | '30' | '60'>('0')

const { data: tableData, search, page, page_size, total, loading } = usePage((page, page_size) =>
  () => getLotteryBetList({ id: 0, ty, page: page.value, page_size: page_size.value, day: date_flag, state: flag, username }), {
  loadingKeep: 1000,
  refreshDeps: $$([date_flag, flag]),
  resetPageDeps: $$([date_flag, flag]),
})

// 查询
const handleSearch = () => {
  search()
  username = ''
}

const viewNumber = (item: any) => {
  return translateText(item?.balls, item?.tester)
}
</script>

<template>
  <div class="cp-detail">
    <div class="form">
      <div class="form-line">
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
        <!-- <el-table-column align="center" label="会员账号">
          <template #default="{ row: { username: name } }">
            <span class="username">{{ name }}</span>
          </template>
        </el-table-column> -->
        <el-table-column align="center" prop="lott_id" label="彩种" />
        <el-table-column align="center" prop="issue" label="期号" />
        <el-table-column align="center" prop="balls" label="投注内容">
          <template #default="{ row }">
            <el-popover
              placement="top"
              :width="300"
              :trigger="row?.balls.length > 25 ? 'hover' : 'focus'"
              :content="formatBalls(row?.balls)"
            >
              <template #reference>
                <p mx-auto my-0>
                  {{ row?.balls.length > 25 ? `${formatBalls(row?.balls.slice(0, 25))}...` : row?.lott_id.includes('快3') ? row?.balls.replace(/_/g, '') : viewNumber(row) }}
                </p>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bet_times" label="注数" :width="40" />
        <el-table-column align="center" prop="multiple" label="倍数" :width="40" />
        <el-table-column align="center" label="玩法">
          <template #default="{ row: { play_id, tester } }">
            <span>{{ tester === 'baozi' ? '猜豹子' : play_id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="投注金额">
          <template #default="{ row: { pay_amount } }">
            <span>{{ toThousandsFloat(pay_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="开奖号码">
          <template #default="{ row: { lott_id, result } }">
            <span v-if="lott_id.includes('六合彩') && result">{{ `${result.split(',').slice(0, -1)} + ${last(result.split(','))}` }}</span>
            <span v-else>{{ result }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="派奖金额">
          <template #default="{ row: { bonus } }">
            <span :class="getReportStatusClass(bonus)">{{ toThousandsFloat(bonus) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" :width="86">
          <template #default="{ row: { state } }">
            <span>{{ getCpState(state ?? 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="投注时间" :width="110">
          <template #default="{ row: { created_at } }">
            <span>{{ format((+created_at), 'yyyy-MM-dd') }}</span><br>
            <span>{{ format((+created_at), 'HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <!-- 无数据 -->
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
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
    </route>

