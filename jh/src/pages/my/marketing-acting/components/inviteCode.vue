<script lang="ts" setup>
import dayjs from 'dayjs'
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'
import download from 'downloadjs'
// component
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import bgSrc2 from '~/assets/images/noData/trade.png?preset=full'

const customizePullDownUp: any = ref(null)
const saveTimer: any = ref(null)

const list: any = ref([])
const record: any = ref({})
const selectPopVisivle = ref(false)
const rebateVisivle = ref(false)
const inviteVisivle = ref(false)
const showEmergency = ref(false)
const init = (resolve: any = undefined, type: any = undefined) => {
  getMemberLinkListRequest().then((res: any) => {
    if (res.status) {
      list.value = res.data ?? []
      resolve && resolve({ noPass: false })
    }
    else {
      resolve && resolve({ noPass: true })
    }
  }).catch(() => {
    resolve && resolve({ noPass: true })
  })
}

const onSearch = () => {
  customizePullDownUp.value.down()
}

const onConfirm = () => {
  showEmergency.value = true
  selectPopVisivle.value = false
}
const onDelete = () => {
  deleteMemberLinkRequest({
    id: record.value.id,
  }).then((res: any) => {
    if (res.status)
      onSearch()
  }).finally(() => {
    showEmergency.value = false
  })
}

const onSelectPop = (item: any) => {
  record.value = { ...record.value, ...item }
  selectPopVisivle.value = true
}

const onTouchend = () => {
  clearTimeout(saveTimer.value)
  saveTimer.value = null
}

const onSave = () => {
  const img = document.getElementById('qrcodeVueRef') as HTMLImageElement
  html2canvas(img, { allowTaint: true, useCORS: true, scale: 1 }).then((canvas) => {
    canvas.toBlob((blob) => {
      if (blob !== null) {
        download(blob, 'share.png', 'image/png')
        inviteVisivle.value = false
        onTouchend()
      }
    })
  })
}

const onTouchstart = () => {
  saveTimer.value = setTimeout(() => {
    onSave()
  }, 800)
}
</script>

<template>
  <div class="tradeFineWarp">
    <div class="dataContentWarp">
      <CustomizePullDownUp
        ref="customizePullDownUp" :pull-up="false" :list="list" :first-down-load="true"
        no-data-tip="还没有新的邀请码" :no-data-img="bgSrc2" @init="init"
      >
        <template #bSContent>
          <ol class="dataContent">
            <li>
              <div class="li">
                <p>邀请码</p>
                <p>生成时间</p>
                <p>状态</p>
              </div>
            </li>
            <li v-for="(item, index) in list" :key="index">
              <div class="li" @click="onSelectPop(item)">
                <p class="account">
                  {{ item.short_code }}
                </p>
                <p>{{ dayjs(item.created_at * 1000 ? +item.created_at * 1000 : 0).format('YYYY-MM-DD HH:mm:ss') }}</p>
                <p>注册{{ item.reg_count }}</p>
              </div>
            </li>
          </ol>
        </template>
      </CustomizePullDownUp>
    </div>

    <van-popup v-model:show="selectPopVisivle" position="bottom">
      <div class="popContent">
        <ul>
          <li @click="handleCopy(`${record.short_code}`); selectPopVisivle = false">
            复制邀请码
          </li>
          <li @click="rebateVisivle = true; selectPopVisivle = false">
            返水比例
          </li>
          <li @click="onConfirm()">
            删除邀请码
          </li>
        </ul>
        <div class="cancelBut" @click="selectPopVisivle = false">
          取消
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="rebateVisivle" position="bottom">
      <div class="popContent">
        <div class="popTitle">
          <p>
            返水比例
          </p>
        </div>
        <div class="popCenter">
          <ul>
            <li class="flex jc-sb ret_list">
              <div>真人</div>
              <div>{{ record.zr }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>体育</div>
              <div>{{ record.ty }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>棋牌</div>
              <div>{{ record.qp }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>电子</div>
              <div>{{ record.dz }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>捕鱼</div>
              <div>{{ record.by }}%</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>电竞</div>
              <div>{{ record.dj }}%</div>
            </li>
          </ul>
          <div class="bar" />
          <ul>
            <li class="flex jc-sb ret_list">
              <div>快3</div>
              <div>{{ record.k3 }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>PK10</div>
              <div>{{ record.pk10 }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>时时彩</div>
              <div>{{ record.ssc }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>六合彩</div>
              <div>{{ record.lhc }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>11选5</div>
              <div>{{ record.ll5 }}</div>
            </li>
            <li class="flex jc-sb ret_list">
              <div>幸运28</div>
              <div>{{ record.luck28 }}</div>
            </li>
          </ul>
        </div>
        <div class="cancelBut" @click="rebateVisivle = false">
          取消
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="inviteVisivle" position="bottom">
      <div class="popContent">
        <ul>
          <li>
            <div class="qrcodeWarp">
              <div class="qrcodeMain">
                <QrcodeVue
                  id="qrcodeVueRef" :value="`${record.short_url}${record.short_code}`" :size="200"
                  @touchstart.prevent="onTouchstart" @touchend.prevent="onTouchend"
                />
              </div>
              <p class="qrcodeTip">
                长按保存二维码
              </p>
              <p class="qrcodeSrc">
                {{ record.short_url }}<span>{{ record.short_code }}</span>
              </p>
            </div>
          </li>
          <li @click="handleCopy(`${record.short_url}${record.short_code}`); inviteVisivle = false">
            复制推广链接
          </li>
          <li @click="handleCopy(`${record.short_code}`); inviteVisivle = false">
            复制邀请码
          </li>
        </ul>
        <div class="cancelBut" @click="inviteVisivle = false">
          取消
        </div>
      </div>
    </van-popup>
  </div>
  <!-- 二次确认弹窗 -->
  <cgDialog
    v-model="showEmergency" title="温馨提示" content="如删除该邀请码，则之后无法通过该邀请码注册新用户，请您确认是否删除？" :is-cancel="true"
    :is-confirm="true" @ok="onDelete()"
  />
</template>

<style lang="scss" scoped>
.tradeFineWarp {
  width: 100%;
  height: 100%;
  background: #F5F5F9;

  .dataContentWarp {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .dataContent {
    width: 100%;

    li {
      width: 100%;
      padding: 0 12px;
      background: #fff;

      .li {
        width: 100%;
        min-height: 40px;
        display: flex;
        border-bottom: 1px solid #F1F1F1;
        justify-content: space-between;
        align-items: center;
        line-height: 15px;
        font-size: 11px;
        text-align: center;
        color: #535353;

        p {
          width: 100%;
        }
      }

      &:last-child {
        .li {
          border-bottom: none;
        }
      }

      &:first-child {
        .li {
          min-height: 46px;
          color: #000000;
          font-size: 12px;
        }
      }
    }
  }
}

.popContent {
  text-align: center;
  font-family: PingFangSC-Regular, PingFang SC;

  .popTitle {
    width: 100%;
    padding: 0 8px;

    p {
      width: 100%;
      min-height: 45px;
      line-height: 45px;
      font-weight: 400;
      color: #000000;
      line-height: 45px;
      border-bottom: 1px solid #F3F3F3;
    }
  }

  .popCenter {
    width: 100%;
    max-height: 410px;
    overflow-y: auto;
  }

  .bar {
    width: 100%;
    height: 10px;
    background: #F8F8F7;
  }

  ul {
    padding: 0 8px;

    li {
      min-height: 45px;
      line-height: 45px;
      font-weight: 400;
      color: #000000;
      line-height: 45px;
      border-bottom: 1px solid #F3F3F3;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .qrcodeWarp {
    width: 100%;
    padding: 31px 0 9px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .qrcodeMain {
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .qrcodeTip {
      font-size: 10px;
      color: #919191;
      line-height: 14px;
      height: 14px;
      margin-top: 10px;
    }

    .qrcodeSrc {
      min-height: 16px;
      color: #6E6E6E;
      line-height: 16px;
      margin-top: 11px;

      span {
        color: #597EF7;
      }
    }
  }

  .cancelBut {
    font-weight: 400;
    color: #000000;
    line-height: 50px;
    border-top: 5px solid #F8F8F7;
  }

  .ret_list {
    padding: 0 22px;
  }
}

:deep(.wrapper) {
  padding-bottom: 10px;
  .body{
    padding: 30px 11px;
  line-height: 21px;
  font-size: 12px;
  }

}
</style>
