<script setup lang="ts">
import { cgContextMenuProps } from '@/components/cg-context-menu/index.vue';
import iconList from '../../components/cg-icon/list.json'
import { ComponentCustomProperties } from "vue";
import { decrypt, encrypt } from "@/utils/cryptoJS";
const VITE_APP_FULL_TIME:string = import.meta.env.VITE_APP_FULL_TIME;

import dayjs from "dayjs";
const indexDBStore = useIndexDBStore()
const { IDB } = storeToRefs(indexDBStore)
const componentsList = ref([
  {
    name: 'CgIcon',
    value: 0
  },
  {
    name: 'CgButton',
    value: 1
  },
  {
    name: 'CgTab CgSwitch CgListRadio',
    value: 2
  },
  {
    name: 'CgTime|Avatar|bottomsheet|empty',
    value: 3
  },
  {
    name: 'CgImage',
    value: 4
  },
  {
    name: 'CgNavHeader',
    value: 5
  },
  {
    name: 'CgBadge|cgEllipsis|cgCollapse|cgContextMenu',
    value: 6
  },
  {
    name: 'CgHighTxt',
    value: 7
  },
  {
    name: 'CgListItem',
    value: 8
  },
  {
    name: 'CgList',
    value: 9
  },
  {
    name: 'CgMessage',
    value: 10
  }
])
const active = ref(0)

// 复制
const handleCopy = (type: string) => {
  let str;
  switch (type) {
    case 'cgtab':
      str = ` <cg-tab v-model="tab_type" :list="tabList" @on-change="changeTab"></cg-tab>`;
      newCopy(str);
      break;
    case 'cgswitch':
      str = `  <cg-switch v-model="state" @on-change="changeSwitch"> </cg-switch>`;
      newCopy(str);
      break;
    case 'cglistradio':
      str = `  <cg-list-radio v-model="gender" :list="genderList" @on-change="changGender"></cg-list-radio>`;
      newCopy(str);
      break;
  }

  Toast('复制成功');
}
const viewDialog = () => {
  Dialog({
    title: 'Bỏ ghim tin nhắn',
    message: 'AJay_liha,Kakashi,Jay_liha,VIGNY_POKakashi,Jay_liha,VIGNYasdfasd',
    businessCard: '[Danh thiếp cá nhân] Raly_Null',
    onClose: () => { },
    onOk: () => {
      return true
    }
  })
}

const asynDialog = () => {
  Dialog({
    message: 'Bạn có chắc thu hồi tin nhắn này?',
    onOk: (result?: any) => {
      return new Promise<boolean>((resolve, reject) => {
        // 异步操作，最终返回一个布尔值
        setTimeout(() => {
          resolve(true)
        }, 2000)
      })
    }
  })
}

const inquireDb = () => {
  IDB.value
    .getDataBeforeKey({ tableName: 'ChatList', id: 45, isInclude: false, size: 20 })
    .then((res: boolean | any[]) => {
      if (res) {
        console.error('批量查询Before成功', res)
      }
    })

  IDB.value.getDataAfterKey({ tableName: 'ChatList' }).then((res: boolean | any[]) => {
    if (res) {
      console.error('批量查询After成功', res)
    }
  })
}

const addData = () => {
  const num = getRandomInt(1, 100)
  IDB.value.putValue('ChatList', { data: `测试${num}` }).then((res: boolean) => {
    if (res) {
      console.error('添加成功')
    }
  })
}

const viewToast = () => {
  Toast('Đã gửi')
}
const genderList = [
  { value: '0', label: 'Nam' },
  { value: '1', label: 'Nữ' }
]
const tabList = [
  { value: '0', label: 'Toàn bộ' },
  { value: '1', label: 'Bạn bè' },
  { value: '2', label: 'Tin nhắn' }
]
const tab_type = ref(tabList[0].value)
const gender = ref(genderList[0].value)
const changeTab = () => {
  console.log('FsfsdfsdlistDatalistData', tab_type.value)
}
const changGender = () => {
  console.log('FsfsdfsdlistDatalistData', gender.value)
}
const state = ref(true)
const changeSwitch = () => {
  console.log('cg-switch', state.value)
}
const inputVal = ref()
const isOpen = ref(false)
const bottomSheet = () => {
  isOpen.value = !isOpen.value
}
const stepperVal = ref()

const navheader = ref()
const toggle = () => {
  navheader.value?.toggle()
}
const collList = reactive([
  {
    title: '我的好友',
    isOpen: false,
    itemList: [
      {
        name: '法外狂徒张三',
        image: 'avatar_group'
      },
      {
        name: '尼nnnn',
        image: 'avatar_notice'
      },
      {
        name: '拳投撒啊啊啊啊啊收拾收拾',
        image: 'avatar_group'
      },
    ]
  }, {
    title: '我的群组',
    isOpen: false,
    itemList: [
      {
        name: '钻石人间vip',
        image: 'avatar_group'
      },
      {
        name: '天天spa至尊会员服务群',
        image: 'avatar_group'
      },
      {
        name: '也许有一天暴富闲聊群',
        image: 'avatar_group'
      },
    ]
  }

])
const contextMenuList = ref<cgContextMenuProps['list']>([
  {
    icon: 'icon_delete',
    itemName: 'Tìm kiếm'

  }, {
    icon: 'icon_search',
    itemName: "Xóa lịch sử trò chuyện"
  },
  {
    icon: 'icon_groupadd',
    itemName: "Thoát nhóm"
  }
])
const contextVisible = ref(true);
const contextVisible2 = ref(false);
const handMenuclick = (data: any, close: () => void) => {
  console.log(data);
  contextVisible.value = false;
}
const handleLongPress = (local: Readonly<Record<string, any>>) => {
  console.log(local);
  contextVisible2.value = true;
}
const getIcon = (name: string) => {
  return `<cg-icon name="${name}" />`;
};
// icon 复制
const copyText = (text: string, type?: string) => {
  const input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  let t = '';
  if (type === 'icon') {
    t = getIcon(text);
  } else {
    t = text;
  }
  input.setAttribute('value', t);
  document.body.appendChild(input);
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    Toast('复制成功');
  }
  document.body.removeChild(input);
};
const collapseChange = (val: boolean) => {
  console.log(`collapse${val ? '展开了' : '收起了'}`)
}

const hSearch = ref('可以');
const hClicked = (d: any) => {
  console.log('high clicked === ', d)
}

// cg-list
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refresh = () => {
  console.log( "===refresh===" )
}
for (let i = 0; i < 30; i++) {
  list.value.push(list.value.length + 1);
}
const loadMoreData = () => {
  loading.value = true;
  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;


    if (list.value.length>149) {
      // 数据全部加载完成
      finished.value = true;
    }

  }, 1000);
}

// cg-message
const message = ref("message");

</script>
<template>
  <div>
    <cg-nav-header ref="navheader" left-arrow title="聊天">
      <template #right>
        <cg-icon name="icon_white_download" />
      </template>
    </cg-nav-header>
    <div class="top-head">
      <div>
        <van-tabs v-model:active="active">
          <van-tab v-for="item in componentsList" :title="item.name"></van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="content">
      <template v-if="active == 0">
        <!-- name=文件夹名字_图标名字 点击icon 可直接copy -->
        <h5 class="flex-middle"> <cg-icon name="icon_warn"></cg-icon>点击icon 可复制</h5>
        <div class="icon_demo flex ai-c jc-st">
          <div class="icon_item flex ai-c jc" v-for="item in iconList" :key="item" @click="copyText(item, 'icon')">
            <cg-icon :name="item" />
            <span>{{ item }}</span>
          </div>
        </div>
      </template>
      <template v-else-if="active == 1">
        <div class="test">
          <cg-stepper v-model="stepperVal" />
          <cg-button @click="viewDialog" type="primary">弹窗{{ stepperVal }}</cg-button>
          <cg-button @click="asynDialog">异步弹窗</cg-button>
          <cg-button disabled type="primary">disabled按钮</cg-button>
          <cg-button shape="square" type="primary" @click="addData">添加数据</cg-button>
          <cg-button shape="square" @click="inquireDb">批量查询</cg-button>
          <cg-button shape="square" type="primary" disabled>disabled按钮</cg-button>
          <cg-button shape="circular" type="primary" :badge="5" />
          <cg-button shape="circular" type="primary" disabled />
          <cg-button shape="square" type="primary" @click="viewToast">Toast</cg-button>
          <cg-input class="input_head_type" search clearable placeholder="Tin nhắn..." v-model="inputVal" />
          <cg-input class="input_dialog_type" placeholder="Tin nhắn..." v-model="inputVal" />
          <cg-input class="input_default_type" clearable placeholder="Tin nhắn..." v-model="inputVal" />
          <cg-input class="input_word_type" show-word-limit maxlength="200" type="textarea" placeholder="Tin nhắn..."
            v-model="inputVal" />
        </div>
      </template>
      <template v-else-if="active == 2">
        <cg-tab v-model="tab_type" :list="tabList" @on-change="changeTab"></cg-tab>
        <cg-button @click="handleCopy('cgtab')">复制cg-tab</cg-button>
        <br />
        <cg-list-radio v-model="gender" :list="genderList" @on-change="changGender"></cg-list-radio>
        <cg-button @click="handleCopy('cglistradio')">复制cg-list-radio</cg-button>
        <br>
        <cg-switch v-model="state" @on-change="changeSwitch"> </cg-switch>
        <br>
        <!-- 自定义背景色 -->
        <cg-switch v-model="state" @on-change="changeSwitch" :activeBg="'var(--cg-color-bg-3)'"
          :inactiveBg="'var(--cg-color-bg-4)'"> </cg-switch>
        <cg-button @click="handleCopy('cgswitch')">复制cg-switch</cg-button>
      </template>
      <template v-else-if="active == 3">
        <div class="flex">
          <cg-avatar badge="avatar_online" />
          <cg-avatar icon="avatar_notice" badge="avatar_notice" badge-size="30" />
          <cg-avatar size="99" shape="square"
            src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
          <cg-avatar badge="avatar_black" size="96" />
          <cg-avatar badge="avatar_check" size="100"
            src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
          <cg-avatar badge="avatar_del" badge-size="36" />
        </div>
        <div class="flex">
          <cg-avatar badge="avatar_online" size="135" icon="icon_aide" badge-size="46" />
          <cg-avatar badge="avatar_edit" badge-size="40" icon="avatar_group" />
          <cg-avatar icon="avatar_notice" badge="avatar_notice" badge-size="30" />
        </div>
        <div>........</div>
        <div class="flex">
          <cg-time :time="1681467930556" />&nbsp;&nbsp;
          <cg-time font="5" color="1" :time="1681467930556" />&nbsp;&nbsp;
          <cg-time :time="1681467930556" format="DD/MM" />&nbsp;&nbsp;
          <cg-time :time="1681467920556" format="DD/MM/YYYY HH:mm:ss" />&nbsp;&nbsp;
          <cg-time :time="1681467930566" format="DD/MM/YYYY" />&nbsp;&nbsp;
          <cg-time :time="1681467939556" format="DD/MM" is-bg color="white" />
        </div>
        <div>
          <cg-button @click="bottomSheet" type="primary">bottomsheet</cg-button>
          <cg-bottom-sheet select-left-text="Hủy" select-right-text="Ok" select-text="自定义标加粗题栏" is-bold-seledt-text
            v-model="isOpen">
            <template #content> 中间面板 </template>
          </cg-bottom-sheet>
        </div>
        <cg-empty :margin-top="20" />
      </template>
      <template v-else-if="active == 4">
        <div class="flex jc-sb fw-w">
          <cg-image width="100" height="100" round alt="哈哈" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          <cg-image width="100" height="100" round fit="contain" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="100" height="100" round fit="cover" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="100" height="100" round fit="scale-down" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="100" height="100" round fit="none" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="100" height="100" fit="cover" position="right bottom" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="100" height="100" fit="cover" position="left bottom" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="100" height="100" radius="8" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="100" height="100" filter="blur(2px)" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="300" height="300" fit="cover" radius="8" show-loading :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="300" height="300" fit="cover" radius="8" show-loading lazy alt="哈哈" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="300" height="300" show-download showLoading block fake-src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" :real-src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
          <cg-image width="300" height="300" show-download showLoading block :real-src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
        </div>
      </template>
      <template v-else-if="active == 5">
        <div :style="'background: url(https://so2.360tres.com/dmfd/400_300_/t0110e5ad0726405f0e.jpg);height: 1000px'">
          <!-- <cg-nav-header title="Chat" fixed /> -->
          <cg-nav-header title="Chat" :fixed="false" />
          <cg-nav-header :fixed="false">
            <h3>聊天</h3>
          </cg-nav-header>
          <cg-nav-header title="Chat" left-arrow left-text="前进" :fixed="false" />
          <cg-nav-header title="Chat" left-arrow left-text="返回" right-text="搜索" :fixed="false" />
          <cg-nav-header left-arrow background="var(--cg-color-bg-black-4)" :fixed="false">
            <template #right>
              <cg-icon name="icon_white_download" />
            </template>
          </cg-nav-header>
          <cg-nav-header left-arrow :fixed="false">
            <template #right>
              <div :style="'width: var(--cg-px-622)'"><input style="width:100%;" /></div>
            </template>
          </cg-nav-header>

          <cg-button @click="toggle">显示/隐藏</cg-button>
        </div>
      </template>
      <template v-else-if="active == 6">
        <div class="badge-demo">
          <cg-badge content="!" size="small" />
          <cg-badge :content="1" />
          <cg-badge :content="999" max="99" />
          <cg-badge :content="'Tham gia nhómTham gia '" size="large" color="8" font-color="3" />
          <cg-badge content="73" max="99" :show-zero="false" location="top-right">
            <cg-icon name="icon_chat" width="48" height="48" />
          </cg-badge>
        </div>
        <div>
          <cg-collapse v-model:open="menu.isOpen" :title="menu.title" @change="collapseChange"
            v-for="(menu, index) of collList" :key="index">
            <cg-collapse-item :image="(item.image as keyof ComponentCustomProperties['exportImg'])" :name="item.name"
              lightText="群" v-for="(item, i) of menu.itemList" :key="item.name" />
          </cg-collapse>
        </div>
        <div style="padding: 20px; color: var(--cg-color-text-3);" class="font_30" >
          <cg-ellipsis expandText="Mở rộng" collapseText="Thu hẹp" rows="3"
            content="Tham gia nhómTham giaTham Nhấn vào ở trên cùng bên phải Facebook, rồi nhấn vào  trên cùng bên phải Facebook, rồi nhấn vào Nrên cùng bên phải Facebook, rồi nhấn vào Nhóm và chọn nhóm của bạn Nhấn vào tên nhóm, rồi nhấn vào Thông báo. Tại đây, bạn có thể chọn: Tất cả">
          </cg-ellipsis>
          <div>
            <br />
            <cg-ellipsis
              content="Tham gia nhómTham giaTham Nhấn vào ở trên cùng bên phải Facebook, rồi nhấn vào Nhóm và chọn nhóm của bạn Nhấn vào ">
            </cg-ellipsis>
          </div>
        </div>
        <div class="rightMenuDemo">
          <cg-nav-header left-arrow :fixed="false">
            <div class="">
              <div class="font_32">服务群</div>
              <div class="font_24">3 thành viên</div>
            </div>
            <template #right>
              <cg-context-menu :visible="contextVisible" :list="contextMenuList" @onItemClick="handMenuclick" right="24"
                bottom="32" show-triang="top" triang-right="-33">
                <cg-icon name="icon_more" @click="contextVisible = !contextVisible"></cg-icon>
              </cg-context-menu>
            </template>
          </cg-nav-header>
        </div>
        <div style="margin-top: 200px;margin-left:100px;">
          <cg-context-menu :visible="contextVisible2" :list="contextMenuList" @onItemClick="contextVisible2 = false"
            @on-long-press="handleLongPress" show-triang="bottom" triang-left="-33" size="large" top="20" left="0">
            <van-button>
              点击长按触发菜单
            </van-button>
          </cg-context-menu>
        </div>
        <div style="margin-top: 200px;margin-left:100px;">
          <cg-context-menu :visible="contextVisible2" :list="contextMenuList" @onItemClick="contextVisible2 = false"
            @on-long-press="handleLongPress" show-triang="bottom" triang-left="-33" size="large" top="20" left="0">
            <van-button>
              点击长按触发菜单
            </van-button>
            <template #list-item="scoped">
                <div>{{scoped.item.itemName}}</div>
            </template>
          </cg-context-menu>
        </div>
      </template>
      <template v-else-if="active == 7">
        <h2>输入高亮：<input v-model="hSearch" /></h2><br />
        <cg-high-txt h-search="chắc" @click="hClicked" id="abc983r9t9e0" :data="{ name: 'abc', age: 18 }">Bạn có chắc thu
          hồi tin nhắn này?</cg-high-txt>
        <br /><br />
        <cg-high-txt :h-search="hSearch" @click="hClicked">
          <h3>对于 .passive、.capture 和 .once 事件修饰符，可以使用驼峰写法将他们拼接在事件名后面：</h3>
        </cg-high-txt>
        <br /><br />
        <cg-high-txt :h-search="'正常的渲染'"
          h-text="包含插槽函数的对象而非是数组，插槽函数的返回值同一个正常的渲染函数的返回值一样——并且在子组件中被访问时总是会被转化为一个 vnodes 数" />
      </template>
      <template v-else-if="active == 8">
        <div>
          <cg-list-item color="var(--cg-color-bg-4)" sub-color="var(--cg-color-bg-3)"
            font="var(--cg-font-1)" sub-font="var(--cg-font-12)"
            line-height="44" sub-line-height="36"
            sub-margin-top="50"
            title="哈哈" sub-title="的酸辣粉家里的沙发看老师发的" :item-align="'flex-start'">
            <template #icon>
              <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
            </template>
          </cg-list-item>
          <cg-list-item title="哈哈" sub-title="的酸辣粉家里的沙发看老师发的" height="200">
            <template #icon>
              <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
            </template>
            <template #link>
              <div>Đang chờ<br/>xác nhận</div>
            </template>
          </cg-list-item>
          <cg-list-item title="哈哈" height="260">
            <template #icon>
              <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
            </template>
            <template #subTitle>
              <div>
                <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
              </div>
            </template>
            <template #link>
              <div>Đang chờ<br/>xác nhận</div>
            </template>
          </cg-list-item>
          <cg-list-item :sub-ellipsis="true" title="哈哈" sub-title="的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的" is-link>
            <template #icon>
              <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
            </template>
          </cg-list-item>
          <cg-list-item title="哈哈了大家发来的分类的撒方块的舒服撒开了饭时代雷锋精神的啦发啦快速的减肥" sub-title="的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的" is-link>
            <template #icon>
              <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
            </template>
          </cg-list-item>
          <cg-list-item :ellipsis="false" title="哈哈了大家发来的分类的撒方块的舒服撒开了饭时代雷锋精神的啦发啦快速的减肥" sub-title="的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的" is-link>
            <template #icon>
              <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
            </template>
          </cg-list-item>
          <cg-list-item title="哈哈" :item-align="'flex-start'" sub-title="的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的的酸辣粉家里的沙发看老师发的" is-link>
            <template #icon>
              <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
            </template>
          </cg-list-item>
          <cg-list-item title="Ghi chú" is-link />
          <cg-list-item title="Chữ ký cá nhân" desc="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
          <cg-list-item title="Chữ ký cá nhân" height="112" desc="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
          <cg-list-item title="Chữ ký cá nhân" :desc-row="2" is-link desc="uuuuuuuuuuuuuuuuuuuuuuuuuuuuxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
          <cg-list-item title="Chữ ký cá nhân" desc="xxxxxxxx" desc-text-align="left" />
          <cg-list-item title="Nguồn" desc="xxxxxxxx" desc-text-align="left" desc-width="var(--cg-px-470)" height="112" />
          <cg-list-item title="Nguồn" desc="xxxxxxxx" desc-text-align="left" desc-width="var(--cg-px-470)" height="112" is-link />

          <cg-list-item title="Thông tin mới" :has-margin="false" :border="'full'">
            <template #icon>
              <cg-avatar icon="avatar_notice" badge="avatar_notice" badge-size="30" />
            </template>
            <template #link>
              <cg-badge :content="1" />
            </template>
          </cg-list-item>
          <cg-list-item title="Thông tin mới" :has-margin="false" :border="'long'" height="120">
            <template #icon>
              <cg-icon name="avatar_link" width="80" />
            </template>
          </cg-list-item>
          <cg-list-item title="Thông tin mới" :has-margin="false" :border="'short'">
            <template #icon>
              <cg-icon name="avatar_link" width="80" />
            </template>
          </cg-list-item>
          <cg-list-item title="Thông tin mới" :has-margin="false">
            <template #icon>
              <cg-icon name="avatar_link" width="80" />
            </template>
          </cg-list-item>
          <cg-list-item :border="'short'">
            <template #icon>
              <cg-icon name="avatar_link" width="80" />
            </template>
            <template #content>
              <em><h2>内容区域</h2></em>
            </template>
          </cg-list-item>
          <cg-list-item title="chat id" is-link>
            <template #linkdesc>
              <cg-avatar size="88" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
            </template>
          </cg-list-item>
          <cg-list-item height="120" title="chat id" desc="xxxxxxxxxxxxxxxxxxxxxxxx" desc-width="70%" desc-text-align="left" is-link />
        </div>
      </template>
      <template v-else-if="active == 9">
        <div>
          <cg-list
            :loading="loading"
            :finished="finished"
            @refresh="refresh"
            @loadMoreData="loadMoreData"
          >
            <van-cell v-for="(item, index) in list" :key="index" :title="item" />
          </cg-list>
        </div>
      </template>
      <template v-else-if="active == 10">
        <div>{{ encrypt("Hello, World!") }}</div>
<!--        <div>{{ decrypt(encrypt("Hello, World!")) }}</div>-->

        <cg-time :time="new Date().getTime()" :format="VITE_APP_FULL_TIME" />&nbsp;&nbsp;
        <cg-message>
          <template #msg>
            <div>{{message}} {{ dayjs().format(VITE_APP_FULL_TIME) }}</div>
            <p>{{ time(  new Date().getTime() / 1000  ) }}</p>
            <p>{{ time(  dayjs(dayjs() / 1000)  ) }}</p>
            <p>{{dayjs.unix(dayjs() / 1000).format(VITE_APP_FULL_TIME)}}</p>
          </template>
        </cg-message>
      </template>

    </div>

  </div>
</template>

<style lang="scss" scoped>
.content {
  padding-top: 120px;
  padding-bottom: 120px;
}

.icon_demo {
  flex-wrap: wrap;
  padding: 10px 50px;

  .icon_item {
    text-align: center;
    width: 50%;
    height: 77px;
    line-height: 90px;
    border-bottom: 1px solid var(--cg-color-bg-6);
    border-right: 1px solid var(--cg-color-bg-6);
    padding-left: 30px;

    &:nth-child(2n) {
      border-right: 0;
    }

    span {
      font-size: 12px;
      width: 120px;
    }
  }
}

.test {
  background-color: white;
}

.badge-demo {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .img2 {
    width: 96px;
    height: 96px;
    display: block;
  }
}
</style>
