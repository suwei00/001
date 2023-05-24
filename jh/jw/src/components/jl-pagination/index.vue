<script setup lang='ts' name="jl-pagination">
type elPaginationProps = InstanceType<typeof import('element-plus/es')['ElPagination']>['$props']
type PProps = Omit<elPaginationProps, keyof typeof defaultProps>
const props = defineProps<Props>()
interface Props extends PProps {

}
const defaultProps = {
  prevText: '上一页', nextText: '下一页', layout: 'prev, pager, next',
}
</script>

<template>
  <el-pagination justify-center hide-on-single-page v-bind="{ ...props, ...defaultProps }" />
</template>

<style lang="scss" scoped>
.el-pagination {

  :deep(.btn-prev),
  :deep(.btn-next) {
    border: 1px solid #D2D7E3;
    border-radius: 6px;
    line-height: 26px;
    color: $text-primary;

    &[disabled] {
      opacity: .7;
    }
  }

  :deep(.btn-next) {
    margin-left: 6px;
  }

  :deep(.el-pager) {
    li {
      &:hover {
        color: $color-black-primary;
      }
    }

    .number {
      line-height: 26px;
      color: $text-primary;
      font-size: 13px;
      font-family: $jl-font;
      font-weight: 600;
      padding: 0 9px;
      border-radius: 3px;
      margin-left: 6px;
      border: 1px solid #D2D7E3;
      margin-right: 0;

      &.is-active {
        background: linear-gradient(180deg, #96AEFF 0%, $color-primary-second 100%);
        color: #fff;
      }
    }
  }
}
</style>
