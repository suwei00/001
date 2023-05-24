import { Ref, watch } from 'vue';
export default function (i: Ref<string>, b: Ref<boolean>, r: RegExp, c: string) {
  // 键盘删除键
  const keyboardDelete = (): void => {
    i.value = i.value.substring(0, i.value.length - 1);
  };
  // 键盘数字键
  const keyboardPressNumber = (val: string): void => {
    const rt = i.value + val;
    if (r.test(rt)) {
      i.value = rt;
    }
  };
  // 关闭键盘
  const keyboardClose = (): void => {
    if (b.value) b.value = false;
  };

  // 监听键盘事件，如果键盘显示，避免遮挡input输入框, 只支持唯一class传入
  watch(b, n => {
    if (c) {
      const el = document.getElementsByClassName(c)[0] as HTMLDivElement;
      if (n) {
        el.classList.add('keybord-active');
        el.scrollTo(0, el.scrollHeight);
      } else {
        el.classList.remove('keybord-active');
      }
    }
  });
  return { keyboardDelete, keyboardPressNumber, keyboardClose };
}
