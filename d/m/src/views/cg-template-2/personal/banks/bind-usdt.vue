<script lang="ts" setup>
import { ref, reactive, Component, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { CgInput, CgButton, CgIcon } from '@/components/cg-template-2';
import Toast from '@/components/cg-template-2/toast';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import DialogCode from '../user-info/dialog-code.vue';
import { userInfoStateStore } from '@/store-pinia/userInfo';

const userInfoStore = userInfoStateStore();
const { usdtCardList } = storeToRefs(userInfoStore);

const Dialog = new CgDialogClass();

const formdata = ref({
  bindname: '',
  protocol: 'TRC20',
  address: ''
});

const checkBindname = (rule: any, value: any, callback: any) => {
  const v = value !== undefined && value.trim() !== '';
  if (!v) {
    callback(new Error('Vui lòng nhập biệt danh USDT'));
  } else {
    callback();
  }
};

const rules = reactive({
  bindname: [{ message: 'dlasfjdls', trigger: 'blur', validator: checkBindname }]
});

const bindUsdt = () => {
  if (!formdata.value.bindname) {
    Toast('Vui lòng nhập biệt danh USDT');
    return;
  }
  if (!formdata.value.address) {
    Toast('Vui lòng nhập địa chỉ USDT');
    return;
  }
  showEditDialog('SỐ ĐIỆN THOẠI XÁC NHẬN', DialogCode);
};

const showEditDialog = (title: string, comp: Component) => {
  Dialog.showDialog({
    title: title,
    template: 'tmp2',
    showClose: true,
    btns: 0,
    customComponent: comp,
    props: { close: () => Dialog.closeDialog(), data: formdata.value }
  });
};
</script>

<template>
  <div class="bind-usdt">
    <section class="no-bind">
      <div class="inner">
        <div class="left">
          <div class="empty-usdt" :class="{ 'has-card': usdtCardList && usdtCardList.length }">
            <template v-if="usdtCardList && usdtCardList.length">
              <div v-for="card in usdtCardList" class="usdt-card">
                <div class="bindname">{{ card.bindname }}</div>
                <div class="protocol">{{ card.protocol }}</div>
                <div class="address">{{ card.address }}</div>
              </div>
            </template>
            <app-image v-else src="/personal/usdt_bind.png" width="140" />
          </div>
        </div>
        <div class="right">
          <el-form :model="formdata" ref="formref" label-width="165px" label-position="left">
            <el-form-item label="Biệt Danh Địa Chỉ" prop="bindname">
              <cg-input v-model="formdata.bindname" class="input-box" :disabled="usdtCardList && usdtCardList.length > 0" placeholder="Vui lòng nhập biệt danh USDT" />
            </el-form-item>
            <el-form-item label="Giao Thức USDT" prop="protocol">
              <cg-input v-model="formdata.protocol" class="input-box" disabled placeholder="Vui lòng nhập địa chỉ Email của bạn" />
            </el-form-item>
            <el-form-item label="Địa Chỉ USDT" prop="address">
              <cg-input v-model="formdata.address" class="input-box" :disabled="usdtCardList && usdtCardList.length > 0" placeholder="Vui lòng nhập địa chỉ USDT" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-if="!usdtCardList || usdtCardList.length === 0" class="flex-middle add-bank-btn">
        <cg-button width="300" class="flex-middle" @click="bindUsdt">
          <cg-icon width="18" name="i_jia" class="icon_ji"></cg-icon>
          Thêm Địa Chỉ USDT
        </cg-button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BindUsdt'
};
</script>

<style lang="scss" scoped>
.bind-usdt {
  .no-bind {
    .inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      .left {
        padding-right: 24px;
        .empty-usdt {
          width: 300px;
          height: 140px;
          background: url(link($base-img-dir + '/personal/usdt_bind_bg.png')) no-repeat;
          background-size: 100% 100%;
          text-align: center;
          img {
            max-height: 100%;
            vertical-align: top;
          }
          &.has-card {
            padding: 10px;
            .usdt-card {
              width: 100%;
              height: 100%;
              background: url(link($base-img-dir + '/personal/usdt_card.png')) no-repeat;
              background-size: 100% 100%;
              color: var(--cg-color-white);
              text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
              line-height: 17px;
              text-align: left;
              padding-left: 20px;
              padding-top: 10px;
              .bindname {
                font: var(--cg-font-text5);
                padding-bottom: 54px;
              }
              .protocol,
              .address {
                font: var(--cg-font-text8);
              }
              .address {
                padding-top: 0px;
              }
            }
          }
        }
      }
      .right {
        flex: 1;
        form {
          height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
}
.add-bank-btn {
  padding-top: 30px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
  }
}
</style>
