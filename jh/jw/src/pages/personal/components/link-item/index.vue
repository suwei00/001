<script setup lang='ts'>
import Clipboard from 'clipboard'
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'
import { ElMessage } from 'element-plus'

const { linkData } = defineProps<{ linkData?: any }>()
const emit = defineEmits(['updateList'])
const data = reactive<{ [text: string]: string }>({
  zr: '',
  dz: '',
  qp: '',
  ty: '',
  by: '',
  dj: '',
  k3: '',
  lhc: '',
  pk10: '',
  ssc: '',
  luck28: '',
  ll5: '',
  short_url: '',
  short_code: '',
  id: '',
})
if (linkData) {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key))
      data[key] = linkData[key]
  }
}
// 推广链接
const sponsoredLink = computed(() => data.short_url + data.short_code)

// 复制
function copy() {
  const clipboard = new Clipboard('.copy-code-button') // 这里可以理解为选择器，选择上面的复制按钮
  clipboard.on('success', () => {
    // 释放内存
    ElMessage.success('复制成功！')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    // 释放内存
    ElMessage.error('复制失败！')
    clipboard.destroy()
  })
}

// 删除
const deleteRef = ref()
const openDialog = () => {
  deleteRef.value.open()
}
const { run: runDeleteLink } = useRequest(
  () => deleteMemberLink({ id: data.id }),
  {
    manual: true,
    onSuccess() {
      ElMessage.success('删除成功！')
      emit('updateList')
    },
  },
)

// 二维码
const showQrcode = ref(false)
function toSave() {
  // 保存二维码到本地
  const container = document.getElementById('qrCodenew')
  if (container) {
    html2canvas(container).then((canvas) => {
      const saveUrl = canvas.toDataURL('image/png')
      const aLink = document.createElement('a')
      const blob = base64ToBlob(saveUrl)
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)
      aLink.download = '二维码.jpg'
      aLink.href = URL.createObjectURL(blob)
      aLink.click()
      if (aLink.href)
        ElMessage.success('保存成功')
    })
  }
}
function base64ToBlob(dataurl: string) {
  // 转换二维码格式用于复制
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--)
    u8arr[n] = bstr.charCodeAt(n)

  return new Blob([u8arr], { type: mime })
}
</script>

<template>
  <div class="wrapper">
    <div class="detail">
      <div class="detail-i border-b">
        <h5>返水比例</h5>
        <ul>
          <li><label>真人</label><span>{{ data.zr }}%</span></li>
          <li><label>体育</label><span>{{ data.ty }}%</span></li>
          <li><label>棋牌</label><span>{{ data.qp }}%</span></li>
          <li><label>电子</label><span>{{ data.dz }}%</span></li>
          <li><label>捕鱼</label><span>{{ data.by }}%</span></li>
          <li><label>电竞</label><span>{{ data.dj }}%</span></li>
        </ul>
      </div>
      <div class="detail-i">
        <h5>彩票返点</h5>
        <ul>
          <li><label>快3</label><span>{{ data.k3 }}</span></li>
          <li><label>PK10</label><span>{{ data.pk10 }}</span></li>
          <li><label>时时彩</label><span>{{ data.ssc }}</span></li>
          <li><label>六合彩</label><span>{{ data.lhc }}</span></li>
          <li><label>11选5</label><span>{{ data.ll5 }}</span></li>
          <li><label>幸运28</label><span>{{ data.luck28 }}</span></li>
        </ul>
      </div>
      <div class="d-link">
        <label>邀请码</label>
        <span>{{ data.short_code }}</span>
        <div class="actions">
          <button class="copy-code-button" :data-clipboard-text="data.short_code" @click="copy">
            复制邀请码
          </button>
          <!-- <button class="copy-code-button" :data-clipboard-text="sponsoredLink" @click="copy">
                复制推广链接
              </button>
              <button @click="showQrcode = true">
                二维码
              </button> -->
          <button @click="openDialog">
            删除
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showQrcode" class="mask">
    <div class="modal">
      <div class="title" mb-34px>
        <h6>二维码</h6>
        <div class="close" @click="showQrcode = false">
          <img src="@icons/personal/finance/close-icon.svg" alt="">
        </div>
      </div>
      <div class="qrcode-wrapper">
        <QrcodeVue id="qrCodenew" :value="sponsoredLink" :size="230" />
      </div>
      <button @click="toSave">
        下载
      </button>
    </div>
  </div>

  <dialog-delete-link ref="deleteRef" @confirm="runDeleteLink" />
</template>

<style lang='scss' scoped>
.wrapper {
  width: 1000px;
  height: 235px;
  background: linear-gradient(136deg, #FFFFFF 0%, #FAFCFE 79%, #F5FAFD 83%, #F4F9FC 100%);
  box-shadow: 0px 10px 10px 1px rgba(208, 217, 225, 0.22);
  border-radius: 6px;
  border: 1px solid #DFEAF6;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px 0 19px;

  .detail {
    width: 100%;

    .detail-i {
      text-align: left;
      padding-bottom: 16px;
      margin-bottom: 14px;

      h5 {
        font-size: 15px;
        font-family: $jl-font;
        font-weight: 600;
        margin-bottom: 10px;
      }

      ul {
        display: flex;

        li {
          width: 160px;

          label {
            font-family: $jl-font;
            font-weight: 600;
            margin-right: 28px;
          }
        }

      }

      &:nth-of-type(2) {
        margin-bottom: 7px;
      }
    }

    .border-b {
      border-bottom: 1px solid #EBEBEB;

    }

    .d-link {
      display: flex;
      align-items: center;
      font-size: 15px;

      label {
        width: 77px;
        text-align: left;
        font-family: $jl-font;
        font-weight: 400;
      }

      span {
        width: 610px;
        border: 1px solid #C5C5C5;
        height: 42px;
        line-height: 42px;
        text-align: left;
        border-radius: 6px;
        padding-left: 14px;
      }

      .actions {
        display: flex;

        button {
          width: 120px;
          height: 42px;
          border: 1px solid #597EF7;
          color: #597EF7;
          border-radius: 6px;
          margin-left: 12px;
          &:hover{
            border: 1px solid #3557DC;
            color: #3557DC;
          }
        }
      }
    }
  }

}

.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 0%, 0.3);
  z-index: 2000;
  color: #333;

  .modal {
    width: 550px;
    height: 558px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
    padding: 51px 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
      display: flex;
      justify-content: space-between;

      h6 {
        font-size: 18px;
        font-family: $jl-font;
        font-weight: 600;
      }

      .close {
        padding: 5px;
        cursor: pointer;
      }
    }

    .qrcode-wrapper {
      margin: 0 auto 50px;
      padding: 12px;
      width: 254px;
      height: 254px;
      background: linear-gradient(136deg, #FFFFFF 0%, #FAFCFE 79%, #F5FAFD 83%, #F4F9FC 100%);
      box-shadow: 0px 10px 10px 1px rgba(208, 217, 225, 0.22);
      border-radius: 6px 6px 6px 6px;
      border: 1px solid #DFEAF6;
    }

    button {
      width: 410px;
      height: 50px;
      background: #597EF7;
      color: #fff;
      border-radius: 6px;
      font-size: 18px;
    }
  }
}
</style>
