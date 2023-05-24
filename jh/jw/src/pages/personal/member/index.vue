<script setup lang='ts' name="member">
import memberDialog from './member-dialog.vue'

const username = $ref('')
let parent_name = $ref('')
const { data: tableData, total, page, page_size, search, loading } = usePage((page, page_size) =>
  () => getMemberList({ page: page.value, page_size: page_size.value, username, parent_name }), {
  loadingKeep: 1000,
})
// 点击会员账号
const handleClickUsername = (val: string, row: any) => {
  sessionStorage.setItem('superRebate', JSON.stringify(row))
  parent_name = val
  search()
}
// 默认清除
sessionStorage.removeItem('superRebate')

// 点击查询
const handleSearch = () => {
  parent_name = ''
  sessionStorage.removeItem('superRebate')
  search()
}

// 查看返水比例
const rebateRef = ref()
const openRebate = (row: any) => {
  rebateRef.value.open(row)
}
</script>

<template>
  <div class="member">
    <personal-title title="会员管理" />
    <div class="form">
      <div class="form-line">
        <div class="form-item">
          <label for="account">会员账号</label>
          <el-input v-model="username" style="width:400px" placeholder="请输入您要查询的下级账号" />
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
        <el-table-column align="center" prop="username" label="会员账号" :width="140">
          <template #default="{ row }">
            <span
              class="username" color-color-primary-second underline cursor-pointer
              @click="handleClickUsername(row.username, row)"
            >{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员等级" :width="100">
          <template #default="{ row: { lvl } }">
            <span>VIP{{ lvl }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="parent_name" label="直属上级" :width="140" />
        <el-table-column align="center" prop="mem_count" label="下级人数" :width="100" />
        <el-table-column align="center" label="中心钱包余额" :width="120">
          <template #default="{ row: { balance } }">
            <span>{{ toThousandsFloat(balance) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="last_login_at" label="最后登录时间">
          <template #default="{ row: { last_login_at, is_online } }">
            <!-- 在线显示在线，不在线显示最后登录时间 -->
            <span :style="{ color: is_online === '1' ? '#16B18BFF' : '#FA0513FF' }">{{ is_online === '1' ? '在线' : formatTime((+last_login_at)) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="u" label="返水比例" :width="120">
          <template #default="{ row }">
            <span
              color-color-primary-second
              underline cursor-pointer
              @click="openRebate(row)"
            >返水比例</span>
          </template>
        </el-table-column>
        <template #empty>
          <personal-empty desc="暂无数据" />
        </template>
      </el-table>
      <jl-pagination v-model:page-size="page_size" v-model:current-page="page" mt-20px :total="total" />

      <!-- 返水比例 -->
      <member-dialog ref="rebateRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.member {
  @include pageCard;
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
