<script setup lang="ts">
import { CgEmpty, CgContainer, CgScrollBar, CgDivider, CgIcon, CgButton, CgSelect, CgContainerHead } from '@/components/cg-template-2';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { getLinkList, memberLinkDelete } from '@/http/blue-apis';
import PersonalTitle from '../components/personal-title/index.vue';
import { useRequest } from 'vue-request';
import Toast from '@/components/cg-template-2/toast';
import { copy } from '@/utils/common';
import { useI18n } from 'vue-i18n';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import Qr from './qr.vue';
import { useLoading } from '@/hooks/useLoading';
import { ref } from 'vue';
const { startLoading, closeLoading } = useLoading();

const Dialog = new CgDialogClass();
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);
const { t } = useI18n();
const linkList: any = ref();
const imgUrl = ref('');
// 获取推广链接列表
const getList = () => {
  startLoading();
  getLinkList()
    .then((res: any) => {
      closeLoading();
      linkList.value = res;
    })
    .catch(() => {
      closeLoading();
    })
    .finally(() => {
      closeLoading();
    });
};
getList();
const copyLink = (link: string) => {
  copy(link);
  Toast(t('depositInfo.copySuccess'));
};
// 复制code
const copyCode = (item: string) => {
  copy(item);
  Toast(t('depositInfo.copySuccess'));
};
//显示二维码
const showQR = (url: string) => {
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
      onDel();
    }
  });
  ida = id;
};
//删除推广链接
const onDel = () => {
  memberLinkDelete({ id: ida }).then((res: any) => {
    if (res) {
      Toast(t('del_suc'));
      setTimeout(() => {
        getList();
        closeLoading();
      }, 1000);
    }
  });
};
</script>
<template>
  <div class="personal_link">
    <personal-title title="ĐẠI LÝ MARKETING" />
    <cg-empty bth-text="Đặt cược ngay" :margin-top="30" v-if="linkList == null">
      <template #buttonText>
        <cg-button :width="300" :height="50" @click="$router.push('/personal/link/add')"> THÊM LINK</cg-button>
      </template>
    </cg-empty>
    <div v-if="linkList != null">
      <div class="list_scroll">
        <cg-scroll-bar max-height="690" scrollBarHeight="99">
          <div class="link_conaitner" v-for="(item, index) in linkList" :key="index">
            <CgContainer type="smallContainer" radius="12">
              <template #content>
                <div class="links">
                  <div class="links-items flex">
                    <div class="link-left">
                      <p class="link-p">TỶ LỆ HOÀN TRẢ</p>
                      <div class="flex">
                        <div class="link-flexs">
                          <div class="flex">
                            <div class="fs">Casino</div>
                            <div class="link-color">{{ item.zr }}%</div>
                          </div>
                          <div class="flex">
                            <div class="fs">Nổ Hũ</div>
                            <div class="link-color">{{ item.dz }}%</div>
                          </div>
                          <div class="flex">
                            <div class="fs">Đá Gà</div>
                            <div class="link-color">{{ item.fc }}%</div>
                          </div>
                        </div>
                        <div class="link-flexs">
                          <div class="flex">
                            <div class="fs">Thể Thao</div>
                            <div class="link-color">{{ item.ty }}%</div>
                          </div>
                          <div class="flex">
                            <div class="fs">Game Bài</div>
                            <div class="link-color">{{ item.qp }}%</div>
                          </div>
                          <div class="flex">
                            <div class="fs">E-Sports</div>
                            <div class="link-color">{{ item.dj }}%</div>
                          </div>
                        </div>
                        <div class="link-flexs">
                          <div class="flex">
                            <div class="fs">Lô Đề</div>
                            <div class="link-color">{{ item.cp }}%</div>
                          </div>
                          <div class="flex">
                            <div class="fs">Bắn Cá</div>
                            <div class="link-color">{{ item.by }}%</div>
                          </div>
                          <div class="flex">
                            <div class="fs">Mini Game</div>
                            <div class="link-color">{{ item.mn }}%</div>
                          </div>
                        </div>
                      </div>
                      <cg-divider color="--cg-color-blue8" />
                      <div class="flex ai-c jc-sb second-link">
                        <div class="link-p">TỶ LỆ HOA HỒNG</div>
                        <div class="fs">Lô Đề Truyền Thống</div>
                        <div class="link-color">{{ item.cg_official_rebate }}</div>
                        <div class="fs">Lô Đề Nhanh</div>
                        <div class="link-color">{{ item.cg_high_rebate }}</div>
                      </div>
                      <cg-divider color="--cg-color-blue8" />
                      <div class="link-left-bottom flex ai-c">
                        <div class="fs">Link Độc Quyền</div>
                        <div class="fs">{{ item.short_url }}</div>
                      </div>
                    </div>
                    <cg-divider direction="vertical" color="--cg-color-blue8" />
                    <div class="link-right flex fdr-c jc-sb">
                      <div class="flex ai-c h_flex" @click="copyCode(item.code)">
                        <cg-icon name="i_copy" width="30" height="30" />
                        <span class="link-color">Mã Giới Thiệu</span>
                      </div>
                      <div class="flex ai-c h_flex" @click="copyLink(item.short_url)">
                        <cg-icon name="i_copy" width="30" height="30" />
                        <span class="link-color">Link Giới Thiệu</span>
                      </div>

                      <div class="flex ai-c h_flex" @click="showQR(item.short_url)">
                        <cg-icon name="i_ewm" width="30" height="30" />
                        <span class="link-color">QR</span>
                      </div>
                      <div class="flex ai-c h_flex" v-if="userInfo.link_black_list !== 1" @click="deleteLink(item.id)">
                        <cg-icon name="i_del" width="30" height="30" />
                        <span class="link-color">Xóa Bỏ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </CgContainer>
          </div>
        </cg-scroll-bar>
      </div>
      <div class="btn_c flex-middle">
        <cg-button width="300" v-if="userInfo.link_black_list !== 1" @click="$router.push('/personal/link/add')"> THÊM LINK</cg-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Link'
};
</script>

<style lang="scss" scoped>
.personal_link {
  .links-items {
    height: 230px;
  }

  :deep(.cg-scroll-bar) {
    margin-bottom: 14px;
  }

  .link_conaitner {
    margin-bottom: 16px;
  }

  .link {
    margin-top: 24px;
  }

  .link-left {
    width: 702px;
    padding: 18px;

    .link-p {
      color: var(--cg-color-grey1);
      font: var(--cg-font-text1);
    }

    > div:nth-of-type(1) {
      padding-bottom: 10px;
    }

    .link-flexs {
      margin-top: 10px;
      flex: 1;

      .flex {
        font: var(--cg-font-text);
        color: var(--cg-color-grey1);
        flex-direction: row;
        justify-content: space-between;
        margin-right: 35px;
        margin-bottom: 5px;
      }
    }

    .link-flexs:last-child {
      .flex {
        margin-right: 0;
      }
    }
  }

  .link-color {
    color: var(--cg-color-blue12);
    font: var(--cg-font-text1);
  }

  .link-left-bottom {
    margin-top: 10px;
    font-size: 13px;

    // .operate {
    //   padding-left: 12px;
    //   width: 185px;
    //   justify-content: space-between;
    // }

    > div:nth-of-type(1) {
      flex: 1;
    }

    > div:nth-of-type(2) {
      // width: 552px;
      width: 546px;
      line-height: 38px;
      padding-left: 15px;
      padding-right: 20px;
      border: 1px solid var(--cg-color-blue8);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: var(--cg-border-input-radius);
    }
  }

  .fs {
    font: var(--cg-font-text);
    color: var(--cg-color-grey1);
  }

  .second-link {
    margin: 10px 0;
  }

  .link-right {
    padding-left: 15px;
    padding-top: 22px;
    padding-bottom: 43px;

    .h_flex {
      height: 26px;
      line-height: 26px;
      cursor: pointer;

      .link-color {
        margin-left: 10px;
        font: var(--cg-font-text);
      }

      &:hover {
        .link-color {
          color: var(--cg-color-grey1);
        }

        :deep(.cg_icon) {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
