<script lang="ts" setup>
import dayjs from 'dayjs'
import Header from '~/components/Header.vue'
import bgImage from '~/components/bgImage.vue'

import useRouterBack from '~/hooks/routerBackHooks'

import { memberMsgDelRequest, memberMsgReadRequest } from '~/api/index'

// 背景图
import arrowBgSrc from '~/assets/images/my/delete.png?preset=full'

const { goBack } = useRouterBack()
const route = useRoute()
const { title, ts } = route.query
const sessContent = sessionStorage.getItem('letterContent')
const dialogs = ref({
  visible: false,
  content: '',
})
const onConFirm = () => {
  memberMsgDelRequest({
    flag: 1,
    tss: ts as string,
  }).then((res: any) => {
    if (res.status)
      goBack()
  })
}
const onDelete = () => {
  dialogs.value.visible = true
  dialogs.value.content = '删除后将无法恢复，确定要删除么？'
}

const onRead = () => {
  memberMsgReadRequest({
    ts: ts as string,
  })
}
onRead()
</script>

<template>
  <div class="letterDetailsWarp">
    <Header title="信息详情">
      <template #headRight>
        <bgImage :image="arrowBgSrc" class="del-img" @click="onDelete()" />
      </template>
    </Header>
    <div class="letterDetails">
      <div class="letterDetailsHead">
        <div class="titleWarp">
          <p class="title" v-html="title" />
          <p class="time">
            {{ dayjs(ts as string).format('YYYY-MM-DD HH:mm:ss') }}
          </p>
        </div>
      </div>
      <div class="letterDetailsMain" v-html="sessContent" />
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
.letterDetailsWarp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  color: #000000;

  .letterDetails {
    width: 100%;
    height: 90%;
    // padding: 0 18px;
    background-color: #fff;
    border-top: 2px solid #F3F3F3;

    .letterDetailsHead {
      width: 100%;
      padding: 10px 18px 0 18px;
      line-height: 21px;
      border-bottom: 1px solid #F3F3F3;
      display: flex;
      align-items: center;

      .titleWarp {
        flex: 1;
        width: 100%;
        overflow: hidden;

        .title {
          width: 100%;
          font-size: 14px;
          font-weight: 800;
          line-height: 20px;
        }

        .time {
          margin-top: 2px;
          margin-bottom: 10px;
          line-height: 1;
          font-size: 12px;
          color: #94A6B7;
        }
      }

     img{
        width: 17px;
        height: 17px;
        margin-left: 10px;
      }
    }

    .letterDetailsMain {
      width: 100%;
      height: 100%;
      padding: 9px 18px 60px 18px;
      // line-height: 19px;
      font-size: 13px;
      word-break: break-word;
      white-space: pre-wrap;
      // text-align: justify;
      overflow-y: scroll;
      ::v-deep(*) {
        line-height: normal;
      }
    }
  }
  .del-img{
    width: 17px;
    height: 17px;
  }
}
</style>
