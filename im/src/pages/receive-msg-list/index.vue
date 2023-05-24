<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import router from '@/router'

const msgList = ref<any>([])
msgList.value = [
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 01 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 01 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 01 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 02 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 02 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 02 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 03 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 03 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 03 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 05 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 06 12:00:00').getTime() },
  { name: '张楠_PM', avatar: '', message: '', t: new Date('2023 05 06 12:00:00').getTime() }
].sort((a, b) => a.t - b.t)

const loading = ref(false)
const finished = ref(false)
const refresh = () => {}
const loadMoreData = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;

    // 第一种消息数据处理：按照时间排序，如果当前消息所在日期与上一条消息不同，就插入一条type日期bar
    // 第二种：数据处理成按同一天为一个item项
    // 数据全部加载完成
    finished.value = true;
  }, 1000)
}

const dealedMsg = computed(() => {
  if (!msgList.value || !msgList.value.length) return []
  let obj: any = {}
  for (let i = 0; i < msgList.value.length; i++) {
    let item = msgList.value[i]
    let t = new Date(item.t)
    let date = `${t.getFullYear()} ${t.getMonth() + 1} ${t.getDate()}`
    if (obj[date]) {
      obj[date].items.push(item)
    } else {
      obj[date] = {
        d: date,
        firstMsgTime: item.t,
        items: [item]
      }
    }
  }

  let arr: any[] = []
  Object.keys(obj)
    .sort((a, b) => +a - +b)
    .forEach((k) => {
      arr.push(obj[k])
    })
  return arr
})
</script>

<template>
  <cg-nav-header title="Thông tin mới" left-arrow />
  <div class="receive-msg-list">
    <template v-if="dealedMsg.length">
      <cg-list
        :loading="loading"
        :finished="finished"
        @refresh="refresh"
        @loadMoreData="loadMoreData"
      >
        <section v-for="dm in dealedMsg" :key="dm.d" class="oneday-msg">
          <div class="date"><cg-time :time="dm.firstMsgTime" format="DD/MM" font="10" /></div>
          <ul>
            <li>
              <cg-list-item v-for="msg in dm.items" min-height="136" :border="'long'" :has-margin="false">
                <template #icon>
                  <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
                </template>
                <template #title>
                  <div>
                    <strong>{{ msg.name }}</strong>
                  </div>
                </template>
                <template #subTitle>
                  <div>
                    Yêu cầu thêm bạn làm bạn bè!
                  </div>
                </template>
              </cg-list-item>
            </li>
          </ul>
        </section>
      </cg-list>
    </template>
    <!-- 无 -->
    <cg-empty v-else :margin-top="200" />
  </div>
</template>

<style lang="scss" scoped>
.receive-msg-list {
  .oneday-msg {
    .date {
      background-color: var(--cg-color-bg-8);
      padding-left: 32px;
      height: 64px;
      line-height: 64px;
    }
  }
}
</style>
