<template>
  <div class="cg-c-ellipsis" ref="root" :style="{
    lineHeight: `var(--cg-px-${lineHeight})`
  }">
    <div v-if="!exceeded">{{ content }}</div>
    <div v-if="exceeded && !expanded">{{ ellipsis && ellipsis.leading
    }}<span class="ellipsis__text " :style="{
  color: `var(--cg-color-text-${btnColor})`
}" v-if="expandText" @click.stop="clickHandle(1)">{{ expandText }}</span>{{
  ellipsis && ellipsis.tailing }}
    </div>
    <div v-if="exceeded && expanded">
      {{ content }}
      <span class="ellipsis__text" :style="{
        color: `var(--cg-color-text-${btnColor})`
      }" v-if="expandText" @click.stop="clickHandle(2)">{{ collapseText }}</span>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
type EllipsisedValue = {
  leading?: string;
  tailing?: string;
};
interface CgEllipsisProps {
  content: string;
  rows?: number | string;
  expandText?: string;
  collapseText?: string;
  lineHeight?: string | number;
  symbol?: string
  btnColor?: number | string;
}

const props = withDefaults(defineProps<CgEllipsisProps>(), {
  rows: 1,
  lineHeight: 34,
  symbol: '...',
  btnColor: 4
})

const root = ref(null);
let container: any = null;
let maxHeight = 0; // 当行的最大高度
const ellipsis = ref<EllipsisedValue>();
const exceeded = ref<boolean>(false);//是否超出
const expanded = ref<boolean>(false);//是否折叠
watch(
  () => props.content,
  (newV, oldVal) => {
    if (newV != oldVal) {
      createContainer();
    }
  }
);
onMounted(() => {
  createContainer();
});
// 创建虚拟 container，内容为 props.contant 的内容
const createContainer = () => {
  if (!root.value) return;
  const originStyle = window.getComputedStyle(root.value);
  container = document.createElement('div');
  const styleNames: string[] = Array.prototype.slice.apply(originStyle);
  styleNames.forEach((name) => {
    container.style.setProperty(name, originStyle.getPropertyValue(name));
  });
  container.style.position = 'fixed';
  container.style.left = '999999px';
  container.style.top = '999999px';
  container.style.zIndex = '-1000';
  container.style.height = 'auto';
  container.style.minHeight = 'auto';
  container.style.maxHeight = 'auto';
  container.style.textOverflow = 'clip';
  container.style.whiteSpace = 'normal';
  container.style.webkitLineClamp = 'unset';
  container.style.display = 'block';

  //   console.log(originStyle.lineHeight,"originStyle.lineHeight")

  const lineHeight = pxToNumber(originStyle.lineHeight);
  maxHeight = Math.floor(
    lineHeight * (Number(props.rows) + 0.5) +
    pxToNumber(originStyle.paddingTop) +
    pxToNumber(originStyle.paddingBottom)
  );

  container.innerText = props.content;
  document.body.appendChild(container);
  calcEllipse();
};
// 计算省略号的位置
const calcEllipse = () => {
  if (container.offsetHeight <= maxHeight) {
    exceeded.value = false;
    document.body.removeChild(container);
  } else {
    exceeded.value = true;
    const end = props.content.length;
    const ellipsised = tailor(0, end);
    (ellipsis as any).value = ellipsised;
    document.body.removeChild(container);
  }
};
// 计算 省略号
const tailor: (left: number, right: number) => EllipsisedValue = (left: number, right: number) => {
  const actionText = expanded.value ? props.collapseText : props.expandText;
  // console.log(' actionText  :',  actionText );
  if (right - left <= 1) {
    return {
      leading: props.content.slice(0, left) + props.symbol
    };
  }
  const middle = Math.round((left + right) / 2);
  //   console.log('middle :', middle);

  container.innerText = props.content.slice(0, middle + 3) + props.symbol + actionText;

  if (container.offsetHeight <= maxHeight) {
    return tailor(middle, right);
  } else {
    return tailor(left, middle);
  }
};
const pxToNumber = (value: string | null | number) => {
  if (!value) return 0;
  const match = (value + '').match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
};
// 展开收起
const clickHandle = (type: number) => {
  if (type == 1) {
    expanded.value = true;
  } else {
    expanded.value = false;
  }
};
</script>
  
<style scoped lang="scss">
.cg-c-ellipsis {
  display: flex;
  word-break: break-all;

  .ellipsis__text {
    cursor: hand;
    display: inline;
    width: 100px;
    padding-left: 1em;
    white-space: nowrap;
  }
}
</style>