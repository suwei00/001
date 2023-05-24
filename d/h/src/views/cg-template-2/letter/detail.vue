<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { CgContainer, CgIcon, CgDivider, CgTime, CgHeader } from '@/components/cg-template-2';
import router from '@/router/cg-template-2';
import { deleteUserMsg } from '@/http/blue-apis';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { useRoute } from 'vue-router';
import { Toast } from 'vant';
import { useI18n } from 'vue-i18n';
import urlencode from 'urlencode'
const { t } = useI18n();
const Dialog = new CgDialogClass();
// 获取query参数
const route = useRoute()
const activeTabIndex = route.query.activeTabIndex ?? '';
// title 数据
const itemDetail = reactive({ content: '', send_name: '', title: '', time: '', ts: '', id: '', send_at: '', created_at: '' })
function getMsgData() {
  const MSG = sessionStorage.getItem('MSGdata')
  if (MSG) {
    try {
      Object.assign(itemDetail, JSON.parse(MSG))
    } catch (error) {
      console.log(error)
    }
  }
}



// 删除
const delMsgReq = () => {
  deleteUserMsg({ flag: 1, ids: itemDetail.id }).then((res: any) => {
    if (res) {
      Toast(t('success'));
      router.back()
    }
  })
}

const handleDelRead = () => {
  Dialog.showDialog({
    template: 'tmp1',
    title: 'LƯU Ý',
    tmp1Content: 'Sau Khi Xoá Không Thể Khôi Phục, Xác Nhận Xoá?',
    onOk: () => {
      delMsgReq();
    },
  });
}
function packDecode(str: string) {
  return urlencode.decode(str, 'utf8').replace(/\+/g, ' ').replace(/\&nbsp;/g, ' ')
}
onMounted(() => {
  getMsgData()
})
</script>
<template>
  <!-- 消息详情 -->
  <div class="notice_detail ">
    <CgHeader>
      THÔNG TIN CHI TIẾT
      <template #actions v-if="activeTabIndex === '1'">
        <CgIcon name="i_blue_del" @click="handleDelRead()" width="50"></CgIcon>
      </template>
    </CgHeader>
    <CgContainer padding="20" class="details-warp">
      <div class="title" v-html="packDecode(itemDetail.title)"></div>
      <div class="contents" v-html="packDecode(itemDetail.content)"></div>
      <div class="sign" v-if="activeTabIndex === '1'">{{ itemDetail.send_name }}</div>
      <div class="time" v-if="activeTabIndex === '1'">
        <cg-time :time="Number(itemDetail.send_at) " color="var(--cg-color-black1)" font="var(--cg-font-text3)" />
      </div>
    </CgContainer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'detail'
};
</script>
<style lang="scss" scoped>
.notice_detail {
  padding: 24px 32px;
}

.details-warp {
  .title {
    margin: 12px 0;
    font: var(--cg-font-text1);
    color: var(--cg-color-blue1);
  }

  .sign {
    margin-top: 33px;
    width: 100%;
    color: var(--cg-color-black1);
    font: var(--cg-font-text2);
  }

  .contents {
    word-break: break-all;
    white-space: pre-wrap;
    color: var(--cg-color-black1);
    font: var(--cg-font-text3);
    line-height: 30px;
    margin-top: 20px;
  }

  .time {
    width: 100%;
    line-height: 13px;
    margin-top: 20px;
    text-align: left;

    :deep(.cg-time) {
      >div {
        text-align: left;
      }

    }
  }
}
</style>
