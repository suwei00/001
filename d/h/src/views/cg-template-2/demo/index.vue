<script setup lang="ts">
import { getSortFormData, newCopy } from '@/utils/common';
import {
  CgUseAmount,
  CgAmount,
  CgIcon,
  CgField,
  CgEmpty,
  CgButton,
  CgDivider,
  CgAvatar,
  CgSelect,
  CgSwitch,
  CgTab,
  CgContainer,
  CgContainerHead,
  CgScrollBar,
  CgProgress,
  CgRefresh,
  CgRadio,
  CgMaintain,
  CgTime,
  CgItem,
  CgBadge,
  CgList,
  CgTable,
  CgTimeSelect
} from '@cg-template-2-components/index';
import { ref } from 'vue';
import CgForm, { type FormItem } from '@/components/cg-template-2/cg-form';
import { Toast } from 'vant';
import { useOption } from '@/hooks/useOption';
import APIs from '@/http/blue-apis';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';

const Dialog = new CgDialogClass()
const name = ref('271');
const { option: flagList } = useOption('flagList');
const options = ref<FormItem[]>([
  {
    label: '姓名',
    value: 'name',
    type: 'field',
    placeholder: '请输入姓名'
  },
  {
    label: 'label可改',
    value: 'age',
    type: 'field',
    placeholder: '请输入姓名'
  },
  {
    label: 'Tài Khoản Hội<br>Viên',
    value: 'week',
    type: 'select',
    placeholder: '请选择',
    options: [
      {
        label: '降序奖金',
        value: 'sort|amount|0'
      },
      {
        label: '生序奖金',
        value: 'sort|amount|1'
      },
      {
        label: '周三',
        value: 3
      },
      {
        label: '周四',
        value: 4
      },
      {
        label: '周五',
        value: 5
      },
      {
        label: '周六',
        value: 6
      },
      {
        label: '周日',
        value: 7
      }
    ]
  }
]);
const submit = (data: any) => {
  console.error('data', data);
  console.error('data', getSortFormData(data));
};
const iconList = [
  'i_pasw_b',
  'i_pasw_z',
  'i_input_close',
  'i_amount',
  'i_refresh',
  'i_user',
  'i_speaker',
  'i_my',
  'i_proxy',
  'i_discount',
  'i_chat',
  'i_chat_c',
  'i_hot_active',
  'i_fish',
  'i_electronic',
  'i_chess',
  'i_sports',
  'i_video',
  'i_lottery',
  'i_chat_close',
  'i_service',
  'i_quit',
  'i_arrow',
  'i_union',
  'i_warn',
  'i_faild',
  'i_success',
  'i_operator',
  'i_caption',
  'i_n_user',
  'i_path',
  'i_del',
  'i_search',
  'i_details',
  'i_copy',
  'i_qr',
  'i_search_list',
  'i_facebook',
  'i_telegram',
  'i_user_2',
  'i_union_1',
  'i_polygon',
  'i_issue',
  'i_about',
  'i_user_3',
  'i_up',
  'i_trade_1',
  'i_trade_2',
  'i_trade_3',
  'i_trade_4',
  'i_trade_5',
  'i_game_pr',
  'i_radio_a',
  'i_radio',
  'i_email',
  'i_setting',
  'i_vip1',
  'i_vip2',
  'i_vip3',
  'i_vip4',
  'i_vip5',
  'i_vip6',
  'i_vip7',
  'i_vip8',
  'i_vip9',
  'i_vip10',
  'i_favor',
  'i_deposit',
  'i_transfer',
  'i_withdraw'
];

const tel1 = ref();
const tel2 = ref();
const tel3 = ref();
const tel4 = ref();
const tel5 = ref();
const tel6 = ref();
const active = ref(1);

const componentsList = ref([
  {
    name: 'CgIcon',
    value: 0
  },
  {
    name: 'CgInput',
    value: 1
  },
  {
    name: 'CgEmpty',
    value: 2
  },
  {
    name: 'CgDivider',
    value: 3
  },
  {
    name: 'CgAvatar',
    value: 4
  },
  {
    name: 'CgSwitch',
    value: 5
  },
  {
    name: 'CgTab',
    value: 6
  },
  {
    name: 'CgContainter',
    value: 7
  },
  {
    name: 'CgContainterHead',
    value: 8
  },
  {
    name: 'CgButton',
    value: 9
  },
  {
    name: 'CgDialog',
    value: 10
  },
  {
    name: 'CgScrollBar',
    value: 11
  },
  {
    name: 'Progress',
    value: 12
  },
  {
    name: 'Refresh',
    value: 13
  },
  {
    name: 'Radio',
    value: 14
  },
  {
    name: 'CgMaintain',
    value: 15
  },
  {
    name: 'CgTime',
    value: 16
  },
  {
    name: 'CgItem',
    value: 17
  },
  {
    name: 'CgForm',
    value: 18
  },
  {
    name: 'CgList',
    value: 19
  },
  {
    name: 'CgAmount',
    value: 20
  }
]);
const state = ref(false);
const state1 = ref(true);
const state2 = ref(true);
const getIcon = (name: string) => {
  return `<cg-icon name="${name}" />`;
};

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
    Toast.success('复制成功');
  }
  document.body.removeChild(input);
};

const actions = [
  { id: 1, name: '选项1' },
  { id: 2, name: '选项2' },
  { id: 3, name: '选项3' },
  { id: 4, name: '选项4' },
  { id: 5, name: '选项5' },
  { id: 6, name: '选项6' },
  { id: 7, name: '选项7' },
  { id: 8, name: '选项8' },
  { id: 9, name: '选项9' },
  { id: 10, name: '选项10' },
  { id: 11, name: '选项11' },
  { id: 12, name: '选项12' },
  { id: 13, name: '选项13' },
  { id: 14, name: '选项14' },
  { id: 15, name: '选项15' },
  { id: 16, name: '选项16' },
  { id: 17, name: '选项17' }
];
const pageTypeList = [
  { label: 'Trạm thư', value: 1 },
  { label: 'Thông Báo', value: 2 }
];
const pageType = ref(pageTypeList[0].value);
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

// 复制函数
const handleCopy = (type: string) => {
  let str;

  switch (type) {
    case 'mini-btn':
      newCopy('<cg-button mini round></cg-button>');
      break;
    case 'sm-btn':
      newCopy('<cg-button small></cg-button>');
      break;
    case 'sm-w-btn':
      newCopy('<cg-button small whiteStyle></cg-button>');
      break;
    case 'btn':
      newCopy('<cg-button></cg-button>');
      break;
    case 'w-btn':
      newCopy('<cg-button whiteStyle></cg-button>');
      break;
    case 'r-btn':
      newCopy('<cg-button round></cg-button>');
      break;
    case 'custom-btn':
      str = `<cg-button paddingX="6" paddingY="12" customStyle small whiteStyle>
              LẤY MÃ<br />
              XÁC NHẬN
            </cg-button> `;
      newCopy(str);
      break;
    case 'dialog1':
      str = `Dialog.showDialog({
        template: 'tmp1',
        title: '',
        tmp1Content: ''
      });`;
      newCopy(str);
      break;
    case 'dialog2':
      str = `Dialog.showDialog({
        template: 'tmp2',
        title: '',
        customComponent: 
      });`;
      newCopy(str);
      break;
    case 'dialog3':
      str = `Dialog.showDialog({
        template: 'tmp3',
        customComponent: 
      });`;
      newCopy(str);
      break;
    case 'dialog4':
      str = `Dialog.showDialog({
        template: 'tmp1', // 也可以是tmp2
        redTitle: '',
        tmp1Content: ''
      });`;
      newCopy(str);
      break;
    case 'switch':
      newCopy('<cg-switch v-model="state1" />');
      break;
    case 'switch_disabled':
      newCopy('<cg-switch v-model="state2" :disabled="true" />');
      break;
    case 'avatar_cricle1':
      newCopy(`<cg-avatar :img='0' :rate='50' />`);
      break;
    case 'avatar_cricle2':
      str = `<cg-avatar :img="'0'" :rate="50" :width="200" :height="200">
            <template #icon>
              <cg-icon name="i_edit" :width="50" />
            </template>
          </cg-avatar>`;
      newCopy(str);
      break;

    case 'avatar_cricle3':
      str = `<cg-avatar :img="'5'">
            <template #icon>
              <cg-icon name="i_edit" :width="50" />
            </template>
          </cg-avatar>`;
      newCopy(str);
      break;
    case 'divider':
      newCopy(`<cg-divider direction="vertical" color="var(--cg-color-red)" />`);
      break;
    case 'divider1':
      newCopy(`<cg-divider />`);
      break;

    case 'empty':
      str = `<cg-empty bth-text="Đặt cược ngay" :margin-top="30">
          <template #buttonText>
            <div>自定义按钮文字</div>
          </template>
        </cg-empty>`;
      newCopy(str);
      break;
    case 'empty1':
      str = `<cg-empty bth-text="Đặt cược ngay">
          Chưa có bất kì lịch sử đặt cược
          <template #img>
            <app-image src="/home/2.png" />
          </template>
        </cg-empty>`;
      newCopy(str);
      break;
    case 'tab':
      newCopy(`<cg-tab v-model="pageType" :list="pageTypeList" @on-tab="" />`);
      break;
    case 'containter':
      str = ` <cg-container type="popup" padding="0">
              <cg-container-head>
                <template #center> containerHead </template>
              </cg-container-head>
              弹窗内容
            </cg-container>`;
      newCopy(str);
      break;
    case 'containter1':
      str = `<cg-container type="table" padding="30">
              <template #content>
              </template>
            </cg-container>`;
      newCopy(str);
      break;
    case 'containter2':
      str = `  <cg-container type="login" padding="20">
                Mỗi cá nhân chỉ được đăng ký 1 tài khoản duy nhất, vui lòng không đăng ký lại hoặc
                giúp hội viên cấp dưới đăng ký tài khoản.
            </cg-container>`;
      newCopy(str);
      break;
    case 'containter3':
      str = `   <cg-container padding="0" border="4" :is-shadow="true" radius="16">
              <cg-container-head radius>
                <template #left> containerHead </template>
              </cg-container-head>
              padding border margin 是否有阴影(默认有)
            </cg-container>`;
      newCopy(str);
      break;
    case 'containter4':
      str = `<cg-container padding="20" >
              <template #content> 只有内容 </template>
            </cg-container>`;
      newCopy(str);
      break;
    case 'containter5':
      str = ` <cg-container type="active" url="/avatars/avatar-3.png"> </cg-container>`;
      newCopy(str);
      break;
    case 'head':
      str = `  <cg-container-head height="80" padding="20" bg="">
            <template #left> 左边内容fsdfds </template>
            <template #center> 中边内容 </template>
            <template #right> 右边内容 </template>
          </cg-container-head>`;
      newCopy(str);
      break;
    case 'head1':
      str = ` <cg-container type="active" url="/avatars/avatar-3.png"> </cg-container>`;
      newCopy(str);
      break;
    case 'scroll-bar':
      newCopy('<cg-scroll-bar></cg-scroll-bar>');
      break;
    case 'progress_style_c':
      str = `<CgProgress :rate="50" height="40" position="center"></CgProgress>`;
      newCopy(str);
      break;
    case 'progress_style_b':
      str = `<CgProgress :rate="50" height="40" position="bottom"></CgProgress>`;
      newCopy(str);
      break;
    case 'progress_style_t':
      str = `<CgProgress :rate="50" height="40" position="top"></CgProgress>`;
      newCopy(str);
      break;
    case 'Refresh':
      str = `<CgRefresh :refreshUrl="refreshUrlStr" :type="'get'" @onRefresh="onRefreshFunc">{{ refreshUrlStr }}</CgRefresh>`;
      newCopy(str);
      break;
    case 'radios':
      str = `<CgRadio :radios="radios" @onRadio="onRadioFunc"></CgRadio>`;
      newCopy(str);
      break;
    case 'radios_InT':
      str = `<CgRadio :radios_InT="radios_InT" @onRadio="onRadioFunc"></CgRadio>`;
      newCopy(str);
      break;
    case 'radios_TnT':
      str = `<CgRadio :radios_TnT="radios_TnT" @onRadio="onRadioFunc"></CgRadio>`;
      newCopy(str);
      break;
    case 'radios_TnTO':
      str = `<CgRadio :radios_TnTO="radios_TnTO" @onRadio="onRadioFunc"></CgRadio>`;
      newCopy(str);
      break;
    case 'radios_I':
      str = `<CgRadio :radios_I="radios_I" @onRadio="onRadioFunc"></CgRadio>`;
      newCopy(str);
      break;
    case 'time1':
      newCopy(`<cg-time :time="1676976689" />`);
      break;
    case 'time2':
      newCopy(`<cg-time :time="1676976689" :formatStr="'-'" :font="'var(--cg-font-text1)'" />`);
      break;
    case 'time3':
      newCopy(
        `<cg-time :time="1676976629" :color="'var(--cg-color-red)'" :size="'var(--cg-font-46)'" />`
      );
      break;
    case 'time4':
      newCopy(
        `<cg-time :time="1676891276" :is-two-line="true" :formatStr="'*'" :color="'var(--cg-color-blue1)'" />`
      );
      break;
    case 'cgitem':
      newCopy(`<cg-item v-model="name" :list="flagList" />`);
      break;
    case 'cgform':
      newCopy(`<CgForm :options="options" :label-width="180" @submit="submit" />`);
      break;
    case 'cgform1':
      str = `const options = ref<FormItem[]>([
        {
          label: '姓名',
          value: 'name',
          type: 'field',
          placeholder: '请输入姓名'
        },
        {
          label: 'label可改',
          value: 'age',
          type: 'field',
          placeholder: '请输入姓名'
        }, {
          label: 'Tài Khoản Hội<br>Viên',
          value: 'week',
          type: 'select',
          isOpen: false,
          placeholder: '请选择',
          options: [
            {
              label: '周一',
              value: 1
            }, {
              label: '周二',
              value: 2
            }
          ]
        }
      ])const submit = (data: any) => {
        console.error('data', data)
      }`;
      newCopy(str);
      break;
    default:
      break;
  }

  Toast('复制成功');
};

// Dialog
const cgDialog = (type: 1 | 2 | 3 | 4) => {
  switch (type) {
    case 1:
      Dialog.showDialog({
        template: 'tmp1',
        title: 'this is a demo1',
        closeOnClickOverlay: true,
        tmp1Content: `
        Tối ưu hóa kênh tiền gửi1 Để tránh các vấn đề từ phiên bản cũ, người dùng nên cập nhật lên phiên
        `
      });
      break;
    case 2:
      Dialog.showDialog({
        template: 'tmp2',
        title: 'this is a demo2',
        closeOnClickOverlay: true,
        customComponent: CgEmpty
      });
      break;
    case 3:
      Dialog.showDialog({
        template: 'tmp3',
        closeOnClickOverlay: true,
        customComponent: CgEmpty
      });
      break;
    case 4:
      Dialog.showDialog({
        template: 'tmp1',
        redTitle: 'this is a demo1',
        closeOnClickOverlay: true,
        tmp1Content: `
        Tối ưu hóa kênh tiền gửi1 Để tránh các vấn đề từ phiên bản cũ, người dùng nên cập nhật lên phiên
        `
      });

    default:
      break;
  }
};
</script>

<template>
  <div>
    <div class="top-head">
      <div>
        <van-tabs v-model:active="active">
          <van-tab v-for="item in componentsList" :title="item.name"></van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="content">
      <button style="font-size: 10px" @click="copyText(`import { } from '@cg-template-2-components/index';`)">
        复制 import { } from '@cg-template-2-components/index';
      </button>
      <button style="font-size: 10px" @click="
        copyText(
          `import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call;`
        )
      ">
        复制 import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
      </button>

      <!-- Icon -->
      <template v-if="active == 0">
        <div class="demo">
          <div class="demo_item" v-for="item in iconList" :key="item" @click="copyText(item, 'icon')">
            <cg-icon class="icon" :name="item" />
            <span>{{ item }}</span>
          </div>
        </div>
      </template>
      <!-- Input -->
      <template v-else-if="active == 1">
        <div class="field_c">
          <cg-field v-model="tel1" type="password" :isPasw="true"></cg-field>
          <cg-field v-model="tel2" type="text" :clear="true">
            <template #left>
              <cg-icon name="i_my" />
            </template>
          </cg-field>
          <cg-field rightText="Hủy bỏ" v-model="tel3" type="text">
            <template #left>
              <cg-icon name="i_search" />
            </template>
          </cg-field>
          <cg-select rowKey="id" showLabelKey="name" :data="actions" v-model="tel4" clickActionClose placeholder="搜索选择"
            isSearch @on-ok="(val: any) => tel4 = val.id">
            <template #customize v-if="tel4">
              <div>{{ tel4 }}</div>
            </template>
          </cg-select>

          <cg-select rowKey="id" showLabelKey="name" :data="actions" v-model="tel5" placeholder="请输入用户名"
            selectLeftText="HỦY BỎ" selectRightText="XÁC NHẬN" selectText="Tên sảnh" @on-ok="(val: any) => tel5 = val.id">
            <template #item="{ data }">
              <div>
                {{ data.name }}
              </div>
              <div>
                {{ data.name }}
              </div>
              <div>
                {{ data.name }}
              </div>
            </template>
          </cg-select>

          <cg-select isPicker v-model="tel6" placeholder="时间选择" selectLeftText="HỦY BỎ" selectRightText="XÁC NHẬN"
            selectText="Tên sảnh" @on-ok="(val: any) => tel6 = val">
            <template #customize v-if="tel6">
              <div>{{ tel6 }}</div>
            </template>
          </cg-select>
          <div style="width: 100%;margin-top:50px">
            <cg-time-select>
              sfsd
            </cg-time-select>
          </div>
        </div>
      </template>
      <!-- Empty -->
      <template v-else-if="active == 2">
        <cg-button whiteStyle @click="handleCopy('empty')">复制带按钮自定义距离顶部高度空状态</cg-button>

        <cg-empty bth-text="Đặt cược ngay" :margin-top="30">
          <template #buttonText>
            <div>自定义按钮文字</div>
          </template>
        </cg-empty>
        <div style="height: 50px"></div>
        <cg-button whiteStyle @click="handleCopy('empty1')">复制不带按钮空状态</cg-button>
        <cg-empty bth-text="Đặt cược ngay">
          Chưa có bất kì lịch sử đặt cược
          <template #img>
            <app-image src="/home/2.png" />
          </template>
        </cg-empty>
      </template>
      <!-- Divider -->
      <template v-else-if="active == 3">
        <div style="display: flex">
          <div style="height: 50px; margin: 20px auto">
            <cg-divider direction="vertical" color="var(--cg-color-red)" />
            <cg-button small whiteStyle @click="handleCopy('divider')">竖线自定义颜色</cg-button>
          </div>
        </div>
        <div style="height: 50px"></div>
        <cg-divider />
        <div style="height: 10px"></div>
        <cg-button small whiteStyle @click="handleCopy('divider1')">横线默认颜色</cg-button>
      </template>
      <!-- Avatar -->
      <template v-else-if="active == 4">
        <div style="height: 30px"></div>
        <div style="display: flex">
          <cg-avatar :img="'5'">
            <template #icon>
              <cg-icon name="i_edit" :width="50" />
            </template>
          </cg-avatar>
          <cg-button small whiteStyle @click="handleCopy('avatar_cricle3')">自定义icon</cg-button>
        </div>
        <div style="height: 30px"></div>
        <div style="display: flex">
          <cg-avatar :img="'0'" :rate="50" :width="200" :height="200">
            <template #icon>
              <cg-icon name="i_edit" :width="50" />
            </template>
          </cg-avatar>
          <cg-button small whiteStyle @click="handleCopy('avatar_cricle2')">自定义icon宽高</cg-button>
        </div>
        <div style="height: 30px"></div>
        <div style="display: flex">
          <cg-avatar :img="'0'" :rate="50" />
          <cg-button small whiteStyle @click="handleCopy('avatar_cricle1')">不带icon</cg-button>
        </div>
        <div style="height: 30px"></div>
      </template>
      <!-- Switch -->
      <template v-else-if="active == 5">
        <div style="height: 30px"></div>
        <div style="display: flex">
          <cg-switch v-model="state1" />
          <cg-button small whiteStyle @click="handleCopy('switch')">复制 开关</cg-button>
        </div>
        <div style="display: flex; margin-top: 20px">
          <cg-switch v-model="state2" :disabled="true" />
          <cg-button small whiteStyle @click="handleCopy('switch_disabled')">复制 禁用状态开关开关</cg-button>
        </div>
      </template>
      <!-- Tab -->
      <template v-else-if="active == 6">
        <div class="cgtab">
          <cg-tab v-model="pageType" :list="pageTypeList" @on-tab="" />
          <cg-button small whiteStyle @click="handleCopy('tab')">复制 tab</cg-button>
        </div>
      </template>
      <!-- Containter -->
      <template v-else-if="active == 7">
        <div class="containter">
          <cg-badge :is-dot="true"></cg-badge>
          <div style="width: 20px">
            <cg-badge :value="10">
              <cg-icon class="pointer icon_hover" width="24" name="i_user_3" />
            </cg-badge>
          </div>

          1、弹窗
          <div class="popup_bg">
            <cg-container padding="0" :is-shadow="false" border="0">
              <cg-container-head>
                <template #center> containerHead </template>
              </cg-container-head>
              弹窗内容
            </cg-container>
            <cg-button small whiteStyle @click="handleCopy('containter')">复制 弹窗Conainter</cg-button>
          </div>
          2、代理报表
          <div class="popup_bgs">
            <cg-container type="table" padding="30"> table 代理报表那一些Conainter </cg-container>
            <cg-button small whiteStyle @click="handleCopy('containter1')">复制 代理报表</cg-button>
          </div>
          2、代理报表
          <div class="popup_bgs">
            <cg-container type="table" padding="30"> table 代理报表那一些Conainter </cg-container>
            <cg-button small whiteStyle @click="handleCopy('containter1')">复制 代理报表</cg-button>
          </div>
          3、登陆页面
          <div class="popup_bgs">
            <cg-container type="login" padding="20">
              Mỗi cá nhân chỉ được đăng ký 1 tài khoản duy nhất, vui lòng không đăng ký lại hoặc
              giúp hội viên cấp dưới đăng ký tài khoản.
            </cg-container>
            <cg-button small whiteStyle @click="handleCopy('containter2')">复制 登陆</cg-button>
          </div>
          4、 默认自己配置
          <div class="popup_bgs">
            <cg-container padding="0,20" border="4" :is-shadow="true" radius="16">
              <cg-container-head radius>
                <template #left> containerHead </template>
              </cg-container-head>
              padding border margin 是否有阴影(默认有)
            </cg-container>
            <cg-button small whiteStyle @click="handleCopy('containter3')">默认</cg-button>
          </div>
          <div class="popup_bgs" style="height: 200px">
            <cg-container> </cg-container>
          </div>
        </div>
      </template>
      <!-- CgContainerHead -->
      <template v-else-if="active == 8">
        <div class="containterhead">
          head 左 中 右
          <cg-container-head height="80" padding="20" bg="">
            <template #left> 左边内容fsdfds </template>
            <template #center> 中边内容 </template>
            <template #right> 右边内容 </template>
          </cg-container-head>
          <cg-button small whiteStyle @click="handleCopy('head')">头部</cg-button>
          <cg-container type="table">
            <template #head>
              <van-row>
                <van-col span="6">
                  <cg-container-head>
                    <template #center>
                      <div>Title1</div>
                    </template>
                  </cg-container-head>
                </van-col>
                <van-col span="6">
                  <cg-container-head>
                    <template #center>
                      <div>Title2</div>
                    </template>
                  </cg-container-head>
                </van-col>
                <van-col span="6">
                  <cg-container-head>
                    <template #center>
                      <div>Title1</div>
                    </template>
                  </cg-container-head>
                </van-col>
                <van-col span="6">
                  <cg-container-head>
                    <template #center>
                      <div>Title2</div>
                    </template>
                  </cg-container-head>
                </van-col>
              </van-row>
            </template>
            <template #content>
              <van-row>
                <van-col span="6"> 123 </van-col>
                <van-col span="6"> 123 </van-col>
                <van-col span="6"> 123 </van-col>
                <van-col span="6"> 123 </van-col>
              </van-row>
            </template>
          </cg-container>
        </div>
      </template>
      <!-- Button -->
      <template v-else-if="active == 9">
        <cg-button mini @click="handleCopy('mini-btn')">迷你按钮</cg-button>
        <cg-button small @click="handleCopy('sm-btn')">小按钮</cg-button>
        <cg-button small whiteStyle @click="handleCopy('sm-w-btn')">小按钮</cg-button>
        <cg-button @click="handleCopy('btn')">普通按钮</cg-button>
        <cg-button whiteStyle @click="handleCopy('w-btn')">白色风格</cg-button>
        <cg-button round @click="handleCopy('r-btn')">圆形按钮</cg-button>
        <cg-button paddingX="6" paddingY="12" customStyle small whiteStyle @click="handleCopy('custom-btn')">
          LẤY MÃ<br />
          XÁC NHẬN
        </cg-button>
      </template>
      <!-- Dialog -->
      <template v-else-if="active == 10">
        <div style="display: flex">
          <cg-button style="margin-right: 10px" small @click="cgDialog(1)">模板1</cg-button>
          <cg-button small whiteStyle @click="handleCopy('dialog1')">复制</cg-button>
        </div>
        <div style="display: flex">
          <cg-button style="margin-right: 10px" small @click="cgDialog(2)">模板2</cg-button>
          <cg-button small whiteStyle @click="handleCopy('dialog2')">复制</cg-button>
        </div>
        <div style="display: flex">
          <cg-button style="margin-right: 10px" small @click="cgDialog(3)">模板3</cg-button>
          <cg-button small whiteStyle @click="handleCopy('dialog3')">复制</cg-button>
        </div>
        <div style="display: flex">
          <cg-button style="margin-right: 10px" small @click="cgDialog(4)">红标题只能在模板1或2中使用</cg-button>
          <cg-button small whiteStyle @click="handleCopy('dialog4')">复制</cg-button>
        </div>
      </template>
      <!-- scroll-bar -->
      <template v-else-if="active === 11">
        <div class="scroll-bar">
          <p>
            用滚动条组件包装内容，默认继承父级高度，可设定固定高度或者最大高度，内容超出时出现滚动条
          </p>
          <p>默认位置是绝对定位在内容区右侧，设定inside以占用内容区。</p>
          <cg-button small whiteStyle @click="handleCopy('scroll-bar')">复制</cg-button>
          <cg-scroll-bar inside>
            <div class="item" v-for="i in 20">{{ i }}</div>
          </cg-scroll-bar>
        </div>
      </template>
      <!-- Progress -->
      <template v-else-if="active == 12">
        <div style="display: flex">
          <div style="width: 100%">
            <CgProgress :rate="50" height="40" position="center"></CgProgress>
          </div>
          <cg-button small whiteStyle @click="handleCopy('progress_style_c')">复制</cg-button>
        </div>
        <div style="display: flex">
          <div style="width: 100%">
            <CgProgress :rate="50" height="40" position="top"></CgProgress>
          </div>
          <cg-button small whiteStyle @click="handleCopy('progress_style_t')">复制</cg-button>
        </div>
        <div style="display: flex">
          <div style="width: 100%">
            <CgProgress :rate="50" height="40" position="bottom"></CgProgress>
          </div>
          <cg-button small whiteStyle @click="handleCopy('progress_style_b')">复制</cg-button>
        </div>
      </template>
      <!-- Refresh -->
      <template v-else-if="active == 13">
        <div style="display: flex">
          <CgRefresh :refreshUrl="'member/balance'" :type="'get'">123
          </CgRefresh>
          <cg-button small whiteStyle @click="handleCopy('Refresh')">复制</cg-button>
        </div>
      </template>
      <!-- Radio -->
      <template v-else-if="active == 14">
        <cg-radio :list="radios" type="exam" v-slot="{ data, index }">
          A. Không được lưu số tài khoản, mã QR và nội dụng chuyển khoản cũ Không được lưu số tài
          khoản, mã QR và nội dụng chuyển khoản cũ
        </cg-radio>
        <cg-radio :list="radios" type="payType"> 123 </cg-radio>
      </template>
      <!-- CgMaintain -->
      <template v-else-if="active == 15">
        <div class="CgMaintain venue1">
          123123
          <CgMaintain type="venue1" />
        </div>
        <div class="CgMaintain venue2">
          123123
          <CgMaintain type="venue2" />
        </div>
        <div class="CgMaintain venue3">
          123123
          <CgMaintain type="venue3" />
        </div>
        <div class="CgMaintain bank">
          123123
          <CgMaintain type="bank" />
        </div>
        <div class="CgMaintain wallet">
          123123
          <CgMaintain type="wallet" />
        </div>
      </template>
      <!-- CgTime -->
      <template v-else-if="active == 16">
        <div style="height: 50px; cursor: pointer; margin-top: 20px" @click="handleCopy('time1')">
          <cg-time :time="1676976689" />
        </div>
        <div style="height: 50px; cursor: pointer" @click="handleCopy('time2')">
          <cg-time :time="1676976689" :formatStr="'-'" :font="'var(--cg-font-text1)'" />
        </div>
        <div style="height: 50px; cursor: pointer" @click="handleCopy('time3')">
          <cg-time :time="1676976629" :color="'var(--cg-color-red)'" :size="'var(--cg-font-46)'" />
        </div>
        <div style="height: 50px; cursor: pointer" @click="handleCopy('time4')">
          <cg-time :time="1676891276" :is-two-line="true" :formatStr="'*'" :color="'var(--cg-color-blue1)'" />
        </div>
      </template>
      <!-- CgItem -->
      <template v-else-if="active == 17">
        <cg-button small whiteStyle @click="handleCopy('cgitem')">复制</cg-button>
        <cg-item v-model="name" :list="flagList" />
      </template>
      <!-- CgForm -->
      <template v-else-if="active == 18">
        <cg-button small whiteStyle @click="handleCopy('cgform')">复制</cg-button>
        <cg-button small whiteStyle @click="handleCopy('cgform1')">复制label配置，点击事件</cg-button>
        <CgForm :options="options" :label-width="180" @submit="submit" />
      </template>
      <!-- CgList -->
      <template v-else-if="active == 19">
        <cg-button small whiteStyle @click="handleCopy('cglist')">复制</cg-button>
        <cg-button small whiteStyle @click="handleCopy('cglist1')">复制相关配置</cg-button>
        <CgList :options="options" :list-api="APIs.getUnderReport" :form-data="{
          ty: 1,
          is_online: 0
        }">
          <template #default="{ data }">
            123
            <CgTable :columns="[
              {
                title: '序号',
                field: 'username'
              },
              {
                title: '姓名',
                field: 'lvl'
              }
            ]" :table-data="data" />
          </template>
        </CgList>
      </template>
      <!-- CgAmount -->
      <template v-if="active == 20">
        <cg-amount :amount="1233000" :segmentation="true" @callBack="() => { }" suffix="K" padding="0"
          :precision="2"></cg-amount>
        <cg-use-amount />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Demo'
};
</script>

<style lang="scss" scoped>
// 维护组件
.CgMaintain {
  background-color: aqua;
  color: #000;
  border: 2px solid #9bd1fd;
  border-radius: 16px;
}

.venue1 {
  width: 574px;
  height: 830px;
}

.venue2 {
  width: 574px;
  height: 412px;
}

.venue3 {
  width: 574px;
  height: 272px;
}

.bank {
  width: 646px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid #61ceff;
}

.wallet {
  width: 332px;
  height: 194px;
}

.scroll-bar {
  width: 600px;
  height: 300px;
  font: var(--cg-font-h3);

  .item {
    width: 100%;
    height: 80px;
    text-align: center;
    background-color: rgb(199, 199, 199);
    margin: 10px 0;
  }
}

.top-head {
  position: fixed;
  width: 100%;
  height: 120px;
  background-color: #fff;
  z-index: 999;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;

  div {
    overflow-x: scroll;
  }
}

.content {
  padding-top: 120px;
}

.demo {
  background-color: #e9e3e3;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .demo_item {
    box-sizing: border-box;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid red;

    &:nth-child(2n + 1) {
      border-right: 1px solid red;
    }

    span {
      font-size: 12px;
      width: 120px;
    }
  }
}

.icon {
  width: 100px;
}

.close {
  padding-left: 20px;
  width: 40px;
}

.field_c {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;

  &>div {
    margin-bottom: 10px;
  }
}

.down {
  margin-right: 24px;
}

.cgtab {
  padding: 40px;
}

.containter {
  padding: 40px;
  font-size: 28px;

  div {
    margin-bottom: 30px;
  }

  .popup_bg {
    padding: 20px;
    background: rgba(0, 0, 0, 0.249);
  }

  .popup_bgs {
    padding: 20px;
    background: rgba(0, 0, 0, 0.249);

    >div {
      padding: 20px;
      background-color: #fff;
    }
  }
}

.containterhead {
  padding: 40px;

  >div {
    margin-bottom: 30px;
  }
}
</style>
