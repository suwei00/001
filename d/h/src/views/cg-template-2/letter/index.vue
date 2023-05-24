<script setup lang="ts">
import {
  CgHeader,
  CgTab,
  CgContainer,
  CgIcon,
  CgBadge,
  CgTime,
  CgList,
  CgEmpty,
  CgCheckbox
} from '@/components/cg-template-2';
import APIs, { deleteUserMsg } from '@/http/blue-apis';
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { useRequest } from 'vue-request';
import { useAppStore } from '@/store-pinia';
import { useLoading } from '@/hooks/useLoading';
import { Toast } from 'vant';


const appStore = useAppStore();
const router = useRouter();
const Dialog = new CgDialogClass();
const activeTabIndex = ref(sessionStorage.getItem('MSGactiveTabIndex') || '1');
// 是否开启管理
const showBottom = ref(false);
const tableData = ref<any[]>([]);
const letterCgListRef = ref<typeof CgList | null>(null);



const changeData = (data: any) => {
  let cloneData: any[] = [];
  if (tableData.value.length) {
    cloneData = JSON.parse(JSON.stringify(tableData.value));
  }

  tableData.value = (data || []).map((item: any) => {
    const findItem = cloneData.find(cloneItem => cloneItem.id === item.id);
    if (findItem) {
      return {
        ...item,
        selected: findItem.selected
      };
    } else {
      return {
        ...item,
        selected: false
      };
    }
  });
};
const navList = [
  { label: 'TRẠM THƯ', value: '1' },
  { label: 'THÔNG BÁO', value: '2' }
];
// 解码
const packDecode = (str: any) => {
  return decodeURIComponent(str).replace(/\+/g, ' ').replace('<br/>', ' ').replace('&nbsp', ' ');
};
// 是否全选
const isAllSelected = computed(() => {
  return tableData.value.every(item => item.selected);
});

// 是否显示删除按钮
const showDeleteBtn = computed(() => {
  return tableData.value.some(item => item.selected);
});

const rightBtnClick = () => {
  if (showBottom.value === false) {
    showBottom.value = true;
  } else {
    if (isAllSelected.value) {
      tableData.value.forEach(item => {
        item.selected = false;
      });
    } else {
      tableData.value.forEach(item => {
        item.selected = true;
      });
    }
  }
};

// 详情页
const goDetail = (item: any) => {
  sessionStorage.setItem('MSGdata', JSON.stringify(item));
  sessionStorage.setItem('MSGactiveTabIndex', activeTabIndex.value);
  // 已读消息
  if (activeTabIndex.value === '1') {
    useRequest(() => APIs.readUserMsg({ id: item.id }));
  } else {
    // 公告已读
    useRequest(() => APIs.readNotices({ id: item.id }));
  }
  item.is_read = 1
  router.push({
    path: '/letter/detail',
    query: { activeTabIndex: activeTabIndex.value }
  });
  sessionStorage.setItem('messageDetail', JSON.stringify(item));
};

// 返回个人中心
const goPersonal = () => {
  sessionStorage.setItem('MSGactiveTabIndex', '1');
  router.push({
    path: '/personal'
  });
};

const deleteMsg = () => {
  Dialog.showDialog({
    template: 'tmp1',
    title: 'LƯU Ý',
    tmp1Content: 'Sau Khi Xoá Không Thể Khôi Phục, Xác Nhận Xoá?',
    onOk: () => {
      const ids = tableData.value.filter(item => item.selected).map(item => item.id);
      // 1 精确删除 2 删除所有已读 3删除所有站内信
      useRequest(() => deleteUserMsg({ flag: 1, ids: ids.toString() }), {
        onSuccess: (res: any) => {
          if (res) {
            Toast('thành công');
            showBottom.value = false;
            letterCgListRef.value?.onRefresh();
          }
        }
      });
    }
  });
};
// table 切换重置
const changeTab = () => {
  if (activeTabIndex.value === '1' && showBottom.value) {
    showBottom.value = false
    isSelected(!showBottom.value)
  }
}
// 关闭close
const clsoeBottomBtn = () => {
  showBottom.value = !showBottom.value;
  isSelected(!showBottom.value);
}
const isSelected = (state: boolean) => {
  if (!state) return
  tableData.value.forEach(item => {
    item.selected = false;
  });
}
</script>
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" v-show="Component" />
    <div class="letter cg-list-container" v-show="!Component">
      <CgHeader>
        <template #leading>
          <cg-icon v-if="showBottom && activeTabIndex === '1'" @click.stop="clsoeBottomBtn"
            name="i_letter_close"></cg-icon>
          <cg-icon v-else @click.stop="goPersonal" name="i_back" :width="20"></cg-icon>
        </template>
        TIN NHẮN
        <template #actions v-if="tableData.length">
          <div class="letter_right" @click="rightBtnClick" v-if="activeTabIndex === '1'">
            {{ showBottom ? (isAllSelected ? 'HUỶ CHỌN' : 'CHỌN TẤT CẢ') : 'QUẢN LÝ' }}
          </div>
        </template>
      </CgHeader>
      <!-- 底部弹出 showDeleteBtn-->
      <div class="deleteBtn" v-if="showBottom && activeTabIndex === '1'">
        <div class="emptop"></div>
        <div class="delete_bot">
          <div class="flex ai-c jc-c" v-show="!showDeleteBtn">
            <cg-icon name="i_grey_del" width="50"></cg-icon>
            <span>XOÁ</span>
          </div>
          <div class="flex ai-c jc-c" v-show="showDeleteBtn" @click="deleteMsg">
            <cg-icon name="i_blue_del" width="50"></cg-icon>
            <span class="actice_text">XOÁ</span>
          </div>
        </div>
      </div>

      <div class="letter-tab">
        <cg-tab v-model="activeTabIndex" :list="navList" @on-tab="changeTab" average></cg-tab>
      </div>
      <CgList ref="letterCgListRef" class="cglist" :is-loading="false" v-show="activeTabIndex === '1'"
        :list-api="APIs.getUserMsgList" @change-data="changeData">
        <template #empty>
          <cg-empty :margin-top="80"></cg-empty>
        </template>
        <div v-for="item in tableData" :key="item.message_id" class="letter_list">
          <CgContainer padding="20" class="notice_bg" :class="item.is_read !== 0 ? 'is_read' : ''"
            :borderColor="item.selected ? '--cg-color-blue27' : '--cg-color-blue11'">
            <div class="item-warp flex ai-c jc-sb" v-if="showBottom">
              <cg-checkbox v-model="item.selected" icon="i_check" active-icon="i_check_active" />
              <div class="item-left" @click="item.selected = !item.selected">
                <div class="item-title">
                  <!--1 紧急站内信  0 普通-->
                  <CgIcon v-if="item.is_top !== 0 && item.is_top" width="20"
                    :name="item.is_read !== 0 ? 'i_graywarn' : 'i_path'" class="icon_warn" />
                  <CgBadge v-else class="is_read" :is-dot="item.is_read !== 0 ? false : true" />
                  <span>{{ packDecode(item.title) }}</span>
                </div>
                <div class="item-content">
                  {{ packDecode(item.content) }}
                </div>
                <div class="item-time" v-if="activeTabIndex === '1'">
                  <cg-time :time="item.send_at || item.created_at" color="--cg-color-black1" />
                </div>
              </div>
              <div class="item-right">
                <cg-icon name="i_arrowright" width="16" />
              </div>
            </div>
            <div class="item-warp flex ai-c jc-sb" v-else>
              <cg-checkbox v-if="showBottom" v-model="item.selected" icon="i_check" active-icon="i_check_active" />
              <div class="item-left" @click="goDetail(item)">
                <div class="item-title">
                  <!--1 紧急站内信  0 普通-->
                  <CgIcon v-if="item.is_top !== 0 && item.is_top" width="20"
                    :name="item.is_read !== 0 ? 'i_graywarn' : 'i_path'" class="icon_warn" />
                  <CgBadge v-else class="is_read" :is-dot="item.is_read !== 0 ? false : true" />
                  <span>{{ packDecode(item.title) }}</span>
                </div>
                <div class="item-content">
                  {{ packDecode(item.content) }}
                </div>
                <div class="item-time" v-if="activeTabIndex === '1'">
                  <cg-time :time="item.send_at || item.created_at" color="--cg-color-black1" />
                </div>
              </div>
              <div class="item-right">
                <cg-icon name="i_arrowright" width="16" />
              </div>
            </div>
          </CgContainer>
        </div>
      </CgList>
      <CgList class="cglist" v-show="activeTabIndex === '2'" :list-api="APIs.getNotice">
        <template #empty>
          <cg-empty :margin-top="80"></cg-empty>
        </template>
        <template #default="{ data }">
          <div v-for="item in data" :key="item.message_id" class="letter_list notice_list">
            <CgContainer padding="20" class="notice_bg" :class="item.is_read !== 0 ? 'is_read' : ''"
              @click="goDetail(item)">
              <div class="item-warp flex ai-c jc-sb">
                <div class="item-left">
                  <div class="item-title">
                    <div class="is_read" v-if="item.is_read !== 0 ? false : true">
                      <CgBadge :is-dot="true" />
                    </div>
                    <span>{{ packDecode(item.title) }}</span>
                  </div>
                  <div class="notice_cont">
                    {{ packDecode(item.content) }}
                  </div>
                  <div class="item-time" v-if="activeTabIndex === '1'">
                    <cg-time :time="item.send_at || item.created_at" color="--cg-color-black1" />
                  </div>
                </div>
                <div class="item-right">
                  <cg-icon name="i_arrowright" width="16" />
                </div>
              </div>
            </CgContainer>
          </div>
        </template>
      </CgList>
    </div>
  </router-view>
</template>
<script lang="ts">
export default {
  name: 'Letter'
};
</script>

<style lang="scss" scoped>
.letter_right {
  color: var(--cg-color-blue1);
  font: var(--cg-font-text2);
}
.icon_warn {
    margin-right: 10px;
  }
.letter-tab {
  position: fixed;
  top: 88px;

  height: 104px;
  z-index: 10;
  width: 100%;
  padding: 0 32px;
  padding-top: 24px;
  background-color: var(--cg-color-blue16);
}

.deleteBtn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  transition: transform 0.3s;
  z-index: 99;
  height: 100px;

  .emptop {
    height: 22px;
    background: var(--cg-letter--shadow);
    opacity: 0.5;
  }

  .delete_bot {
    height: 78px;
    background: var(--cg-color-white9);

    >div {
      position: absolute;
      right: 20px;
      top: 36px;

      >span {
        color: var(--cg-color-gray);
        font: var(--cg-font-text7);
        margin-left: 12px;
      }

      .actice_text {
        color: var(--cg-color-blue1);
      }
    }
  }
}

.cglist {
  margin-top: 110px;
  padding: 0 32px;
  margin-bottom: 58px;
}

.delete-all {
  filter: grayscale(1);
}

.notice_list {
  height: 142px;
}

.letter_list {
  margin-top: 24px;

  .item-left {
    flex: 1;
    overflow: hidden;

    .item-title {
      color: var(--cg-color-black1);
      font: var(--cg-font-text1);
      overflow: hidden; //超出一行文字自动隐藏
      text-overflow: ellipsis; //文字隐藏后添加省略号
      white-space: nowrap; //强制不换行
      line-height: 29px;

      .is_read {
        display: inline-block;
      }
    }

    .item-content {
      color: var(--cg-color-black1);
      font: var(--cg-font-text4);
      line-height: 28px;
      margin: 20px 0;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .notice_cont {
      overflow: hidden;
      color: var(--cg-color-black1);
      font: var(--cg-font-text4);
      line-height: 28px;
      margin: 18px 0 0 0;
      display: -webkit-box;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .item-time {
      :deep(.cg-time) {
        >div {
          font: var(--cg-font-text4);
          color: var(--cg-color-gray);
          text-align: left;
        }
      }
    }
  }

  .item-right {
    margin-left: 20px;
  }

  .is_read {
    background-color: var(--cg-letter-background) !important;

    .item-title,
    .item-content,
    .item-time,
    .notice_cont {
      opacity: 0.6;
    }
  }
}
</style>
