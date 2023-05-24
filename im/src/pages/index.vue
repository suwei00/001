<script setup lang="ts">
import router from '@/router'
import { cgContextMenuProps } from '@/components/cg-context-menu/index.vue';
import { ref } from "vue";

const contextVisible = ref(false);
const contextMenuList = ref<cgContextMenuProps['list']>([
  {
    icon: 'icon_groupadd',
    itemName: "Thoát nhóm"
  },
  {
    icon: 'icon_iquit',
    itemName: 'Thêm bạn'
  },
  // {
  //   icon: 'icon_listadd',
  //   itemName: 'Thêm bạn'
  // }
])
const pageTo = (name: string) => {
  router.push({ name });
};

const currentTime = ref(['12', '00'])
const active = ref(false)
const showPopover = ref(false)

const onSelect = <T>(val: T) => {
  console.error(val)
}

const actions = [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]
const LongPress = () => {
  active.value = !active.value
  console.error('21123123')
}

const loading = ref(false)
const finished = ref(false)
const refresh = () => {
  console.log("===refresh===")
}
const loadMoreData = () => {
  // loading.value = true;
  // setTimeout(() => {
  //   loading.value = false;
  //   finished.value = true;
  // }, 1000)
}

const handMenuclick = (data: any, close: () => void) => {
  console.log(data);
  contextVisible.value = false;
}

const delChatHistory = () => {
  Dialog({
    message: 'Bạn có chắc chắn muốn xóa lịch sử trò chuyện này không?',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    onClose: () => { },
    onOk: () => {
      return true
    }
  })
}

const promptInfo = (msg: string) => {
  Dialog({
    message: msg,
    confirmButtonText: 'Tôi đã hiểu',
    onOk: () => {
      return true
    }
  })
}

const viewDialog = () => {
  Dialog({
    title: 'Xoá hội thoại',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    message: 'Bạn có chắc chắn muốn xóa cuộc trò chuyện với.',
    // businessCard: '[Danh thiếp cá nhân] Raly_Null',
    onClose: () => { },
    onOk: () => {
      return true
    }
  })
}
</script>

<template>
  <cg-nav-header ref="navheader" fixed placeholder title="Chat">
    <template #left>
      <cg-icon @click.stop="router.push('/search')" name="icon_whitesearch" />
    </template>
    <template #right>
      <cg-context-menu :visible="contextVisible" :list="contextMenuList" @onItemClick="handMenuclick"
                       right="24" bottom="32" show-triang="top" triang-right="-33">
        <cg-icon name="icon_whiteadd" @click="contextVisible = !contextVisible"></cg-icon>
      </cg-context-menu>
    </template>
  </cg-nav-header>
  <div class="hemo">
    <cg-list
      :loading="loading"
      :finished="finished"
      @refresh="refresh"
      @loadMoreData="loadMoreData"
    >
      <cg-list-tile height="135">
        <template #avatar>
          <cg-avatar size="96"
            src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
        </template>
        <template #up>
          <div>1 Nhóm thảo luận dự án lâm thời</div>
          <div>28/08</div>
        </template>
        <template #under>
          <div>mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</div>
          <cg-icon name="icon_graytop" :width="24" />
        </template>
      </cg-list-tile>
      <cg-list-tile height="135" @click.stop="delChatHistory">
        <template #avatar>
          <cg-avatar size="96"
            src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
        </template>
        <template #up>
          <div>Nhóm thảo luận dự án lâm thời</div>
          <div>28/08</div>
        </template>
        <template #under>
          <div style="color: var(--cg-color-text-6)">Bạn đã bị xóa khỏi nhóm</div>
          <cg-badge :content="999" />
          <cg-badge :content="999" max="99" />
        </template>
      </cg-list-tile>
      <cg-list-tile height="135" @click.stop="promptInfo('Nhóm này đã bị trưởng nhóm giải tán.')">
        <template #avatar>
          <cg-avatar size="96"
            src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
        </template>
        <template #up>
          <div>Nhóm thảo luận dự án lâm thời</div>
          <div>28/08</div>
        </template>
        <template #under>
          <div>
            <span style="color: var(--cg-color-text-6)">[Nháp] </span>You Haven’t Complet Work.
          </div>
        </template>
      </cg-list-tile>
      <cg-list-tile avatarBorder start @click.stop="promptInfo('Bạn đã bị xóa khỏi nhóm.')">
        <template #avatar>
          <cg-avatar src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
        </template>
        <template #up>
          <div>Nhóm thảo luận dự án lâm thời Nhóm thảo luận dự án lâm thời</div>
        </template>
        <template #under>
          <cg-icon name="icon_graytop" :width="24" />
          <div class="chat">
            Chat ID：J2808<span style="color: var(--cg-color-text-1)">688</span>3
          </div>
        </template>
      </cg-list-tile>

      <cg-list-tile avatarBorder @click.stop="pageTo('chat')">
        <template #avatar>
          <cg-avatar src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
        </template>
        <template #up>
          <div>Nhóm thảo luận dự án lâm thời Nhóm thảo luận dự án lâm thời</div>
        </template>
      </cg-list-tile>

      <cg-list-tile start height="208" :contentBorder="false" paddingRight="32" :active="active" v-long-press="LongPress" @click.stop="pageTo('chat')">
        <template #avatar>
          <cg-avatar size="128"
            src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
        </template>
        <template #up>
          <div class="font_40">Nhóm thảo</div>
        </template>
        <template #icon>
          <!-- <cg-icon name="icon_select" />  -->
          <cg-icon name="icon_arrowright" />
        </template>
      </cg-list-tile>
<!--      <cg-popover v-model:show="showPopover" :actions="actions" @select="onSelect">-->
<!--        <template #reference>-->
<!--          <cg-button type="primary">弹窗</cg-button>-->
<!--        </template>-->
<!--      </cg-popover>-->

      <div style="height: 120px"></div>
    </cg-list>
  </div>
</template>

<style scoped lang="scss">
.hemo {
  height: 100vh;
  background-color: white;
}

.icon_man {
  margin-right: 12px;
}</style>
