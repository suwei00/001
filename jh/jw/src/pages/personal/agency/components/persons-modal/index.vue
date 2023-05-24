<script setup lang='ts' name="persons-modal">
import type { Ref } from 'vue'
import type { DateFlag } from '~/api/type'

const props = defineProps<{
  modelValue: boolean
  title: string
  flags: 1 | 2 | 3 | 4
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
// 父组件通过provide注入的ty
const injectTy = inject<Ref<DateFlag>>('ty')
// 父组件通过provide注入的username
const injectUsername = inject<Ref<string>>('username')
const ty: DateFlag = $ref(injectTy?.value ?? '1')
const visible = $(useVModel(props, 'modelValue', emit))
const username = $ref(injectUsername?.value ?? '')
const { data: tableData, page_size, page, total, loading } = usePage((page, page_size) => () => getAgencySub({ page: page.value, page_size: page_size.value, username, flag: props.flags, ty }), {
  page_size: 10,
  refreshDeps: $$([ty]),
  ready: $$(visible),
  debounceInterval: 300,
  resetPageDeps: $$([ty]),
})
// 投注人数
</script>

<template>
  <el-dialog v-model="visible" destroy-on-close :show-close="false" width="840px" align-center>
    <template #header>
      <div class="jl-dialog-header">
        <h3 class="title">
          {{ title }}
        </h3>
        <i i-common-close w-14px h-14px @click="visible = false" />
      </div>
    </template>
    <div pt-34px>
      <jl-switch v-model="ty" :list="dateList" mb-16px width="129.25px" />
      <el-table v-loading="loading" min-h-660px :data="tableData" v-bind="{ ...elTableCss, ...vLoading }" stripe w-full>
        <!-- 投注人数 -->
        <template v-if="props.flags === 1">
          <el-table-column align="center" prop="username" label="会员账号" />
          <el-table-column align="center" prop="bet_count" label="投注次数" />
          <el-table-column align="center" label="投注金额">
            <template #default="{ row: { bet_amount } }">
              <span>{{ toThousandsFloat(bet_amount) }}</span>
            </template>
          </el-table-column>
        </template>
        <!-- 首充人数 -->
        <template v-else-if="props.flags === 3">
          <el-table-column align="center" prop="username" label="会员账号" />
          <el-table-column align="center" prop="first_deposit_amount" label="首充金额" />
          <el-table-column align="center" label="充值时间">
            <template #default="{ row: { first_deposit_at } }">
              <span>{{ format((+first_deposit_at * 1000), 'yyyy-MM-dd HH:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="注册时间">
            <template #default="{ row: { created_at } }">
              <span>{{ format((+created_at * 1000), 'yyyy-MM-dd HH:mm:ss') }}</span>
            </template>
          </el-table-column>
        </template>
        <!-- 注册人数 -->
        <template v-else-if="props.flags === 2">
          <el-table-column align="center" prop="username" label="会员账号" />
          <el-table-column align="center" prop="parent_name" label="直属上级" />
          <el-table-column align="center" label="注册时间">
            <template #default="{ row: { created_at } }">
              <span>{{ format((+created_at * 1000), 'yyyy-MM-dd HH:mm:ss') }}</span>
            </template>
          </el-table-column>
        </template>
        <!-- 下级人数 -->
        <template v-else-if="props.flags === 4">
          <el-table-column align="center" prop="username" label="会员账号" />
          <el-table-column align="center" prop="parent_name" label="直属上级" />
          <el-table-column align="center" prop="mem_count" label="下级人数" />
        </template>

        <template #empty>
          <personal-empty desc="暂无数据" />
        </template>
      </el-table>
    </div>
    <template #footer>
      <jl-pagination v-model:page-size="page_size" v-model:current-page="page" mt-20px :total="total" />
    </template>
  </el-dialog>
</template>

