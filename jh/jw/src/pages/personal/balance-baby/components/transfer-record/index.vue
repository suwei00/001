<script setup lang='ts' name='transfer-record'>
// 下级会员名
const username = $ref('')
// 查询范围
const ty = $ref(1)
const flag = $ref('0')
const recordTypes = [
  { label: '全部类型', value: '0' },
  { label: '转入余额宝', value: '1' },
  { label: '余额宝提现', value: '2' },
  { label: '余额宝收益', value: '3' },
]
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
}
</script>

<template>
  <div text-left>
    <div flex>
      <div class="form-item" mr-25px>
        <label mr-11px>类型</label>
        <el-select v-model="flag" style="width:180px">
          <el-option v-for="item in recordTypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="form-item" mr-16px>
        <label mr-11px>时间</label>
        <jl-switch v-model="date_flag" :list="cpDateList" />
      </div>
      <div class="search-box">
        <jl-button :loading="loading" w-100px lh-42px h-42px @click="handleSearch">
          查询
        </jl-button>
      </div>
    </div>
    <div mt-30px>
      <el-table v-loading="loading" :data="tableData" v-bind="{ ...elTableCss, ...vLoading }" stripe w-full mb-15px>
        <el-table-column align="center" prop="lott_id" label="时间" />
        <el-table-column align="center" prop="lott_id" label="订单号" />
        <el-table-column align="center" prop="issue" label="类型" />
        <el-table-column align="center" prop="bet_times" label="金额" />
        <el-table-column align="center" prop="multiple" label="状态" />
        <el-table-column align="center" prop="multiple" label="备注" :width="100" />
        <!-- 无数据 -->
        <template #empty>
          <personal-empty desc="暂无数据" />
        </template>
      </el-table>
      <jl-pagination v-model:page-size="page_size" v-model:current-page="page" :total="total" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
@use '~/pages/personal/index.scss' as *;
.form-item{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
