<template>
  <el-pagination background layout="prev, pager, next" :pageSize="pageSize" :currentPage="currentPage" :total="total" @current-change="handleCurrentChange" />
</template>

<script setup lang="ts">
import CgPagination from './index.d';

interface Props extends CgPagination.Props {
  total: number;
  pageSize?: number;
  currentPage: number;
}
withDefaults(defineProps<Props>(), {
  total: 0,
  pageSize: 10,
  currentPage: 1
});

const emit = defineEmits(['pageChange']);

const handleCurrentChange = (page: number) => {
  emit('pageChange', page);
};
</script>

<script lang="ts">
export default {
  name: 'CgPagination'
};
</script>

<style lang="scss" scoped>
.el-pagination {
  &.is-background {
    :deep(.el-pager) {
      li:not(.disabled).active,
      li:not(.disabled):hover {
        background: linear-gradient(180deg, var(--cg-color-blue3) 0%, var(--cg-color-blue5) 100%);
        box-shadow: 0px 4px 4px rgba(190, 215, 239, 0.6);
        color: var(--cg-color-white);
      }
    }
    :deep(.btn-next),
    :deep(.btn-prev),
    :deep(.el-pager) li {
      border-radius: 3px;
      background: linear-gradient(180deg, var(--cg-color-white) 0%, var(--cg-color-white1) 100%);
      border: 1px solid var(--cg-color-white1);
      font-family: 'Arial';
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      text-align: center;
      color: var(--cg-color-grey1);
      height: 30px;
    }

    :deep(.btn-next),
    :deep(.btn-prev) {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      .el-icon {
        font-weight: 900;
        font-size: 18px;
      }
    }
  }
}

:deep(.btn-next):not([disabled]):hover,
:deep(.btn-prev):not([disabled]):hover {
  background: linear-gradient(180deg, var(--cg-color-blue3) 0%, var(--cg-color-blue5) 100%) !important;
  box-shadow: 0px 4px 4px rgba(190, 215, 239, 0.6);
  color: var(--cg-color-white);
  .el-icon {
    color: var(--cg-color-white);
  }
}
</style>
