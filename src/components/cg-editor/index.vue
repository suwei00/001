<!-- eslint-disable no-cond-assign -->
<script setup lang='ts'>
// import { RecycleScroller } from 'vue-virtual-scroller'
const props = defineProps<{ modelValue: string; memberList: Array<any>; height: number; isGroup: string; placeholder: string; sonClass: string }>()
const emit = defineEmits(['update:modelValue', 'change'])
const popupShow = ref(false)

const CGEditorRef = ref()

const Height = ref()
const chatState = chatStateStore()
const { isManage, aite_user } = storeToRefs(chatState)
const { username } = storeToRefs(useUserStore())

const retrieval = ref()
const oldInnerText = ref()
const xorText = ref()

const keepLastIndex = (obj: any) => {
  if (window.getSelection) { // ie11 10 9 ff safari
    obj.focus() // 解决ff不获取焦点无法定位问题
    const range: any = window.getSelection() // 创建range
    range.selectAllChildren(obj) // range 选择obj下所有子内容
    range.collapseToEnd() // 光标移至最后
  }
  else if (document.selection) { // ie10 9 8 7 6 5
    const range = document.selection.createRange() // 创建选择对象
    // var range = document.body.createTextRange();
    range.moveToElementText(obj) // range定位到obj
    range.collapse(false) // 光标移至最后
    range.select()
  }
}

const viewMemberList = computed(() =>
  props.memberList.filter(it => it.nick_name?.includes(xorText.value) && it.nick_name !== username.value),
)

watch(() => props.modelValue, (newVal) => {
  CGEditorRef.value.innerHTML = newVal
})
const changeInput = () => {
  setTimeout(() => {
    popupShow.value = false
  }, 200)
  emit('update:modelValue', CGEditorRef.value.innerHTML)
}

const isPopUp = () => {
  if (oldInnerText.value?.length && CGEditorRef.value?.innerText?.length)
    xorText.value = cgXor(oldInnerText.value.split(''), CGEditorRef.value.innerText.split(''))
}

const reviseInnerHTML = () => {
  if (props.isGroup) {
    if (CGEditorRef.value.innerHTML.endsWith('@')) {
      popupShow.value = true
      Height.value = props.height + CGEditorRef?.value?.offsetHeight
      retrieval.value = CGEditorRef.value.innerHTML
      oldInnerText.value = CGEditorRef.value.innerText
    }

    if (!CGEditorRef.value.innerText || !CGEditorRef.value.innerText.includes('@')) {
      retrieval.value = ''
      oldInnerText.value = ''
      xorText.value = ''
      popupShow.value = false
    }
    isPopUp()
  }
}

const onFocus = () => {
  if (props.isGroup) {
    if (retrieval.value && CGEditorRef.value.innerText.includes('@')) {
      popupShow.value = true
      Height.value = props.height + CGEditorRef?.value?.offsetHeight
    }
  }
}

const haelKeydown = (e: any) => {
  if ((e.shiftKey && e.keyCode === 13) || (e.ctrlKey && e.keyCode === 13)) {
    e.returnValue = true
  }
  else if (e.keyCode === 13) {
    e.returnValue = false
    emit('change', CGEditorRef.value.innerHTML)
  }

  if (props.isGroup) {
    if (e.keyCode === 8) {
      setTimeout(() => {
        let _st = false
        const list = CGEditorRef.value.innerHTML.split('@')
        const _List = list.map((element: any, index: number) => {
          const _index = element.indexOf('n>') + 2
          console.log(element.length)
          console.log(_index)
          if (element.includes('</span>') && element.length === _index) {
            const itm = element.replace(/\<span style=\"color:#597EF7\"\>/g, '[').replace(/<\/span>/g, ']')
            const s = itm.indexOf('[')
            const e = itm.indexOf(']')
            const item = itm.slice(0, s) + itm.slice(e + 1)
            aite_user.value.splice(index - 1, 1)
            chatState.SetAiteUser(aite_user.value)
            _st = true
            return item
          }
          return index > 0 ? `@${element}` : element
        })

        if (_st) {
          CGEditorRef.value.innerHTML = _List.join('')
          if (!CGEditorRef.value.innerText || !CGEditorRef.value.innerText.includes('@')) {
            retrieval.value = ''
            oldInnerText.value = ''
            xorText.value = ''
            popupShow.value = false
          }
          setTimeout(() => {
            keepLastIndex(CGEditorRef.value)
          }, 10)
        }
      }, 50)
    }
  }
}

const textInit = (e: any) => {
  e.preventDefault()
  let text
  const clp = (e.originalEvent || e).clipboardData
  if (clp === undefined || clp === null) {
    text = window.clipboardData.getData('text') || ''
    if (text !== '') {
      if (window.getSelection) {
        const newNode = document.createElement('span')
        newNode.innerHTML = text
        window.getSelection().getRangeAt(0).insertNode(newNode)
      }
      else {
        document.selection.createRange().pasteHTML(text)
      }
    }
  }
  else {
    text = clp.getData('text/plain') || ''
    if (text !== '')
      document.execCommand('insertText', false, text)
  }
}

const setSpecifyMember = (name: string, id: string) => {
  popupShow.value = false
  aite_user.value.push(id)
  chatState.SetAiteUser(aite_user.value)
  CGEditorRef.value.innerHTML = `${retrieval.value}<span style="color:#597EF7">${nameDesensitization(name, isManage.value)}</span>&nbsp; `
  emit('update:modelValue', CGEditorRef.value.innerHTML)
  retrieval.value = ''
  oldInnerText.value = ''
  xorText.value = ''
  setTimeout(() => {
    keepLastIndex(CGEditorRef.value)
  }, 50)
}
</script>

<template>
  <div class="editor">
    <div class="cg_editor">
      <div class="cg_editor_content">
        <div id="CGEditorRef" ref="CGEditorRef" contenteditable="true" :class="sonClass" :placeholder="placeholder" @paste="textInit" @input="reviseInnerHTML" @keydown="haelKeydown" @focus="onFocus" @blur="changeInput" />
      </div>
      <slot name="button" />
    </div>
    <div
      v-show="popupShow"
      class="member_list"
      :style="{ bottom: `${Height}px` }"
    >
      <!-- <RecycleScroller
        v-show="popupShow"
        v-slot="{ item }"
        class="member_list"
        :items="viewMemberList"
        :item-size="54"
        :style="{ bottom: `${Height}px` }"
        key-field="uid"
      > -->
      <div v-for="item in viewMemberList" :key="item.uid" class="member_list_item" @click="setSpecifyMember(item.nick_name, item.uid)">
        <!-- <div  class="member_list_item" @click="setSpecifyMember(item.username, item.uid)"> -->
        <cg-avatar :src="item.avatar" size="small" />
        <span>{{ nameDesensitization(item.nick_name, isManage) }}</span>
      </div>
      <!-- </RecycleScroller> -->
    </div>
  </div>
</template>

<style lang='scss' scoped>
.editor{
  width: 100%;
  overflow: hidden;
}
.cg_editor{
  width: 100%;
  min-height: 34px;
  border: 1px solid $color-gray-9;
  border-radius: 18px;
  display: flex;
  justify-content:space-between;
  align-items:flex-end;
  .editor_main{
    width: 100%;
    max-width: 260px;
    font-size: $size14;
    outline: none;
    padding: 8px 14px;
    min-height: 34px;
    &:empty:before {
      content: attr(placeholder);
      color: $color-gray-1;
    }
    &:focus:before {
        content: none;
    }
  }

  .img_input{
      height: 34px;
      width: 318px;
      background: #FFFFFF;
      border: 1px solid #D6D7EC;
      border-radius: 30px;
      margin-left: 16px;
      margin-bottom: 8px;
      padding:4px 12px;
    }
}

.cg_editor_content {
  flex: 1;
  max-height: 300px;
  overflow-y: auto;
}

.member_list {
  width: 100%;
  max-height: 240px;
  position: absolute;
  left: 0;
  background-color: $color-white-1;
  box-shadow: 0px 0px 20px $color-gray-1;
  transition: height 0.4s;
  overflow-y: auto;

  &_item{
    height: 54px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: $size14;
    color: $color-gray-2;
    font-weight: 600;
    &>span{
      padding-left: 10px;
    }

    &:hover{
      background-color: $color-white-4;
    }
  }
}
</style>
