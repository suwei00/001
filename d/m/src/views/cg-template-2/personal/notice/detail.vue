<script lang="ts" setup>
import { reactive } from 'vue';
import { CgContainer, CgIcon, CgDivider, CgTime } from '@/components/cg-template-2'
import PersonalTitle from '../components/personal-title/index.vue'
import router from '@/router/cg-template-2';
import { deleteUserMsg } from '@/http/blue-apis';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
import { useRoute } from 'vue-router';
import Toast from '@/components/cg-template-2/toast';
const Dialog = new CgDialogClass()
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
getMsgData();


//删除
const delMsgReq = () => {
  deleteUserMsg({ flag: 1, ids: itemDetail.id }).then((res: any) => {
    if (res) {
      Toast('thành công');
      router.push('/personal/notice')
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

// 解码
const packDecode = (str: any) => {
  return decodeURIComponent(str).replace(/\+/g, ' ').replace('<br/>', ' ').replace('&nbsp', ' ');
};
</script>
<template>
  <!-- 消息详情 -->
  <div class="notice_detail">
    <personal-title title="TIN NHẮN" />
    <div class="flex ai-c jc-sb">
      <div class="back_icon flex-middle pointer" @click="$router.back()">
        <cg-icon width="12" name="i_back" />
        <span class="tip">Trở Về</span>
      </div>
      <div class="clear-icon flex-middle pointer" @click="handleDelRead" v-if="activeTabIndex === '1'">
        <cg-icon name="i_letter_del" width="30" />
        <span>Xoá</span>
      </div>
    </div>
    <CgContainer type='smallContainer' padding="18" radius="8" margin="12,0,0,0" class="details-warp ">
      <template #content>
        <div class="title" v-html="packDecode(itemDetail.title)"></div>
        <cg-divider margin="15px 0 15px 0" />
        <div class="contents" v-html="packDecode(itemDetail.content)">
        </div>
        <div class="sign" v-if="activeTabIndex === '1'">{{ itemDetail.send_name }}</div>
        <div class="time" v-if="activeTabIndex === '1'">
          <cg-time :time="itemDetail.send_at || itemDetail.created_at" color="var(--cg-color-grey5)"
            font="var(--cg-font-text6)" />
        </div>
      </template>
    </CgContainer>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'detail'
}
</script>
<style lang="scss" scoped>
.tip {
  margin-left: 9px;
  font: var(--cg-font-text6);
  color: var(--cg-color-grey1);
}

.clear-icon {
  span {
    margin-left: 5px;
    color: var(--cg-color-grey1);
    font: var(--cg-font-text6);
  }
}

.details-warp {

  .title {
    font: var(--cg-font-text2);
    color: var(--cg-color-blue12);
  }

  .contents {
    max-height: 1000px;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .sign {
    margin-top: 33px;
    width: 100%;
    color: var(--cg-color-grey1);
    font: var(--cg-font-text);
  }

  .time {
    width: 100%;
    color: var(--cg-color-grey5);
    font: var(--cg-font-text6);
    line-height: 13px;
    margin-top: 5px;
  }
}</style>
