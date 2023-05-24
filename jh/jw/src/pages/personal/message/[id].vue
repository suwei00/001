<script setup lang='ts' name="message-detail">
import { ElMessage } from 'element-plus'
import DeleteDialog from './components/delete-dialog.vue'

const userStore = useUserStore()
const router = useRouter()

// title 数据
const msgData = reactive({ content: '', send_name: '', title: '', time: '', ts: '', id: '' })
function getMsgData() {
  const MSG = sessionStorage.getItem('MSGdata')
  if (MSG) {
    const { content, send_name, title, ts, message_id } = JSON.parse(MSG)
    msgData.content = content
    msgData.send_name = send_name
    msgData.title = title
    msgData.ts = ts
    msgData.time = msgData.time = formatTime(new Date(ts))
    msgData.id = message_id
  }
}
getMsgData()

// 所有站内信--用于切换
const MSGDATA = sessionStorage.getItem('MSGDATA')
const msgList: any = ref([])
if (MSGDATA)
  msgList.value = JSON.parse(MSGDATA)

const currentIndex = computed(() => msgList.value.findIndex((i: any) => i.message_id === msgData.id))
function switchHandler(type: string) {
  let item: any
  switch (type) {
    case 'pre':
      if (currentIndex.value === 0)
        return
      item = msgList.value[currentIndex.value - 1]
      break
    case 'next':
      if (currentIndex.value === msgList.value.length - 1)
        return
      item = msgList.value[currentIndex.value + 1]
      break

    default:
      break
  }
  sessionStorage.setItem('MSGdata', JSON.stringify(item))
  getMsgData()
  if (item.is_read === 0) {
    readUserMsg({ ts: item.ts })
      .then((res) => {
        if (res === '1000')
          userStore.runGetMemberNum()
      })
      .catch((err) => { console.warn(err) })
  }
  router.push(`/personal/message/${item.message_id}`)
}

// 删除
let showTip = $ref(false)
const { run: runDeleteUserMsg } = useRequest(() => deleteUserMsg({ flag: 1, tss: msgData.ts }), {
  manual: true,
  onSuccess() {
    ElMessage.success('删除成功！')
    router.push('/personal/message')
  },
})
const deleteHandler = () => {
  runDeleteUserMsg()
  showTip = false
}
</script>

<template>
  <div class="message-detail">
    <personal-title title="信息详情" back="/personal/message">
      <template #messageDetail>
        <div class="msg-title">
          <div class="left">
            <h5>{{ msgData.title }}</h5>
            <span>{{ msgData.time }}</span>
          </div>
          <div class="right">
            <div class="img" @click="showTip = true">
              <img src="@images/personal/delete.png" alt="">
            </div>
            <div class="img" @click="switchHandler('pre')">
              <img v-if="currentIndex > 0" src="@images/personal/arrow-l.png" alt="">
              <img v-else src="@images/personal/arrow-stop.png" style="rotate: 180deg;">
            </div>
            <div class="img" @click="switchHandler('next')">
              <img v-if="currentIndex < msgList.length - 1" src="@images/personal/arrow-l.png" style="rotate: 180deg;">
              <img v-else src="@images/personal/arrow-stop.png">
            </div>
          </div>
        </div>
      </template>
    </personal-title>
    <main>
      <p v-html="msgData.content" />
    </main>

    <!-- 删除弹窗 -->
    <DeleteDialog v-if="showTip" des="删除后将无法恢复，确定要删除吗？" @cancel="showTip = false" @comfirm="deleteHandler" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.message-detail {
  @include pageCard;
}

main {
  padding-top: 20px;
  max-height: 1000px;
  overflow: auto;

  p {
    text-align: left;
    font-size: 13px;
    font-family: $jl-font;
    font-weight: 400;
    color: #515B7C;
    line-height: 3;
  }
  .send-name{
    text-align: right;
  }
  .msg-title {
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    h5 {
      font-size: 18px;
      font-family: $jl-font;
      font-weight: bold;
      color: #515B7C;
    }

    span {
      font-size: 13px;
      font-family: $jl-font;
      font-weight: 400;
      color: #9AA4C2;
    }
  }

  .right {
    display: flex;
    width: 88px;
    height: 20px;
    align-items: center;
    justify-content: space-between;

    .img {
      cursor: pointer;
      padding: 3px 8px;
    }

    .img:nth-of-type(1) {
      img {
        width: 16.92px;
        height: 20px;
      }
    }

    .img:nth-of-type(2),
    .img:nth-of-type(3) {
      img {
        width: 8.9px;
        height: 16px;
      }
    }
  }

}
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
