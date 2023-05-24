<script setup lang='ts'>
const router = useRouter()
let exchangeText = $ref('编辑')
const { setGroupAnnouncement, setGroupIntroduction } = useUserStore()
const { groupAnnouncement, groupIntroduction } = $(storeToRefs(useUserStore()))
let message = $ref('')
const route = useRoute()
const gid = $(useRouteQuery('gid', ''))

const records = {
  state: route.query.state ?? '', // state// 该用户在该群的角色 1 普通成员 2 管理员 3 退群 4 群主
  type: route.query.type ?? '', // 1:群公告 2:群介绍
}
// 页面title
const config = computed(() => records.type === '1' ? { title: '群公告', placeText: '请设置群公告' } : { title: '群介绍', placeText: '请设置群介绍' })

const textEdit = () => {
  exchangeText = exchangeText === '编辑' ? '保存' : '编辑'

  if (exchangeText === '保存')
    return
  if (records.type === '1') {
    getUpdateAnnouncemenRequest({ gid, content: message }).then((res: any) => {
      if (res) {
        setGroupAnnouncement(message)
        showToast('操作成功')
        router.back()
      }
    })
  }
  else {
    getUpdateIntroductionRequest({ gid, content: message }).then((res: any) => {
      if (res) {
        setGroupIntroduction(message)
        showToast('操作成功')
        router.back()
      }
    })
  }
}

onMounted(() => {
  message = records.type === '1' ? groupAnnouncement : groupIntroduction
})
</script>

<!-- 群介绍 -->
<template>
  <ChatHeader :title="config.title" :is-back="true">
    <template #actions>
      <div class="edit" @click="textEdit">
        {{ records.state === '1' ? '' : exchangeText }}
      </div>
    </template>
  </ChatHeader>
  <div class="group_introduce br-bottom">
    <van-cell-group inset>
      <van-field
        v-model="message"
        :readonly="exchangeText === '编辑'" rows="4" type="textarea" maxlength="300" :placeholder="config.placeText"
        show-word-limit
      />
    </van-cell-group>
  </div>
</template>

<style lang="scss" scoped>
.edit {
  font-size: $size14;
  font-weight: 600;
  color: $color-white-1;
}
//群员不可编辑
.not_editable{
  pointer-events: none;
}
.group_introduce {
  height: 148px;

  :deep(.van-cell-group) {
    width: 100%;
    padding: 0;
    margin: 0;
    height: 100%;
    border-radius: 0;
  }
}
</style>
