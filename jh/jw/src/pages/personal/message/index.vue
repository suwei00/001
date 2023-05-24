<script setup lang='ts' name="message">
import { ElMessage } from 'element-plus'
import DeleteDialog from './components/delete-dialog.vue'

interface Item {
  ts: string
  message_id: string
  username: string
  title: string
  content: string
  is_top: number
  is_vip: number
  ty: number
  is_read: number
  send_name: string
  send_at: number
  prefix: string
}
const userStore = useUserStore()
// 获取站内信
const page_size = $ref(10)
const page = $ref(1)
let total = $ref(0)
const { data: userMsg, run: runGetUserMsgList } = $(useRequest(
  () => getUserMsgList({ page, page_size, ty: 0 }),
  {
    refreshDeps: $$([page]),
    onSuccess(data) {
      if (page === 1) {
        total = data.t
        userStore.runGetMemberNum()
      }
    },
  },
))
const list = computed<Array<Item>>(() => {
  return userMsg?.d?.map((m) => {
    if (m.message_id === '0')
      m.message_id = nanoid()

    return m
  }) ?? []
})
const noTagList = computed(() => {
  const data = cloneDeep(userMsg?.d)
  data?.forEach((item: Item) => {
    item.content = item.content.replace(/<[^<>]+>/g, '').replaceAll('&nbsp;', '')
  })
  return data ?? []
})
const readedList = $computed(() => list.value?.filter((i: any) => i.is_read === 1).map((m: any) => m.ts))

// 跳转详情
const router = useRouter()
const handleItemClick = (index: number) => {
  sessionStorage.setItem('MSGDATA', JSON.stringify(list.value))
  sessionStorage.setItem('MSGdata', JSON.stringify(list.value[index]))
  if (list.value[index].is_read === 0) {
    readUserMsg({ ts: list.value[index].ts })
      .then((res) => {
        if (res === '1000')
          userStore.runGetMemberNum()
      })
      .catch((err) => { console.warn(err) })
  }
  router.push(`/personal/message/${list.value[index].message_id}`)
}

// 删除已读
const isReady = $computed(() => {
  return isNull(readedList) ? Boolean(false) : Boolean(readedList && readedList.length > 0)
})
const { run: runDeleteMsg } = useRequest(() => deleteUserMsg({ flag: 2, tss: readedList?.join(',') }), {
  manual: true,
  ready: $$(isReady),
  onSuccess() {
    ElMessage.success('删除成功！')
    runGetUserMsgList()
  },
})
let showTip = $ref(false)
const deleteHandler = () => {
  if (isReady)
    runDeleteMsg()

  showTip = false
}
</script>

<template>
  <div class="message">
    <personal-title title="站内信">
      <template #right>
        <span class="del" @click="showTip = true">
          <img src="@images/personal/delete.png" w-17px h-20px mr-7px>
          删除已读
        </span>
      </template>
    </personal-title>
    <div class="list">
      <ul>
        <li
          v-for="(item, index) in noTagList" :key="index" :data-index="index" :class="{ read: item.is_read === 1 }"
          @click="handleItemClick(index)"
        >
          <div class="message-header">
            <span class="title">{{ item.title }}</span>
            <span class="time">{{ format(new Date(item.ts), 'yyyy-MM-dd') }}</span>
          </div>
          <div class="message-content">
            {{ item.content.replace(/<[^<>]+>/g, '').replaceAll('&nbsp;', '') }}
          </div>
        </li>
      </ul>
    </div>
    <personal-empty v-if="list.length === 0" class="personal-empty" desc="还没有新的消息" />

    <div class="pagination-wrapper">
      <jl-pagination v-model:page-size="page_size" v-model:current-page="page" mt-20px :total="total" />
    </div>

    <!-- 删除弹窗 -->
    <DeleteDialog v-if="showTip" des="仅删除已读信息，确定要删除吗？" @cancel="showTip = false" @comfirm="deleteHandler" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.message {
  @include pageCard;
  position: relative;

  .del {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 13px;
  }

  .list {
    padding-top: 20px;

    ul {
      li {
        background: #F7F9FD;
        border-radius: 10px;
        padding: 14px 20px 20px 20px;
        cursor: pointer;
        color: $color-black-primary;

        &+li {
          margin-top: 12px;
        }

        .message-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title {
            font-family: $jl-font;
            font-size: 18px;
            font-weight: 600;
            line-height: 25px;
          }

          .time {
            color: #94A6B7;
            font-size: 13px;
          }
        }

        .message-content {
          padding-top: 12px;
          text-align: left;
          font-size: 15px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

        }
      }

      .read {
        color: #9AA4C2;
        background: #f7f9fd80;

        .message-content {
          color: #888888;
        }
      }
    }
  }

  .pagination-wrapper {
    padding-top: 22px;
    display: flex;
    justify-content: center;
  }
}

.personal-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dialog-tip {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 0%, 0.3);
  z-index: 2000;
  color: #333;

  .body {
    width: 550px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
    padding: 42px 50px 58px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
      text-align: left;
      position: relative;

      h5 {
        font-size: 18px;
        font-family: $jl-font;
        font-weight: 600;
      }

      .right {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        padding: 5px;

        img {
          width: 14px;
          height: 14px;
        }
      }
    }

    p {
      text-align: center;
      margin: 0 auto 50px;
      font-size: 15px;
      font-family: $jl-font;
      font-weight: 400;
      color: #333333;
    }

    button {
      width: 450px;
      height: 50px;
      background: #597EF7;
      color: #fff;
      border-radius: 6px;
      font-size: 18px;
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
