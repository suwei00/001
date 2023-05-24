<script setup lang='ts'>
import { CgHeader, CgContainer, CgButton, CgDivider, CgIcon, CgEmpty } from '@/components/cg-template-2';
import { getLinkList, memberLinkDelete } from '@/http/blue-apis';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
import { onMounted, ref } from 'vue';
import { copy } from '@/utils/common';
import { Toast } from 'vant';
import Qr from './qr.vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { useLoading } from '@/hooks/useLoading';
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);
const { t } = useI18n();
const Dialog = new CgDialogClass()
const imgUrl = ref('');
const linkList: any = ref();

// 获取推广链接列表
const getList = () => {
  getLinkList().then((res: any) => {
    linkList.value = res;
  })
}
onMounted(() => {
  getList();
})

const copyLink = (item: any) => {
  copy(item.short_url);
  Toast(t('depositInfo.copySuccess'));
};
// 复制code
const copyCode= (item: any) => {
  copy(item.code);
  Toast(t('depositInfo.copySuccess'));
};
// 显示二维码
const showQR = (url: any) => {
  imgUrl.value = url;
  Dialog.showDialog({
    template: 'tmp3',
    customComponent: Qr,
    props: {
      url: url,
      closeDialog: () => Dialog.closeDialog()
    }
  });
};
// 删除弹窗
let ida = '';
const deleteLink = (id: string) => {
  Dialog.showDialog({
    template: 'tmp1',
    title: 'LƯU Ý',
    tmp1Content: 'Xác Nhận Xoá Hay Không?',
    onOk: () => {
      onDel()
    },
  });
  ida = id;
};
// 删除推广链接
const onDel = () => {
  memberLinkDelete({ id: ida }).then((res: any) => {
    if (res) {
      getList();
    }
  });
};
</script>
<template>
  <div class='cg_link'>
    <CgHeader>
      ĐẠI LÝ MARKETING
    </CgHeader>
    <cg-empty bth-text="Đặt cược ngay" :margin-top="30" v-if="linkList == null">
      <template #buttonText>
        <cg-button :width="686" :height="88" @click="$router.push('/link/add')"> THÊM LINK</cg-button>
      </template>
    </cg-empty>
    <div class="link_scroll">
      <div class="link_conaitner" v-for="(item, index) in linkList" :key="index">
        <CgContainer padding="18">
          <div class="pos-r list-wp">
            <div class="member-table deep-color-container">
              <div class="title1">TỶ LỆ HOÀN TRẢ</div>
              <div class="flex  top-flex">
                <ul class="rate-wp rate-item flex1 right-br">
                  <li class="flex ai-c jc-sb">
                    <span class="label">Casino</span>
                    <span class="value">{{ item.zr }}%</span>
                  </li>
                  <li class="flex ai-c jc-sb">
                    <span class="label">Thể Thao</span>
                    <span class="value">{{ item.ty }}%</span>
                  </li>
                  <li class="flex ai-c jc-sb">
                    <span class="label">Lô Đề</span>
                    <span class="value">{{ item.cp }}%</span>
                  </li>
                  <li class="flex ai-c jc-sb">
                    <span class="label">Nổ Hũ</span>
                    <span class="value">{{ item.dz }}%</span>
                  </li>
                  <li class="flex ai-c jc-sb">
                    <span class="label">Game Bài</span>
                    <span class="value">{{ item.qp }}%</span>
                  </li>
                </ul>
                <ul class="rate-wp rate-item flex1 mar_r">
                  <li class="flex ai-c jc-sb">
                    <span class="label">Bắn Cá</span>
                    <span class="value">{{ item.by }}%</span>
                  </li>
                  <li class="flex ai-c jc-sb">
                    <span class="label">Đá Gà</span>
                    <span class="value">{{ item.fc }}%</span>
                  </li>
                  <li class="flex ai-c jc-sb">
                    <span class="label">E-Sports</span>
                    <span class="value">{{ item.dj }}%</span>
                  </li>
                  <li class="flex ai-c jc-sb">
                    <span class="label">Mini Game</span>
                    <span class="value">{{ item.mn }}%</span>
                  </li>
                </ul>
              </div>
              <cg-divider color="var(--cg-color-blue11)" />
              <div class="title2">TỶ LỆ HOA HỒNG</div>
              <ul class="o-rate-wp flex ai-c jc-sb">
                <li class="rate-item flex  ai-c jc-sb flex1">
                  <span class="label">Lô Đề Truyền<br> Thống</span>
                  <span class="value">{{ item.cg_official_rebate }}</span>
                </li>
                <li class="rate-item flex  ai-c jc-sb flex1 ">
                  <span class="label">Lô Đề Nhanh</span>
                  <span class="value">{{ item.cg_high_rebate }}</span>
                </li>
              </ul>
              <cg-divider color="var(--cg-color-blue11)" />

              <div class="link-item">
                <div class="link-label">Link Độc Quyền</div>
                <div class="link">{{ item.short_url }}</div>
              </div>
              <div class="flex ai-c jc-sb btn-wp">
                <div class="flex ai-c h_flex" @click="copyCode(item)">
                  <cg-icon name="i_link_copy" width="60" height="60" />
                  <span class="link-color"> Mã Giới <br>Thiệu</span>
                </div>
                <div class="flex ai-c h_flex" @click="copyLink(item)">
                  <cg-icon name="i_link_copy" width="60" height="60" />
                  <span class="link-color">Link Giới <br>Thiệu</span>
                </div>
                <div class="flex ai-c h_flex" @click="showQR(item.short_url)">
                  <cg-icon name="i_qr" width="60" />
                  <span class="link-color">QR</span>
                </div>
                <div class="flex ai-c h_flex" v-if="userInfo.link_black_list !== 1" @click="deleteLink(item.id)">
                  <cg-icon name="i_del" width="60" />
                  <span class="link-color">Xóa Bỏ</span>
                </div>
              </div>
            </div>
          </div>
        </CgContainer>
      </div>
    </div>
    <div class="btn_c flex-middle " v-if="linkList != null">
      <cg-button width="686" @click="$router.push('/link/add')"> THÊM LINK</cg-button>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'Link'
}


function t(arg0: string): string | import("vant").ToastOptions | undefined {
  throw new Error('Function not implemented.');
}
</script>

<style lang='scss' scoped>
.link_conaitner {
  margin-bottom: 24px;
}

.link_scroll {
  padding-bottom: 180px;
}

.cg_link {
  padding: 24px 30px;
  height: 100%;

  .list-wp {
    overflow-y: scroll;
  }

  .top-flex {
    // padding: 17px 0 0 0;
  }

  .title1,
  .title2 {
    font: var(--cg-font-text8);
    color: var(--cg-color-black1);
  }

  .title2 {
    margin: 20px 0;
  }

  .right-br {
    border-right: 1px solid var(--cg-color-blue11);
    padding: 0 20px 0 0;
  }

  .mar_r {
    padding: 0 0 0 20px;
  }

  .o-rate-wp {
    margin: 20px 0;

    li {
      &:first-child {
        padding: 0 20px 0 0;

      }

      &:last-child {
        padding: 0 0 0 20px;
      }
    }
  }

  .rate-wp {
    margin: 10px 0;

    li {
      padding: 8px 0;
    }
  }

  .label {
    font: var(--cg-font-text2);
    color: var(--cg-color-black1);
    line-height: 30px;
  }

  .value {
    color: var(--cg-color-blue1);
    font: var(--cg-font-text2);
  }


  .link-item {
    .link-label {
      text-transform: capitalize;
      font: var(--cg-font-text3);
      color: var(--cg-color-black1);
      margin: 20px 0;
    }

    .link {
      height: 80px;
      line-height: 80px;
      border-radius: var(--cg-border-radius);
      background: var(--cg-gradient-input-blue);
      box-shadow: var(--cg-link-shadow);
      word-break: break-all;
      color: var(--cg-color-black1);
      padding: 25px 36px;
      font: var(--cg-font-text7);

    }
  }

  .btn-wp {
    margin: 20px 0 0 0;
      gap: 10px;
    .h_flex {
      // margin-right: 45px;
   
    }

    .link-color {
      color: var(--cg-color-blue1);
      font: var(--cg-font-text3);
      margin-left: 10px;

    }
  }

  .btn_c {
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    width: 100%;
    background-color: var(--cg-color-blue16);

    >button {
      margin-bottom: 80px;
    }
  }
}
</style>