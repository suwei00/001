<script setup lang="ts">
interface CGTileProps {
  active?: boolean
  avatarBorder?: boolean
  contentBorder?: boolean
  height?: string | number
  start?: boolean
  paddingRight?: string | number
}

withDefaults(defineProps<CGTileProps>(), {
  active: false,
  avatarBorder: false,
  contentBorder: true,
  paddingRight: 24,
  height: 120,
  start: false
})
</script>

<template>
  <div class="cg_list_tile" :class="{ active }" :style="`height: var(--cg-px-${height})`">
    <div
      class="avatar"
      :class="{ border_bottom: avatarBorder }"
      :style="`padding-right: var(--cg-px-${paddingRight})`"
    >
      <slot name="avatar"></slot>
    </div>
    <div class="content" :class="{ border_bottom: contentBorder, right32: !Boolean($slots.icon) }">
      <div class="content_item up">
        <slot name="up" />
      </div>
      <div class="content_item under" :class="{ under_start: start }" v-if="$slots.under">
        <slot name="under" />
      </div>
    </div>
    <div v-if="$slots.icon" class="icon_slot">
      <slot name="icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg_list_tile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 32px;
  .avatar {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .content {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    color: var(--cg-color-text-4);
    &_item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 6px 0;
    }

    .up {
      :deep(div) {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: keep-all;
        font: var(--cg-font-11);
        color: var(--cg-color-text-4);
        &:first-child {
          flex: 1;
          font: var(--cg-font-6);
          color: var(--cg-color-text-3);
          margin-right: 10px;
        }
      }
    }

    .under {
      font: var(--cg-font-9);
      :deep(div) {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: keep-all;
        &:first-child {
          flex: 1;
          margin-right: 26px;
        }
      }

      :deep(img) {
        &:first-child {
          margin-right: 10px;
        }
      }
    }

    .under_start {
      justify-content: flex-start;
    }
  }

  .border_bottom {
    border-bottom: 1px solid var(--cg-color-border-1);
  }

  .right32 {
    padding-right: 32px;
  }

  .icon_slot {
    padding-left: 24px;
    padding-right: 32px;
  }

  &.active {
    background-color: var(--cg-color-bg-10);
  }
}
</style>
