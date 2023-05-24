<script setup lang='ts'>
import { CgContainer, CgTab, CgIcon, CgBadge, CgTime, CgCheckbox, CgPagination, CgEmpty } from '@/components/cg-template-2'
import PersonalTitle from '../components/personal-title/index.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRequest } from 'vue-request';
import { deleteUserMsg, readUserMsg, getUserMsgList, getNotice, readNotices } from '@/http/blue-apis';
import { useRouter } from 'vue-router';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { useLoading } from '@/hooks/useLoading';
import Toast from '@/components/cg-template-2/toast';
const userInfoStore = userInfoStateStore();
const Dialog = new CgDialogClass()
const checkAll = ref(false)
const { startLoading, closeLoading } = useLoading();
const navList = [
  { value: '1', name: 'TRẠM THƯ' },
  { value: '2', name: 'THÔNG BÁO' }
];
const activeTabIndex = ref(sessionStorage.getItem('MSGactiveTabIndex') || '1');
const currentPage = sessionStorage.getItem('currentPage') || '1';
const noticeTotal = sessionStorage.getItem('noticeTotal') || '0';
const messageTotal = sessionStorage.getItem('messageTotal') || '0';
const isSet: any = ref(false)
const pagination = reactive({
  noticeTotal: Number(noticeTotal),
  messageTotal: Number(messageTotal),
  page: Number(currentPage),
  page_size: 10
});
const listData = ref<any[]>([]);

onMounted(() => {
  startLoading();

});
// 站内信
const { run: getMessageListReq } = (useRequest(() => getUserMsgList({ page: pagination.page, page_size: pagination.page_size, ty: 0 }), {
  onSuccess(res: any) {
    closeLoading();
    if (pagination.page === 1) {
      pagination.messageTotal = res.t;
      sessionStorage.setItem('messageTotal', res.t.toString())
    }
    (res.d || []).forEach((item: any) => {
      item.selected = false;
    });
    if (activeTabIndex.value === '1') {
      listData.value = res.d;
    }
  },
},
))
//公告
const { run: getNoticeListReq } = (useRequest(() => getNotice({ page: pagination.page, page_size: pagination.page_size, }), {
  onSuccess(res: any) {
    closeLoading();
    if (pagination.page === 1) {
      pagination.noticeTotal = res.t;
      sessionStorage.setItem('noticeTotal', res.t.toString())
    }
    if (activeTabIndex.value === '2') {
      listData.value = res.d;
    }
  },
},
))


// 切换
watch(activeTabIndex, (val) => {
  sessionStorage.setItem('MSGactiveTabIndex', val);
  pagination.page = 1;
  if (val === '1') {
    getMessageListReq();
  } else {
    isSet.value = false
    getNoticeListReq();
  }
});

//删除全部
const handleDelReadAll = () => {
  Dialog.showDialog({
    template: 'tmp1',
    title: 'LƯU Ý',
    tmp1Content: 'Sau Khi Xoá Không Thể Khôi Phục, Xác Nhận Xoá?',
    onOk: () => {
      const ids = listData.value.filter((item: any) => item.selected).map((item: any) => item.id);
      startLoading();
      // 1 精确删除 2 删除所有已读 3删除所有站内信
      useRequest(() => deleteUserMsg({ flag: 1, ids: ids.toString() }), {
        onSuccess: (res: any) => {
          closeLoading()
          Toast('thành công');
          if (ids.length === listData.value.length) {
            pagination.page = 1;
            getMessageListReq();
          } else {
            pagination.messageTotal = pagination.messageTotal - ids.length
            listData.value = listData.value.filter((item: any) => !ids.includes(item.id))
          }
          userInfoStore.runGetMemberNum();
        }
      });
    },
  })
}

// 点击的站内信index
const itemDetail: any = ref<{ title: string; content: string; send_name: string; created_name: string; send_at: number; ts: string; created_at: string }>();
// 跳转详情
const router = useRouter()
const handleItemClick = async (info: any) => {
  sessionStorage.setItem('MSGdata', JSON.stringify(info))
  sessionStorage.setItem('MSGactiveTabIndex', activeTabIndex.value)
  sessionStorage.setItem('currentPage', pagination.page.toString())
  itemDetail.value = info;
  if (activeTabIndex.value === '1') {
    // 站内信已读消息
    await readUserMsg({ id: info.id })
  } else {
    // 公告已读
    await readNotices({ id: info.id });
  }
  userInfoStore.runGetMemberNum();
  router.push({ path: `/personal/notice/detail`, query: { activeTabIndex: activeTabIndex.value } });
}
// 解码
const packDecode = (str: any) => {
  return decodeURIComponent(str).replace(/\+/g, ' ').replace('<br/>', ' ').replace('&nbsp', ' ');
};
// 是否全选
const isAllSelected = computed(() => {
  return listData.value.every((item: any) => item.selected);
});

//  关闭设置 选项重置
const closeSet = () => {
  isSet.value = false;
  listData.value.forEach((item: any) => {
    item.selected = false;
  });
}
// 全选
const handleCheckAllChange = () => {
  if (isAllSelected.value) {
    listData.value.forEach((item: any) => {
      item.selected = false;
    });
  } else {
    listData.value.forEach((item: any) => {
      item.selected = true;
    });
  }
}

const deleteAllState = computed(() => {
  return listData.value.filter((item: any) => item.selected).length <= 0;
});

const total = computed(() => {
  if (activeTabIndex.value === '1') {
    return pagination.messageTotal;
  } else {
    return pagination.noticeTotal;
  }
});

const pageChange = (page: number) => {
  if (activeTabIndex.value === '1') {
    pagination.page = page;
    getMessageListReq();
  } else {
    pagination.page = page;
    getNoticeListReq()
  }
}

</script>
<template>
  <div class="personal_notice">
    <personal-title title="TIN NHẮN" />
    <template v-if="!itemDetail">
      <div class="flex ai-c jc-sb">
        <cg-tab padding='47' v-model="activeTabIndex" :list="navList" @on-change="listData"></cg-tab>
        <div v-if="listData?.length && activeTabIndex === '1'">
          <div class="flex ai-c jc-sb rigt_set mess_icon" @click="isSet = true" v-show='!isSet'>
            <cg-icon name="i_letter_set" width="34" />
            Quản Lý
          </div>
          <div class="flex ai-c jc-sb rigt_set fl_icon" v-if='isSet'>
            <cg-checkbox v-model="checkAll" :label="isAllSelected ? 'Huỷ Chọn' : 'Chọn Tất Cả'"
              @click="handleCheckAllChange" :icon="isAllSelected ? 'i_check_active' : 'i_check'"
              :active-icon="isAllSelected ? 'i_check_active' : 'i_check'" />
            <div class="flex-middle" :class="{ 'delete-all': deleteAllState }" @click="handleDelReadAll">
              <cg-icon name="i_letter_del" width="30" />Xoá
            </div>
            <div class="flex-middle" @click="closeSet()">
              <cg-icon name="i_close" width="30" />Huỷ
            </div>
          </div>
        </div>
      </div>
      <div class="list_data" v-if="listData?.length" v-for="(info, idx) in listData" :key="idx">
        <CgContainer type='smallContainer' padding="16" radius="8" margin="16,0,0,0" class="notice_bg"
          :class="info.is_read !== 0 ? 'is_read' : ''">
          <template #content>
            <div class="notice_list flex ai-c jc-st pointer" v-if="isSet">
              <cg-checkbox v-model="info.selected" v-if="isSet && activeTabIndex === '1'" icon="i_check"
                active-icon="i_check_active" />
              <div class="flex ai-c jc-sb flex1 rig_cont " @click="info.selected = !info.selected">
                <div class="left-warp">
                  <div class="flex ai-c jc-sb">
                    <div class="title flex ai-c jc-s">
                      <CgIcon v-if="info.is_top !== 0 && info.is_top" width="20"
                        :name="info.is_read !== 0 ? 'i_graywarn' : 'i_path'" class="icon_warn" />
                      <cg-badge v-else :is-dot="info.is_read !== 0 ? false : true"> </cg-badge>
                      <div v-html="packDecode(info.title)"></div>
                    </div>
                    <div class="time" v-if="activeTabIndex === '1'">
                      <cg-time :time="info.send_at || info.created_at" color="var(--cg-color-grey5)"
                        font="var(--cg-font-text6)" />
                    </div>
                  </div>
                  <div class="contents" v-html="packDecode(info.content)"></div>
                </div>
                <div class="right-warp">
                  <cg-icon name="i_back" width="10" />
                </div>
              </div>
            </div>
            <div class="notice_list flex ai-c jc-st pointer" v-else @click="handleItemClick(info)">
              <cg-checkbox v-model="info.selected" v-if="isSet && activeTabIndex === '1'" icon="i_check"
                active-icon="i_check_active" />
              <div class="flex ai-c jc-sb flex1 rig_cont">
                <div class="left-warp">
                  <div class="flex ai-c jc-sb">
                    <div class="title flex ai-c jc-s">
                      <!--1 紧急站内信  0 普通-->
                      <CgIcon v-if="info.is_top !== 0 && info.is_top" width="20"
                        :name="info.is_read !== 0 ? 'i_graywarn' : 'i_path'" class="icon_warn" />
                      <cg-badge v-else :is-dot="info.is_read !== 0 ? false : true"> </cg-badge>
                      <div v-html="packDecode(info.title)"></div>
                    </div>
                    <div class="time" v-if="activeTabIndex === '1'">
                      <cg-time :time="info.send_at || info.created_at" color="var(--cg-color-grey5)"
                        font="var(--cg-font-text6)" />
                    </div>
                  </div>
                  <div class="contents" v-html="packDecode(info.content)"></div>
                </div>
                <div class="right-warp">
                  <cg-icon name="i_back" width="10" />
                </div>
              </div>
            </div>
          </template>
        </CgContainer>
      </div>
      <cg-empty v-else></cg-empty>
      <div class="flex jc-e footer-page" v-if="total > 0">
        <cg-pagination :total="total" :current-page="pagination.page" :onPageChange="pageChange" />
      </div>
    </template>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'notice'
}
</script>

<style lang='scss' scoped>
.personal_notice {
  .rig_cont {
    width: 100%;
    overflow: hidden;
  }

  .icon_warn {
    margin-right: 7px;
  }

  .rigt_set {
    cursor: pointer;
    font: var(--cg-font-text6);
    color: var(--cg-color-grey1);

    >div {
      &:hover {
        color: var(--cg-color-blue12);

        :deep(.cg_icon) {
          transform: scale(1.1);
        }
      }
    }

  }

  .mess_icon {
    &:hover {
      color: var(--cg-color-blue12);

      :deep(.cg_icon) {
        transform: scale(1.1);
      }
    }
  }

  .delete-all {
    cursor: not-allowed !important;
    pointer-events: none;
    opacity: 0.7;
  }

  .fl_icon {
    :deep(.cg_icon) {
      margin-left: 15px;
      margin-right: 5px;
    }

  }

  .footer-page {
    padding: 32px 0 14px 0;
  }

  .notice_bg {
    &.is_read {
      :deep(.pub_small_container) {
        border: 0;
        background-color: var(--cg-color-white5);
        box-shadow: inset 0px 1.5px 3px var(--cg-color-white7);
      }

      .title,
      .contents,
      .time {
        opacity: 0.6;
      }

    }
  }

  .notice_list {

    .left-warp {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .title {
        flex: 1;
        font: var(--cg-font-text2);
        position: relative;
        color: var(--cg-color-grey1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

      }

      .contents {
        flex: 1;
        width: 100%;
        height: 17px;
        padding-top: 10px;
        word-break: break-all;
        white-space: pre-wrap;
        font: var(--cg-font-text);
        color: var(--cg-color-grey1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .time {
        color: var(--cg-color-grey5);
        font: var(--cg-font-text6)
      }
    }

    .right-warp {
      margin-left: 20px;
      transform: rotate(180deg);
    }
  }
}
</style>