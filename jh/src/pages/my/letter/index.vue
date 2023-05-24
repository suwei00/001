<script lang="ts" setup>
import dayjs from 'dayjs'
import useRouterBack from '~/hooks/routerBackHooks'
// component
import Header from '~/components/Header.vue'
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'

import { memberMsgDelRequest, memberMsgListRequest } from '~/api/index'

// 背景图
import bgSrc1 from '~/assets/images/noData/letter.png?preset=full'
import arrowBgSrc from '~/assets/images/my/delete.png?preset=full'
const { goTo } = useRouterBack()

const customizePullDownUp: any = ref(null)
const setParam: any = ref({
  page: 1,
  size: 10,
  total: 0,
  ty: 0,
})
const loading = ref(false)
const list: any = ref([])
const tss = ref<any>([])

const onSearch = () => {
  customizePullDownUp.value.down()
}
const dialogs = ref({
  visible: false,
  content: '',
})
const onConFirm = () => {
  memberMsgDelRequest({
    flag: 2,
    tss: tss.value.join(','),
  }).then((res: any) => {
    if (res.status)
      onSearch()
  })
}
const delAllRead = () => {
  dialogs.value.visible = true
  dialogs.value.content = '仅删除已读信息，确定要删除吗？'
}
const goToDetail = (item: any) => {
  goTo('/my/letter/letter-details', {
    title: item.title,
    ts: item.ts,
  })
  sessionStorage.setItem('letterContent', item.content)
}
const init = (resolve: any = undefined, type: any = undefined) => {
  loading.value = true

  memberMsgListRequest({
    page: setParam.value.page,
    page_size: setParam.value.size,
    ty: setParam.value.ty,
  }).then((res: any) => {
    if (res.status) {
      const { d = [], t = 0 } = res.data
      setParam.value.total = t
      if (setParam.value.page === 1)
        list.value = d ?? []
      else
        list.value = list.value.concat(d ?? [])
        // 如果list中的is_read不为0，就把ts放到tss中
      list.value.forEach((item: any) => {
        if (item.is_read !== 0)
          tss.value.push(item.ts)
      })
      console.log('tss.value', tss.value)
      resolve && resolve({ noPass: false, list: list.value })
    }
    else {
      resolve && resolve({ noPass: true, list: list.value })
    }
  }).catch(() => {
    resolve && resolve({ noPass: true, list: list.value })
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div class="tradeFineWarp">
    <Header title="站内信">
      <template #headRight>
        <bgImage :image="arrowBgSrc" class="del-img" @click="delAllRead()" />
      </template>
    </Header>
    <div class="dataContentWarp tt">
      <CustomizePullDownUp
        ref="customizePullDownUp" v-model="setParam" :list="list" :first-down-load="true" :no-data-img="bgSrc1"
        no-data-tip="还没有新的消息" @init="init"
      >
        <template #bSContent>
          <ol class="dataContent">
            <li v-for="(item, index) in list" :key="index">
              <!--  @click="goTo('/my/letter/letter-details', { title: item.title, content: item.content, ts: item.ts })" -->
              <div class="li" @click="goToDetail(item)">
                <div class="titleWarp">
                  <div class="title" :class="{ readTitle: item.is_read }">
                    {{ item.title }}
                  </div>
                  <div class="time">
                    {{ dayjs(item.ts).format('YYYY-MM-DD') }}
                  </div>
                </div>
                <div class="contnet" :class="{ readContnet: item.is_read }">
                  {{ item.content.replaceAll(/<[^>]*>/g, '').toString().replaceAll('nbsp;', "").replaceAll('&', "") }}
                </div>
              </div>
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>
  </div>

  <CustomizeDialog
    v-model="dialogs.visible"
    title="温馨提示"
    :content="dialogs.content"
    cancel-text="取消"
    confirm-text="确定"
    @confirm="onConFirm()"
  />
</template>

<style lang="scss" scoped>
:deep(.body){
padding-top: 15px;
}
.tradeFineWarp {
  width: 100%;
  height: 100%;
  background: #F5F5F9;
  display: flex;
  flex-direction: column;
  color: #000000;

  .dataContentWarp {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #fff;
  }

  .dataContent {
    width: 100%;
    padding-top: 10px;

    li {
      width: 100%;
      padding: 0 7px;
      background: #F7F9FD;
      border-bottom: 2px solid #fff;
      .li {
        width: 100%;
        min-height: 70px;
        padding: 15px 11px 0 11px;
        border-bottom: 1px solid #F1F1F1;

        .titleWarp {
          width: 100%;
          display: flex;
          align-items: center;

          .title {
            flex: 1;
            width: 100%;
            line-height: 21px;
            // height: 20px;
            font-size: 16px;
            padding-right: 33px;
            // 超过隐藏
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 600;
            &.readTitle{
              color: #9AA4C2;
            }
          }

          .time {
            line-height: 15px;
            height: 15px;
            font-size: 11px;
            color: #A5A9B3;
          }
        }

        .contnet {
          width: 100%;
          margin-top: 6px;
          padding-right: 58px;
          // font-size: 13px;
          // color: #828282;
          height: 16px;
          line-height: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: normal !important;
          color: #000 !important;
          &.readContnet{
            color: #888888 !important;
            font-weight: normal !important;
          }
        }
      }

      &:last-child {
        .li {
          border-bottom: none;
        }
      }
    }
  }
  .del-img{
    width: 17px;
    height: 17px;
  }
}
</style>
