<script setup lang="ts">
import { ref } from 'vue';
import {
  CgButton,
  CgScrollBar,
  CgMaintain,
  CgBadge,
  CgDivider,
  CgEmpty,
  CgSwitch,
  CgAvatar,
  CgBigNumber,
  CgContainer,
  CgContainerHead,
  CgAmount,
  CgTime,
  CgBreadcrumb,
  CgTab,
  CgTable,
  CgSelect,
  CgInput,
  type CgTableColumns,
  CgPagination,
  CgProgress,
  CgRadio,
  CgRefresh,
  CgBounceText
} from '@/components/cg-template-2';
import { formatNumberToCurrency } from '@/utils/format';
import http from '@/http';
import { copy } from 'clipboard';
import Toast from '@/components/cg-template-2/toast';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
const Dialog = new CgDialogClass()

// 复制函数
const handleCopy = (type: string) => {
  let str;

  switch (type) {
    case 'amount':
      copy(`<cg-amount :amount="1233000" :isClick="true" :segmentation="true" @callBack="callBack" suffix="K" padding="0" :precision="2"></cg-amount>`);
      break;
    case 'select':
      copy(`<cg-select v-model="selectValue" placeholder="Select" :options="options" />`);
      break;
    case 'input':
      copy(`<cg-input v-model="input" placeholder="Please input" />`);
      break;
    case 'toast':
      copy(`import Toast from '@/components/cg-template-2/toast';`);
      break;
    case 'mini-btn':
      copy('<cg-button mini round></cg-button>');
      break;
    case 'sm-btn':
      copy('<cg-button small></cg-button>');
      break;
    case 'w-btn':
      copy('<cg-button whiteStyle>白色按钮</cg-button>');
      break;
    case 'btn':
      copy('<cg-button></cg-button>');
      break;
    case 'w-btn':
      copy('<cg-button whiteStyle></cg-button>');
      break;
    case 'r-btn':
      copy('<cg-button round></cg-button>');
      break;
    case 'blue-btn':
      copy('<cg-button blue></cg-button>');
      break;
    case 'red-btn':
      copy('<cg-button red></cg-button>');
      break;
    case 'white-btn':
      copy('<cg-button white></cg-button>');
      break;

    case 'dialog1':
      str = `Dialog.showDialog({
        template: 'tmp1',
        title: '',
        tmp1Content: ''
      });`;
      copy(str);
      break;
    case 'dialog2':
      str = `Dialog.showDialog({
        template: 'tmp2',
        title: '',
        customComponent:
      });`;
      copy(str);
      break;
    case 'dialog3':
      str = `Dialog.showDialog({
        template: 'tmp3',
        customComponent:
      });`;
      copy(str);
      break;
    case 'dialog4':
      str = `Dialog.showDialog({
        template: 'tmp1', // 也可以是tmp2
        redTitle: '',
        showClose:true,
        tmp1Content: ''
      });`;
      copy(str);
      break;
    case 'switch':
      copy('<cg-switch v-model="state1" />');
      break;
    case 'switch_disabled':
      copy('<cg-switch v-model="state2" :disabled="true" />');
      break;
    case 'avatar1':
      copy(`<cg-avatar :width="55" :height="55" @click="$router.push('/demo')" />`);

      break;
    case 'avatar2':
      copy(`<cg-avatar @click="openEdit" />`);
      break;
    case 'divider':
      copy(`<cg-divider direction="vertical" color="--cg-color-red" :margin="'30px 0 0 0'" />`);
      break;
    case 'divider1':
      copy(`<cg-divider :margin="'0 20px 0 30px'"/>`);
      break;
    case 'empty':
      str = `<cg-empty bth-text="Đặt cược ngay">
          Chưa có bất kì lịch sử đặt cược
          <template #buttonText>
            <cg-button :width="300" :height="50"> Đặt cược ngay </cg-button>
          </template>
        </cg-empty>`;
      copy(str);
      break;
    case 'empty1':
      str = `<cg-empty bth-text="Đặt cược ngay">
          Chưa có bất kì lịch sử đặt cược
          <template #img>
            <app-image src="/avatar/2.png" style="width: 140px" />
          </template>
        </cg-empty>`;
      copy(str);
      break;
    case 'tab':
      copy(`<cg-tab v-model="params.pageType" :list="pageTypeList" @on-tab="" />`);
      break;
    case 'containter1':
      str = ` <CgContainer padding="30">
            <template #content>
              默认样式：只有一条border
              属性：padding radius 自己设置值
            </template>
          </CgContainer>`;
      copy(str);
      break;
    case 'containter2':
      str = `<CgContainer type='active' url=""></CgContainer>`;
      copy(str);
      break;
    case 'containter3':
      str = ` <CgContainer type='login' padding="30" radius="8">
            <template #content>
              3、登陆页面 type='login'
            </template>
          </CgContainer>`;
      copy(str);
      break;
    case 'containter3':
      str = `  <cg-container  padding="20">
              <template #head>
                <cg-container-head>
                <template #left>
                  containerHead
                </template>
              </cg-container-head>
              </template>
              <template #content>
                内容
              </template>
            </cg-container>`;
      copy(str);
      break;
    case 'containter4':
      str = `<CgContainer type='popup' padding="30" radius="12">
            <template #head>
              <cg-container-head>
                <template #center>4、 弹窗toubu </template>
                <template #right> X </template>
              </cg-container-head>
            </template>
            <template #content>
              弹窗只有白色bg  无border 无阴影
            </template>
          </CgContainer>`;
      copy(str);
      break;
    case 'containter5':
      str = ` <CgContainer type='smallContainer' padding="30" radius="8">
            <template #content>
              个人中心所有的contanter 都用这个
            </template>
          </CgContainer>`;
      copy(str);
      break;
    case 'containter6':
      str = ` <CgContainer type="parent" paddingY="30" paddingX='10' radius="12" >
            <template #content> 6、个人中心最外成容器 0px 12px 30px var(--cg-color-grey4) </template>
          </CgContainer>`;
      copy(str);
      break;
    case 'containter7':
      str = `<CgContainer type="info" >
            <template #content>
              7、个人中心info bg
            </template>
          </CgContainer>`;
      copy(str);
      break;
    case 'containter7':
      str = ` <CgContainer type="bank" radius="12">
            <template #content>
              8、添加银行卡纯色背景
            </template>
          </CgContainer>`;
      copy(str);
      break;
    case 'head1':
      str = `  <cg-container-head>
            <template #left>
              左边内容fsdfds
            </template>
            <template #center>
              中边内容
            </template>
            <template #right>
              右边内容
            </template>
          </cg-container-head>`;
      copy(str);
      break;
    case 'scroll-bar':
      copy('<cg-scroll-bar></cg-scroll-bar>');
      break;
    case 'progress_style_c':
      str = `<CgProgress :progress_style_c="progress">{{ progress }}</CgProgress>`;
      copy(str);
      break;
    case 'progress_style_b':
      str = `<CgProgress :progress_style_b="progress">{{ progress_style2 }}</CgProgress>`;
      copy(str);
      break;
    case 'progress_style_t':
      str = `<CgProgress :progress_style_t="progress"></CgProgress>`;
      copy(str);
      break;
    case 'Refresh':
      str = `<CgRefresh :refreshUrl="refreshUrlStr" :type="'get'" @onRefresh="onRefreshFunc">{{ refreshUrlStr }}</CgRefresh>`;
      copy(str);
      break;
    case 'radio':
      str = `<CgRadio :radios="radios" @onRadio="onRadioFunc"></CgRadio>`;
      copy(str);
      break;
    case 'maintain':
      copy(`<cg-maintain type="" />`);
      break;
    case 'CgBreadcrumb':
      copy(`<cg-breadcrumb v-model="" :list="" />`);
      break;
    case 'time1':
      copy(`<cg-time :time="1676976689" />`);
      break;
    case 'time2':
      copy(`<cg-time :time="1676976689" :formatStr="'-'" :font="'var(--cg-font-text3)'" />`);
      break;
    case 'time3':
      copy(`<cg-time :time="1676976629" :color="'var(--cg-color-red)'" :font="'var(--cg-font-text3)'" />`);
      break;
    case 'time4':
      copy(`<cg-time :time="1676891276" :is-two-line="true" :formatStr="'*'" :color="'var(--cg-color-blue1)'" />`);
      break;
    case 'tab1':
      copy(`<cg-tab padding="16" v-model="game_type" :list="navList" @on-change=""></cg-tab>`);
      break;
    case 'tab2':
      copy(`<cg-tab padding='47' v-model="game_types" :list="navLists" @on-change=""></cg-tab>`);
      break;
    case 'useDialog':
      copy(`import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
      const Dialog = new CgDialogClass()`);
      break;
    case 'openLogin':
      copy(`import { LogInAndRegister } from '@/utils/logIn';`)
      break
    default:
      break;
  }

  Toast('复制成功');
};

function noticeMsgList(params: { page: number; page_size: number }) {
  return http.get('member/message/list', {
    params: {
      ...params,
      ty: 0
    }
  });
}

const columns = ref<CgTableColumns[]>([
  {
    title: 'Tài Khoản Hội Viên',
    field: 'title',
    isSort: true,
    sortValue: '',
    align: 'left'
  },
  {
    title: '内容',
    field: 'content'
  },
  {
    title: '时间',
    field: 'ts',
    isSort: true,
    sortValue: ''
  }
]);
const radios = [
  {
    label: 'Tất cả các mục đều chính xác',
    value: '1'
  },
  {
    label: 'Tất cả các mục đều chính xác',
    value: '2'
  },
  {
    label: 'Tất cả các mục đều chính xác',
    value: '3'
  },
  {
    label: 'Tất cả các mục đều chính xác',
    value: '4'
  }
];
const radios_InT = [
  {
    url: 'ewm',
    value: 'MoMo1'
  },
  {
    url: 'ewm',
    value: 'MoMo2'
  },
  {
    url: 'ewm',
    value: 'MoMo2'
  },
  {
    url: 'ewm',
    value: 'MoMo4'
  }
];
const radios_TnT = [
  {
    url: 'ewm',
    value: ''
  },
  {
    url: 'ewm',
    value: ''
  },
  {
    url: '',
    value: 'MoMo3'
  },
  {
    url: '',
    value: 'MoMo4'
  }
];
const radios_TnTO = [
  {
    url: 'ewm',
    value: 'MoMo1'
  },
  {
    url: 'ewm',
    value: 'MoMo2'
  },
  {
    url: 'ewm',
    value: 'MoMo3'
  },
  {
    url: 'ewm',
    value: 'MoMo4'
  }
];
const radios_I = [
  {
    url: 'BIDV',
    value1: 'Ngân Hàng Đầu Tư Và Phát Triển',
    label1: 'Việt Nam (BIDV)',
    value2: 'di*',
    label2: '*1234'
  },
  {
    url: 'BIDV',
    value1: 'Ngân Hàng Đầu Tư Và Phát Triển',
    label1: 'Việt Nam (BIDV)',
    value2: 'di*',
    label2: '*1234'
  },
  {
    url: 'BIDV',
    value1: 'Ngân Hàng Đầu Tư Và Phát Triển',
    label1: 'Việt Nam (BIDV)',
    value2: 'di*',
    label2: '*1234',
    error: 'err',
  }
];
const onRadioFunc = (name: string) => {
  console.log(name);
};
// Dialog
const cgDialog = (type: 1 | 2 | 3 | 4) => {
  switch (type) {
    case 1:
      Dialog.showDialog({
        template: 'tmp1',
        title: 'this is a demo1',
        tmp1Content: `
        Tối ưu hóa kênh tiền gửi1 Để tránh các vấn đề từ phiên bản cũ, người dùng nên cập nhật lên phiên
        `
      });
      break;
    case 2:
      Dialog.showDialog({
        template: 'tmp2',
        title: 'this is a demo2',
        customComponent: CgEmpty
      });
      break;
    case 3:
      Dialog.showDialog({
        template: 'tmp3',
        customComponent: CgAvatar
      });
      break;
    case 4:
      Dialog.showDialog({
        template: 'tmp1',
        redTitle: 'this is a demo1',
        showClose: true,
        tmp1Content: `
        Tối ưu hóa kênh tiền gửi1 Để tránh các vấn đề từ phiên bản cũ, người dùng nên cập nhật lên phiên
        `
      });

    default:
      break;
  }
};

const activeName = ref('CgContainer');
const state1 = ref(true);
const state2 = ref(true);
const currentName = ref('');
const navList = [
  { value: '2', name: 'Casino' },
  { value: '6', name: 'Thể Thao' },
  { value: '5', name: 'Lô Đề' },
  { value: '4', name: 'Nổ Hũ' },
  { value: '7', name: 'Game Bài' },
  { value: '3', name: 'Bắn Cá' },
  { value: '9', name: 'Đá Gà' },
  { value: '8', name: 'Esports' }
];
const navLists = [
  { value: '2', name: 'Trạm thư' },
  { value: '6', name: 'Thông báo' }
];
const game_type = ref(navList[0].value);
const game_types = ref(navLists[0].value);

const money = ref(12345678.98);
let timer = setTimeout(() => {
  money.value += 45937.22;
}, 2000);

const callBack = () => {
  console.log('123132');
};
const openEdit = () => {
  Toast('打开编辑头像弹框');
};

const showEditAvatar = ref(false);

const sort = (a: any, b: any) => {
  console.error(a, b);
};

const input = ref();

const selectValue = ref();
const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
];

const pageChange = (page: any) => {
  console.log(page);
};

const text = ref(9682057652);
const bouncetextref = ref();
const changeText = () => {
  text.value += Math.floor(Math.random()*1000);
  bouncetextref.value.startTxt();
}
const toggleImg = () => {
  bouncetextref.value.toggleImg();
}
</script>

<template>
  <div>
    <cg-button @click="handleCopy('openLogin')">一键引入登录弹窗</cg-button>
    <cg-button @click="handleCopy('useDialog')">一键引入Dialog</cg-button>
    <cg-button @click="handleCopy('toast')">一键引入Toast</cg-button>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="CgSelect" name="CgSelect">
        <div class="cg_select">
          <cg-select v-model="selectValue" placeholder="Select" :options="options" />
        </div>
        <cg-button whiteStyle @click="handleCopy('select')">复制</cg-button>
      </el-tab-pane>
      <el-tab-pane label="CgInput" name="CgInput">
        <cg-input v-model="input" placeholder="Please input" />
        <cg-button whiteStyle @click="handleCopy('input')">复制</cg-button>
      </el-tab-pane>
      <el-tab-pane label="CgDialog" name="CgDialog">
        <cg-button @click="cgDialog(1)">模板1</cg-button>
        <cg-button whiteStyle @click="handleCopy('dialog1')">复制</cg-button>
        <cg-button @click="cgDialog(2)">模板2</cg-button>
        <cg-button whiteStyle @click="handleCopy('dialog2')">复制</cg-button>
        <cg-button @click="cgDialog(3)">模板3</cg-button>
        <cg-button whiteStyle @click="handleCopy('dialog3')">复制</cg-button>
        <cg-button @click="cgDialog(4)">模板4</cg-button>
        <cg-button whiteStyle @click="handleCopy('dialog4')">复制</cg-button>
      </el-tab-pane>
      <el-tab-pane label="CgButton" name="CgButton">
        <cg-button @click="handleCopy('btn')">普通按钮</cg-button>
        <cg-button whiteStyle @click="handleCopy('w-btn')">白色按钮</cg-button>
        <cg-button small @click="handleCopy('sm-btn')">弹窗小按钮</cg-button>
        <cg-button round @click="handleCopy('r-btn')">圆按钮</cg-button>
        <cg-button mini @click="handleCopy('mini-btn')">mini按钮</cg-button>
        <cg-button blue @click="handleCopy('blue-btn')">blue按钮</cg-button>
        <cg-button red @click="handleCopy('red-btn')">red按钮</cg-button>
        <cg-button white @click="handleCopy('white-btn')">white按钮</cg-button>
      </el-tab-pane>
      <el-tab-pane label="CgScrollBar" name="CgScrollBar">
        <div style="height: 300px; width: 200px">
          <cg-scroll-bar>
            <div style="width: 200px; height: 50px; background-color: gray; margin-bottom: 5px" v-for="i in 20">{{ i }}
            </div>
          </cg-scroll-bar>
        </div>
        <cg-button whiteStyle @click="handleCopy('scroll-bar')">复制</cg-button>
      </el-tab-pane>
      <el-tab-pane label="CgAvatar" name="CgAvatar">
        <div style="height: 30px"></div>
        <div style="display: flex">
          <cg-avatar :width="55" :height="55" @click="$router.push('/demo')" />
          <cg-button @click="handleCopy('avatar1')">头部用</cg-button>
        </div>
        <div style="height: 30px"></div>
        <div style="display: flex">
          <cg-avatar @click="openEdit" />
          <cg-button @click="handleCopy('avatar2')">个人中心用</cg-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="CgDivider" name="CgDivider">
        <div style="height: 80px; display: flex; justify-content: space-around">
          <cg-divider direction="vertical" color="--cg-color-red" :margin="'50px'" />
          <cg-button @click="handleCopy('divider')">竖线自定义颜色带间距</cg-button>
        </div>
        <div style="height: 50px"></div>
        <div style="display: flex">
          <div style="flex: 1"><cg-divider :margin="'0 20px 0 30px'" /></div>
          <cg-button @click="handleCopy('divider1')">横线默认颜色带间距</cg-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="CgEmpty" name="CgEmpty">
        <cg-button whiteStyle @click="handleCopy('empty')">复制带按钮自定义距离顶部高度空状态</cg-button>

        <cg-empty bth-text="Đặt cược ngay">
          Chưa có bất kì lịch sử đặt cược
          <template #buttonText>
            <cg-button :width="300" :height="50"> Đặt cược ngay </cg-button>
          </template>
        </cg-empty>
        <div style="height: 50px"></div>
        <cg-button whiteStyle @click="handleCopy('empty1')">复制不带按钮空状态</cg-button>
        <cg-empty bth-text="Đặt cược ngay">
          Chưa có bất kì lịch sử đặt cược
          <template #img>
            <app-image src="/avatar/2.png" style="width: 140px" />
          </template>
        </cg-empty>
      </el-tab-pane>
      <el-tab-pane label="CgSwitch" name="CgSwitch">
        <div style="width: 800px; margin: 0 auto">
          <div style="height: 30px"></div>
          <div style="display: flex">
            <cg-switch v-model="state1" />
            <cg-button small whiteStyle @click="handleCopy('switch')">复制 开关</cg-button>
          </div>
          <div style="display: flex; margin-top: 20px">
            <cg-switch v-model="state2" :disabled="true" />
            <cg-button small whiteStyle @click="handleCopy('switch_disabled')">复制 禁用状态开关开关</cg-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="CgBadge" name="CgBadge">
        <div class="box1">
          <cg-badge value="9">
            <span>这是一个带 Badge 的组件</span>
          </cg-badge>
          <br /><br />
          <cg-badge :is-dot="true">
            <span>是否显示小红点 </span>
          </cg-badge>
          <br /><br />
          <el-badge :value="12" class="item"> </el-badge>
        </div>
      </el-tab-pane>
      <el-tab-pane label="CgMaintain" name="CgMaintain">
        <cg-button whiteStyle @click="handleCopy('maintain')">复制</cg-button>
        <div class="CgMaintain venue">
          123123
          <CgMaintain type="venue" :time="1677673887" />
        </div>
        <div class="CgMaintain drop">
          123123
          <CgMaintain type="drop" :time="1677673887" />
        </div>
        <div class="CgMaintain logo">
          123123
          <CgMaintain type="logo" />
        </div>
        <div class="CgMaintain bank">
          123123
          <CgMaintain type="bank" />
        </div>
        <div class="CgMaintain wallet">
          123123
          <CgMaintain type="wallet" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="CgBigNumber" name="CgBigNumber">
        <CgBigNumber class="deep-blue" :money="formatNumberToCurrency(money)" :num-height="76" />
        <CgBigNumber :money="formatNumberToCurrency(money, '')" />
      </el-tab-pane>
      <el-tab-pane label="CgContainerHead" name="CgContainerHead">
        <div class="box1">
          <cg-container-head padding="20" height="18" bg="--cg-color-red">
            <template #left> 左边内容fsdfds </template>
            <template #center> 中边内容 </template>
            <template #right> 右边内容 </template>
          </cg-container-head>
          <cg-button whiteStyle @click="handleCopy('head1')">复制</cg-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="CgContainer" name="CgContainer">
        <div class="box1">
          <CgContainer padding="30">
            <template #content> 1、 默认样式：只有一条border 属性：padding radius 自己设置值 padding 可以传一个 也可以多个 最多4个 </template>
          </CgContainer>
          <cg-button whiteStyle @click="handleCopy('containter1')">复制</cg-button>
          <br /><br />

          <CgContainer type="active" url=""> </CgContainer>
          2、活动list 背景图是图片 url
          <cg-button whiteStyle @click="handleCopy('containter2')">复制</cg-button>

          <CgContainer type="login" padding="30" radius="8">
            <template #content>
              3、登陆页面 type='login' Lưu ý dành cho hội viên: Hoan nghênh quý khách đăng ký tài khoản hội viên trên nền
              tảng
              P3, chúng tôi có một số điểm lưu ý mong quý khách nắm rõ: 1. Mỗi cá nhân
              chỉ được đăng ký 1 tài khoản duy nhất, vui lòng không đăng ký lại hoặc giúp hội viên cấp dưới đăng ký tài
              khoản. 2. Tên tài khoản đăng nhập không bao gồm thông tin số điện thoại nhằm bảo
              mật thông tin cá nhân. 3. Nạp tiền vui lòng đăng nhập trang chủ nhận thông tin tài khoản, không tin tưởng
              bất kỳ ai (kể cả đại lý cấp trên) gửi riêng thông tin tài khoản yêu cầu chuyển
              tiền. 4. Vui lòng liên kết số điện thoại chính chủ, bởi khi thực hiện rút tiền sẽ cần nhận mã xác
              nhận.</template>
          </CgContainer>
          <cg-button whiteStyle @click="handleCopy('containter3')">复制</cg-button>

          <CgContainer type="popup" padding="30,16,12,0" radius="12">
            <template #head>
              <cg-container-head>
                <template #center>4、 弹窗toubu </template>
                <template #right> X </template>
              </cg-container-head>
            </template>
            <template #content> 弹窗只有白色bg 无border 无阴影 </template>
          </CgContainer>
          <cg-button whiteStyle @click="handleCopy('containter4')">复制</cg-button>
          <div style="height:200px">
            <CgContainer type="smallContainer" padding="30" radius="8">
              <template #content> 5、 已和设计师沟通过 个人中心所有的小边框都用这个 阴影统一 box-shadow: 0px 6px 12px rgba(190, 215, 239, 0.6);
              </template>
            </CgContainer>
          </div>
          <cg-button whiteStyle @click="handleCopy('containter5')">复制</cg-button>

          <CgContainer type="parent" padding="30,0,0,0" radius="12">
            <template #content>
              6、个人中心最外成容器 0px 12px 30px var(--cg-color-grey4)
              <br />
              不同边距传：padding 可以传一个 也可以多个 最多4个
            </template>
          </CgContainer>
          <cg-button whiteStyle @click="handleCopy('containter6')">复制</cg-button>
          <CgContainer type="info">
            <template #content> 7、个人中心info bg </template>
          </CgContainer>
          <cg-button whiteStyle @click="handleCopy('containter7')">复制</cg-button>
          <CgContainer type="bank" radius="12">
            <template #content> 8、添加银行卡纯色背景 </template>
          </CgContainer>
          <cg-button whiteStyle @click="handleCopy('containter8')">复制</cg-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="CgAmount">
        <cg-amount :amount="1233000" :isClick="true" :segmentation="true" @callBack="callBack" suffix="K" padding="0"
          :precision="2"></cg-amount>
        <cg-button whiteStyle @click="handleCopy('amount')">复制</cg-button>
      </el-tab-pane>
      <el-tab-pane label="CgTime" name="CgTime">
        <div style="height: 50px; cursor: pointer; margin-top: 20px" @click="handleCopy('time1')">
          <cg-time :time="1676976689" />
        </div>
        <div style="height: 50px; cursor: pointer" @click="handleCopy('time2')">
          <cg-time :time="1676976689" :formatStr="'-'" :font="'var(--cg-font-text3)'" />
        </div>
        <div style="height: 50px; cursor: pointer" @click="handleCopy('time3')">
          <cg-time :time="1676976629" :color="'var(--cg-color-red)'" :font="'var(--cg-font-text3)'" />
        </div>
        <div style="height: 50px; cursor: pointer" @click="handleCopy('time4')">
          <cg-time :time="1676891276" :is-two-line="true" :formatStr="'*'" :color="'var(--cg-color-blue1)'" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="CgBreadcrumb" name="CgBreadcrumb">
        <CgBreadcrumb v-model="currentName" :list="['第一个', '第二个', '第三个', '第四个', '第五个']" />
        <cg-button whiteStyle @click="handleCopy('CgBreadcrumb')">复制</cg-button>
      </el-tab-pane>
      <el-tab-pane label="CgTab" name="CgTab">
        <div class="box1" v-if="activeName === 'CgTab'">
          <cg-button whiteStyle @click="handleCopy('tab1')">复制</cg-button>
          <cg-tab padding="16" v-model="game_type" :list="navList" @on-change=""></cg-tab>
          <br />无需修改padding<br />
          <cg-button whiteStyle @click="handleCopy('tab2')">复制</cg-button>
          <cg-tab padding="47" v-model="game_types" :list="navLists" @on-change=""></cg-tab>
        </div>
      </el-tab-pane>
      <el-tab-pane label="CgTable" name="CgTable">
        <cg-button @click="$refs.cgTable.getListData()">查询</cg-button>
        <CgTable ref="cgTable" @sort="sort" :form-data="{ ty: 0 }" :columns="columns">
          <template #month="{ row }"> 123123 {{ row.month }} </template>
        </CgTable>
      </el-tab-pane>
      <el-tab-pane label="CgPagination" name="CgPagination">
        <CgPagination background layout="prev, pager, next" :total="1000" />
      </el-tab-pane>
      <el-tab-pane label="Progress" name="Progress">
        <!-- Progress -->
        <div @click="handleCopy('progress_style_b')">
          <CgProgress :position="'top'" :rate="50" :height="20">progress样式二</CgProgress>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Radio" name="Radio">
        <!-- Radio -->
        <div @click="handleCopy('radios')">
          <CgRadio :radios="radios" @onRadio="onRadioFunc"></CgRadio>
        </div>
        <div @click="handleCopy('radios_InT')">
          <CgRadio :radios_InT="radios_InT" @onRadio="onRadioFunc"></CgRadio>
        </div>
        <div @click="handleCopy('radios_TnT')">
          <CgRadio :radios_TnT="radios_TnT" @onRadio="onRadioFunc"></CgRadio>
        </div>
        <div @click="handleCopy('radios_TnTO')">
          <CgRadio :radios_TnTO="radios_TnTO" @onRadio="onRadioFunc"></CgRadio>
        </div>
        <div @click="handleCopy('radios_I')">
          <CgRadio :radios_I="radios_I" @onRadio="onRadioFunc"></CgRadio>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Refresh" name="Refresh">
        <!-- Refresh -->
        <div @click="handleCopy('Refresh')">
          <CgRefresh :refreshUrl="'member/balance'" :type="'get'" @onRefresh="onRefreshFunc">{{ refreshUrlStr }}
          </CgRefresh>
        </div>
      </el-tab-pane>
      <el-tab-pane label="BounceText" name="BounceText">
        <!-- BounceText -->
        <div>
          <CgBounceText ref="bouncetextref" :wrap-width="400" :wrap-height="400">
            <template #rotateContent>
              <app-image :src="'/venueLogo/venueLogo_2.png'" width="400"/>
            </template>
            <template #scaleContent>
              <app-image :src="'/logo/logo.png'" width="200"/>
            </template>
            <template #bounceTxt>
              <div class="my-text">
                {{ text }}
              </div>
            </template>
          </CgBounceText>
          <cg-button @click="changeText">change</cg-button>
          <br/>
          <cg-button @click="toggleImg">toggle img rotate</cg-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.main {}

.box1 {
  background-color: rgba(0, 0, 0, 0.263);
  padding: 30px;

  :deep(.cg-container) {
    margin-top: 30px;
  }
}

// 维护组件
.CgMaintain {
  background-color: aqua;
  color: #000;
}

.venue {
  width: 700px;
  height: 400px;
}

.drop {
  width: 240px;
  height: 320px;
}

.logo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.bank {
  width: 868px;
  height: 68px;
  border-radius: 8px;
  border: 2px solid var(--cg-color-blue3);
}

.wallet {
  width: 205px;
  height: 85px;
  box-shadow: 0px 3px 6px var(--cg-shadow-color1);
  border-radius: 12px;
  border: 1px solid var(--cg-color-blue8);
}

.cg_select {
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-text {
  line-height: 100px;
  font-size: 20px;
}
</style>
