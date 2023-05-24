<script setup lang='ts' name="avatar-edit">
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const userStore = useUserStore()
let id = $ref(0)
let visible = $(useVModel(props, 'modelValue', emit))
const { avatarList } = useAvatar()
// 更新头像
const { run, loading } = useRequest(() => updateAvatar({ id: `${id}` }), {
  manual: true,
  loadingKeep: 1000,
  onSuccess: () => {
    // 更新个人信息
    userStore.runGetUserInfo()
    visible = false
  },
})
const handleClick = (index: number) => {
  id = index
}
</script>

<template>
  <el-dialog v-model="visible" :show-close="false" width="550px">
    <template #header>
      <div class="jl-dialog-header">
        <h3 class="title">
          选择头像
        </h3>
        <i i-common-close w-14px h-14px @click="visible = false" />
      </div>
    </template>
    <div class="content">
      <ul class="avatar-list">
        <li
          v-for="(item, index) in avatarList.slice(1)" :key="index" :class="[index + 1 === id ? 'active' : '']"
          @click="handleClick(index + 1)"
        >
          <jl-image :src="item.src" :thumb="item.thumb" w-90px h-90px />
        </li>
      </ul>
    </div>
    <template #footer>
      <div class="footer-inner">
        <jl-button :disabled="!!!id" w-450px h-50px lh-50px :loading="loading" @click="run">
          确认
        </jl-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.content {
  padding: 35px 0;

  .avatar-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -24px;
    margin-top: -24px;

    li {
      border-radius: 50%;
      margin-left: 24px;
      margin-top: 24px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      border: 5px solid transparent;
      transition: all 0.5s;

      &.active {
        border: 5px solid $color-primary-second;
      }
    }
  }
}

.footer-inner {
  display: flex;
  justify-content: center;
}
</style>
